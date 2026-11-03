import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dinhanh-nguyen.github.io',
  integrations: [sitemap()],
});
