import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://daniel-nguyen.dev',
  integrations: [mdx(), sitemap({ filter: (page) => new URL(page).pathname !== '/thanks/' })],
});
