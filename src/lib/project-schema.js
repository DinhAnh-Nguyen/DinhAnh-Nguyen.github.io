// Frontmatter schema for project pages. Shared by the content collection
// (src/content.config.ts) and the frontmatter tests, so there is one definition.
import { z } from 'astro/zod';

export const projectSchema = z.object({
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
});
