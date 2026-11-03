# dinhanh-nguyen.github.io

Daniel Nguyen's portfolio. Astro (static), one monospace font, black/white sections, rotating text "frames" in the hero.

```bash
npm install
npm run dev       # http://localhost:4321
npm run verify    # typecheck + tests + build
```

## Editing

- **Projects:** one markdown file each in `src/content/projects/`. Frontmatter sets the card and the details table; the body is the case study.
- **Experience, skills, about text, earlier projects:** top of `src/pages/index.astro`.
- **Hero frames:** `src/components/Frames.astro` (keep lines under ~38 characters so they fit on phones).
- **Photo:** drop `public/photo.jpg` and replace the `.photo` placeholder in `src/pages/index.astro` with `<img src="/photo.jpg" alt="Daniel Nguyen">`; CSS already makes it high-contrast black and white.
- **Resume:** replace `public/DanielNguyen_Resume.pdf`.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`. One-time setup: repo Settings, Pages, Source: **GitHub Actions**.
