# Coding standards

Drafted from the repo's existing config and code (README, `tsconfig.json`, CI, current files). Please review.

## Checks
- `npm run verify` (typecheck, tests, build) must pass. CI runs it on every pull request and on `main`.
- TypeScript uses `astro/tsconfigs/strict`. Keep it strict.
- Tests use Node's built-in runner (`node --test "src/**/*.test.js"`) and sit next to the code they test, for example `src/lib/scramble.test.js`.

## Structure
- Pages live in `src/pages/`, shared layout in `src/layouts/Base.astro`, components in `src/components/`.
- Case-study figures are components in `src/components/figures/`. Diagrams use `Diagram.astro` with plain data.
- Project pages are one `.mdx` file each in `src/content/projects/`, with the frontmatter fields the content schema requires (including `hero:`).
- Site-wide settings go in `src/config.js`, not inline.

## Styling
- Colours and spacing come from the tokens at the top of `src/styles/global.css`. Do not add raw colour values in components.
- Text and fill colour pairs must keep AA contrast. Use `--accent` on paper and `--accent-lit` on ink.
- Sections use `.on-light` or `.on-dark`.
- Page-specific styles go in a scoped `<style>` block in the page or component.

## Accessibility
- Pages keep the skip link and landmark structure from `Base.astro`.
- Motion must respect `prefers-reduced-motion`. Moving content needs a pause control.
- Pages that should not be indexed (thanks, 404) pass `noindex` to `Base`.

## Content
- Claims about projects must match what is deployed, not only what is merged.
- Update `src/pages/privacy.astro` and its date if analytics or the form service change.

## Not yet enforced
- There is no linter or formatter configured, so style is by convention.
