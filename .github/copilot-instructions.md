# Copilot Instructions for AI Agents

## Project Overview
- **Stack:** Next.js 14, React (JS/TS), CSS Modules, deployed as a static site to GitHub Pages.
- **Purpose:** Professional portfolio site with About, Skills, Projects, and Contact sections. Data-driven and easy to customize.

## Key Architecture & Patterns
- **App Directory:** Uses Next.js `app/` directory structure (`src/app/`).
- **Componentization:** All major sections are React components in `src/components/` (e.g., `About.jsx`, `Projects.jsx`).
- **Data-Driven:** Personal and project data is centralized in `src/data/personalInfo.js` (and `.ts`/`.d.ts` for type safety). Components import from here for dynamic rendering.
- **Styling:** CSS Modules per component (e.g., `About.css`). Global styles in `src/app/globals.css`.
- **Asset Paths:** Use `resolveAssetPath` from `src/lib/resolveAssetPath.js` for static asset URLs, respecting `basePath` for GitHub Pages.
- **Theming:** Theme toggling via `ThemeSwitch.tsx` and CSS variables in `globals.css`.

## Developer Workflows
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (Next.js dev mode)
- **Build:** `npm run build` (static export to `out/`)
- **Deploy:**
  - **Auto:** Push to `main` triggers `.github/workflows/deploy.yml` (builds and deploys to `gh-pages` branch)
  - **Manual:** `npm run deploy` (build, add `.nojekyll`, push `out/` to `gh-pages`)
- **E2E Tests:** Playwright tests in `tests/playwright/`, run with `npm run test:e2e`

## Project-Specific Conventions
- **Data Editing:** Update `src/data/personalInfo.js` for About, Skills, Projects, and Contact info. Type definitions in `personalInfo.d.ts`.
- **Image/Asset Management:** Place images in `public/images/` (carousel in `public/images/carousel/`).
- **Resume:** Place `resume.pdf` in `public/`.
- **Base Path:** `next.config.js` dynamically sets `basePath`/`assetPrefix` for GitHub Pages compatibility. Use `NEXT_PUBLIC_BASE_PATH` if deploying to a subpath.
- **Section Additions:** Add new sections as components in `src/components/`, then import into `src/app/page.js`.
- **Styling:** Use CSS variables in `globals.css` for color/font changes. Prefer CSS Modules for component styles.

## Integration & External Dependencies
- **Playwright:** For E2E testing (`playwright.config.ts`).
- **React Icons:** For iconography.
- **No backend/server:** All data is static or client-side.

## Examples
- **Dynamic Project Rendering:** `Projects.jsx` maps over `personalInfo.projects`.
- **Tech Expertise Cards:** `TechExpertise.jsx` uses a local array for skill cards.
- **Contact Info:** `Contact.jsx` pulls email/socials from `personalInfo.js`.

## References
- See `README.md` and `CUSTOMIZATION.md` for more details on setup and customization.
- Review `.github/workflows/deploy.yml` for deployment logic.
- See `next.config.js` for static export and base path logic.

---
**For AI agents:**
- Always update `personalInfo.js` for content changes.
- Use `resolveAssetPath` for any asset URLs in code.
- Follow the established component and data patterns for new features.
- When in doubt, check `README.md` and `CUSTOMIZATION.md` for project-specific guidance.
