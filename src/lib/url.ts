const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix an internal path (one that starts with "/") with the site's base path. External URLs pass through. */
export function withBase(path: string): string {
  if (!path) return path;
  if (/^[a-z][a-z0-9+.-]*:/i.test(path) || path.startsWith('//')) return path;
  return path.startsWith('/') ? `${base}${path}` : path;
}
