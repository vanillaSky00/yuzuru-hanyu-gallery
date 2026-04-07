import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  publicDir: 'public',
  outDir: 'dist',
  site: 'https://vanillaSky00.github.io',
  base: '/yuzuru-hanyu-gallery',
});