import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    summary: z.string(),
    year: z.string(),
    // Year and month the repository was added to GitHub (YYYY-MM), shown beside the project title.
    added: z.string().regex(/^\d{4}-\d{2}$/),
    role: z.string(),
    stack: z.array(z.string()),
    live: z.string().url().optional(),
    repo: z.string().url().optional(),
    hero: z.enum(['video', 'pipeline']),
  }),
});

export const collections = { projects };
