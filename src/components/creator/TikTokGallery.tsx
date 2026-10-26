import React, { useState, useEffect, useRef } from 'react';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  tag: string;
  genre: string;
  emoji: string;
  likes: string;
  platform: string;
  url: string;
  embedUrl?: string;
  featured?: boolean;
}

interface Props {
  videos: VideoItem[];
}

export default function TikTokGallery({ videos }: Props) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique genres
  const genres = ['All', ...Array.from(new Set(videos.map((v) => v.genre)))];

  // Filter videos
  const filteredVideos =
    selectedGenre === 'All'
      ? videos
      : videos.filter((v) => v.genre === selectedGenre);

  // Fetch oEmbed thumbnails
  useEffect(() => {
    videos.forEach((v) => {
      if (thumbnails[v.id]) return;
      fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/@takumyi/video/${v.id}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.thumbnail_url) {
            setThumbnails((prev) => ({ ...prev, [v.id]: data.thumbnail_url }));
          }
        })
        .catch(() => {
          // silently ignore network errors; emoji placeholder will show
        });
    });
  }, [videos]);

  // Gentle auto-scroller when not interacting or playing
  useEffect(() => {
    if (activeVideoId || isPaused || selectedGenre !== 'All') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    let animId: number;
    const speed = 0.65; // px per frame

    const step = () => {
      if (container) {
        container.scrollLeft += speed;
        // Seamless loop
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 5) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [activeVideoId, isPaused, selectedGenre]);

  const handleCardClick = (id: string) => {
    if (activeVideoId === id) {
      setActiveVideoId(null);
    } else {
      setActiveVideoId(id);
      setIsPaused(true);
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -350 : 350;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Genre Filter Pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-cream/40">
          Genre:
        </span>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGenre(g);
              setActiveVideoId(null);
            }}
            className={`rounded-full px-3.5 py-1 text-[12px] font-medium transition-all duration-300 ${
              selectedGenre === g
                ? 'bg-cream text-ink shadow-sm'
                : 'border border-cream/15 bg-cream/[0.04] text-cream/70 hover:border-cream/35 hover:text-cream'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Gallery Strip with arrows */}
      <div className="relative">
        {/* Navigation arrows (desktop) */}
        <div className="pointer-events-none absolute -top-12 right-0 hidden items-center gap-2 sm:flex">
          <button
            onClick={() => scrollByAmount('left')}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 bg-ink/80 text-cream/80 transition-all hover:border-cream/50 hover:text-cream active:scale-95"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            onClick={() => scrollByAmount('right')}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-cream/20 bg-ink/80 text-cream/80 transition-all hover:border-cream/50 hover:text-cream active:scale-95"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            if (!activeVideoId) setIsPaused(false);
          }}
          className="no-scrollbar flex gap-4 overflow-x-auto pb-6 pt-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {filteredVideos.map((video) => {
            const isExpanded = activeVideoId === video.id;
            const isDimmed = activeVideoId !== null && !isExpanded;
            const thumbUrl = thumbnails[video.id];

            return (
              <div
                key={video.id}
                onClick={() => handleCardClick(video.id)}
                className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
                  isExpanded
                    ? 'w-[320px] sm:w-[340px] border-[#c8a06a] ring-2 ring-[#c8a06a]/30 shadow-2xl z-30'
                    : isDimmed
                    ? 'w-[210px] opacity-35 hover:opacity-65 border-cream/10'
                    : 'w-[210px] border-cream/15 bg-ink hover:-translate-y-1.5 hover:scale-[1.02] hover:border-[#c8a06a]/70 hover:shadow-xl'
                }`}
                style={{ height: isExpanded ? '720px' : '390px' }}
              >
                {/* Embed iframe when expanded */}
                {isExpanded ? (
                  <div className="flex h-full w-full flex-col bg-black">
                    <div className="flex items-center justify-between border-b border-cream/10 bg-ink/90 px-3 py-2 text-[11px] text-cream/70">
                      <span className="font-mono text-[#c8a06a]">{video.tag}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVideoId(null);
                        }}
                        className="rounded px-1.5 py-0.5 text-xs text-cream/60 hover:bg-cream/10 hover:text-cream"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <div className="relative flex-1 bg-black">
                      <iframe
                        src={`https://www.tiktok.com/player/v1/${video.id}?embed_from=oembed&music_info=1&description=1&autoplay=1&muted=0`}
                        title={video.title}
                        className="absolute inset-0 h-full w-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="border-t border-cream/10 bg-ink/90 p-3">
                      <h4 className="font-medium text-cream text-[13px] leading-snug">{video.title}</h4>
                      <p className="mt-1 text-[11px] text-cream/60 leading-relaxed">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#c8a06a] hover:underline"
                      >
                        Open on TikTok ↗
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Collapsed Card */
                  <div className="flex h-full flex-col justify-between bg-cream/[0.03]">
                    {/* Media Thumbnail */}
                    <div className="relative flex-1 overflow-hidden bg-cream/[0.04] flex items-center justify-center">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={video.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="text-4xl opacity-25">{video.emoji}</div>
                      )}

                      {/* Likes Badge */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 rounded bg-black/75 px-2 py-0.5 font-mono text-[11px] tracking-wider text-cream/90 backdrop-blur-sm">
                        <span className="text-[#c8a06a]">♥</span> {video.likes}
                      </div>

                      {/* Play overlay prompt */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-ink shadow-lg transition-transform group-hover:scale-110">
                          ▶
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="p-3 bg-ink">
                      <div className="mb-1 font-mono text-[9px] uppercase tracking-wider text-[#c8a06a]/80">
                        {video.tag}
                      </div>
                      <h4 className="font-medium text-cream text-[13px] leading-tight line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-cream/55 leading-snug line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] text-cream/40 sm:text-left">
        Click any video to play directly on this page or expand.
      </p>
    </div>
  );
}
