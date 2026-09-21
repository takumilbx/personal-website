import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Case studies live outside src/, in content/work/<lang>/, as the content README describes.
// Only the English folder is wired for now; th/ and ja/ join here when their first file is published.
const work = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/work/en' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    lang: z.string(),
    status: z.enum(['placeholder', 'draft', 'published']),
    type: z.enum(['research', 'policy', 'edtech', 'learning-design', 'interpreting', 'media']),
    org: z.string(),
    role: z.string(),
    period: z.object({
      start: z.union([z.string(), z.number()]).transform(String),
      end: z.union([z.string(), z.number()]).transform(String),
    }),
    location: z.string(),
    summary: z.string(),
    headlineNumber: z.string().default(''),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    cover: z.string().default(''),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { work };
