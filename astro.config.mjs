// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL and SITE_BASE come from the deploy environment. GitHub Pages serves this repository at
// https://takumilbx.github.io/personal-website/, so its workflow sets SITE_BASE=/personal-website.
// A custom domain later sets SITE_URL to that domain and leaves SITE_BASE unset.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.SITE_BASE || '/',
  output: 'static',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th', 'ja'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
});
