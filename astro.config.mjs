// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// TODO owner: set `site` to the registered domain (for example https://takumyi.com) before the first deploy.
export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'th', 'ja'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
});
