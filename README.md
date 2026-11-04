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
- **Contact form:** sends through [Web3Forms](https://web3forms.com). Sign up with your email, copy the access key (it is safe to publish) into `WEB3FORMS_ACCESS_KEY` in `src/config.js`. Until you do, the form shows "not switched on yet" instead of sending.
- **Privacy policy:** `src/pages/privacy.astro`. Update it (and the date) if you add analytics or change the form service.
- **Project pages:** `src/content/projects/*.mdx`. Figures are components in `src/components/figures/`; `Diagram.astro` draws boxes and arrows from plain data. A new project needs a `hero:` value (`video` or `pipeline`) in its frontmatter.
- **Resume:** replace `public/DanielNguyen_Resume.pdf`.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`. One-time setup: repo Settings, Pages, Source: **GitHub Actions**.
