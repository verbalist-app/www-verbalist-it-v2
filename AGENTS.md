# AGENTS.md — Flabbergasted (Lexington Themes + Sanity)

**Flabbergasted** is a Lexington Themes Astro starter oriented toward **SaaS and product marketing**: the homepage composes hero, logo cloud, feature grids, integrations CTA, pricing, and testimonials (`apps/web/src/pages/index.astro`), with supporting areas for **blog**, **team**, **customers**, **integrations**, **help center**, **changelog**, **about**, **auth-style forms**, and a small **design system** under `/system/`. Content can run entirely from git-backed markdown (Content Collections) or from **Sanity Studio**, switched via `USE_SANITY` and unified in `apps/web/src/lib/data.ts`.

**Publisher:** [Lexington Themes](https://lexingtonthemes.com/) — theme: [Flabbergasted](https://lexingtonthemes.com/templates/flabbergasted). **Support / docs (same pattern as README):** [Documentation](https://lexingtonthemes.com/documentation), [Support](https://lexingtonthemes.com/legal/support/), [Sanity manage](https://sanity.io/manage) (for project API settings when using CMS), [Sanity docs](https://www.sanity.io/docs) (linked from README).

---

## Tech stack (from manifests only)

### Root `package.json` (`lexington-sanity-starter`)

- **pnpm** `9.15.0` (`packageManager`). **Scripts:** `dev` (parallel `-r dev`), `dev:web` / `dev:studio` (`--filter`), `build` / `build:web` / `build:studio`, `clean`, `migrate`, `seed:all`.
- **devDependencies:** `@sanity/client`, `dotenv`, `gray-matter`, `tsx` (migration script tooling).

### `apps/web/package.json` (`@lexington/web`)

- **Astro** `^6.0.0`.
- **Tailwind CSS** `^4.1.18` with **`@tailwindcss/vite`** `^4.1.18` (Vite plugin — not `@astrojs/tailwind`).
- **Integrations / content:** `@astrojs/rss`, `@astrojs/sitemap`; `@lexingtonthemes/seo`.
- **Sanity / portable text:** `@sanity/client`, `@sanity/image-url`, `@portabletext/to-html`, `@portabletext/types`, `groq`.
- **Images / UX:** `sharp`; `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide`; `reading-time`.
- **Not present in `apps/web/package.json`:** `@astrojs/mdx` (no MDX integration dependency listed).

### `apps/web/astro.config.mjs`

- **Vite:** `tailwindcss()` from `@tailwindcss/vite`.
- **Integrations:** `@astrojs/sitemap` only.
- **`site`:** `https://yourwebsite.com` (replace for production).
- **Markdown:** `drafts: true`; `shikiConfig.theme` `"css-variables"` under `markdown.shikiConfig`; top-level `shikiConfig` with `wrap`, `skipInline`, `drafts`.
- **experimental:** `svgo: true`.

### `apps/studio/package.json` + `apps/studio/sanity.config.ts`

- **sanity** `^5.12.0`; **React** `^19.x` for Studio; **styled-components** `^6.x`; **@sanity/icons**, **@sanity/vision** `^5.4.0`.
- **`sanity.config.ts` plugins:** `structureTool({ structure })` (from `./structure.ts`), `visionTool()`. **Schema:** `schemaTypes` from `./schemas`. **Project:** `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` (default `production`). No other plugins declared in that file.

---

## Monorepo layout (actual paths)

| Area | Path |
|------|------|
| Site entry | `apps/web/` |
| Pages | `apps/web/src/pages/` |
| Layouts | `apps/web/src/layouts/` |
| Components | `apps/web/src/components/` (includes **`fundations/`** — keep this spelling) |
| Markdown content | `apps/web/src/content/` |
| Content config | `apps/web/src/content.config.ts` |
| Global CSS | `apps/web/src/styles/global.css` |
| Unified data API | `apps/web/src/lib/data.ts` |
| Sanity client, queries, transforms | `apps/web/src/lib/sanity/` (`client.ts`, `fetch.ts`, `queries.ts`, `transforms.ts`, `types.ts`, `image.ts`, `portableText.ts`, `index.ts`) |
| Static assets | `apps/web/public/` |
| Local images (referenced from frontmatter) | `apps/web/src/images/` |
| Studio schemas | `apps/studio/schemas/` |
| Studio desk structure | `apps/studio/structure.ts` |
| Migration | `scripts/migrate-to-sanity.ts` |

`pnpm-workspace.yaml` includes `apps/*` and `packages/*`; a root `packages/` directory is **not present** in this repo.

---

## Dual content model

### A) Astro Content Collections (`apps/web/src/content.config.ts`)

Loader: `glob` + **`astro/zod`** (not a shared `imageSchema` helper — image fields are inline `z.object({ url, alt })`).

| Collection key | Folder | Required / notable Zod fields | Images |
|----------------|--------|-------------------------------|--------|
| `posts` | `apps/web/src/content/posts/**/*.md` | `title`, `pubDate`, `description`, `team` (string id), `image` `{ url, alt }`, `tags` | URLs in frontmatter, typically `/src/images/...` (resolved from `apps/web/src/images/` at build; migration maps these to Sanity assets) |
| `team` | `apps/web/src/content/team/**/*.md` | `name`, `image` `{ url, alt }`; optional `bio`, `role`, `bgColor`, `socials` | Same pattern |
| `customers` | `apps/web/src/content/customers/**/*.md` | `customer`, `avatar`, `logo`, `challengesAndSolutions`, `results`, `about`, `details` | Same pattern |
| `integrations` | `apps/web/src/content/integrations/**/*.md` | `email`, `integration`, `description`, `permissions`, `details`, `logo`, `tags` | Same pattern |
| `helpcenter` | `apps/web/src/content/helpcenter/**/*.md` | `page`, `description`; optional `iconId`, `category`, `keywords`, `lastUpdated`, `faq` | No cover image in schema |
| `changelog` | `apps/web/src/content/changelog/**/*.md` | `page`, `description`, `pubDate`; optional `bgColor` | No cover image in schema |
| `infopages` | `apps/web/src/content/infopages/**/*.md` | `page`, `pubDate` | No cover image in schema |

**Copy-this-entry examples (real files):**

- `posts` → `apps/web/src/content/posts/1.md`
- `team` → `apps/web/src/content/team/david-lee.md`
- `customers` → `apps/web/src/content/customers/1.md`
- `integrations` → `apps/web/src/content/integrations/1.md`
- `helpcenter` → `apps/web/src/content/helpcenter/1.md`
- `changelog` → `apps/web/src/content/changelog/1.md`
- `infopages` → `apps/web/src/content/infopages/privacy.md`

### B) Sanity CMS (`apps/studio/schemas/`)

Document types registered in `apps/studio/schemas/index.ts`:

| `_type` | File | Aligns with collection |
|---------|------|------------------------|
| `post` | `post.ts` | `posts` |
| `teamMember` | `teamMember.ts` | `team` |
| `customer` | `customer.ts` | `customers` |
| `integration` | `integration.ts` | `integrations` |
| `helpcenter` | `helpcenter.ts` | `helpcenter` |
| `changelog` | `changelog.ts` | `changelog` |
| `infopage` | `infopage.ts` | `infopages` |
| `siteSettings` | `siteSettings.ts` | **Singleton** — nav, footer, socials, site title/description/URL, OG image (not a markdown collection) |

Rich bodies in Sanity are Portable Text (`body` arrays where defined). `post` includes `team` as **reference** to `teamMember`. Slugs exist on Sanity documents; markdown uses filename as id/slug.

### Unified API

- **Toggle:** `USE_SANITY` in `apps/web/src/lib/data.ts` (`import.meta.env.USE_SANITY === "true"`).
- **When `false`:** `getCollection` / `getEntry` / `render` from `astro:content`.
- **When `true`:** dynamic `import("./sanity")` then `sanityFetch` + **GROQ** from `queries.ts` and **transforms** in `transforms.ts` to match the same shapes consumers expect.

**Env (`apps/web/.env` / `.env.example`):**

- **All modes:** optional `SANITY_READ_TOKEN` (commented in example; used in `client.ts` / `previewClient` for token-aware fetches).
- **Sanity content mode:** `USE_SANITY=true`, `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_API_VERSION`.
- **Collections-only for page data:** `USE_SANITY=false` (or omit); **no Sanity credentials required** for `data.ts` content paths.
- **Studio (`apps/studio/.env`):** `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET` (per README).

`apps/web/src/components/fundations/head/Seo.astro` still calls `sanityFetch(siteSettingsQuery)` for default SEO (title, description, canonical base, OG/Twitter). Without a working project + `siteSettings` document, queries may fail gracefully to fallbacks in that component; for production SEO defaults, configure Sanity and the singleton.

**Preview token:** README documents optional `SANITY_READ_TOKEN` for draft/preview; it does not document a separate preview secret name.

### Seeding / migration (`scripts/migrate-to-sanity.ts`)

- Reads **`SANITY_PROJECT_ID`** (and dataset) from **`apps/web/.env`**; requires **`SANITY_WRITE_TOKEN`** or **`SANITY_TOKEN`** (Editor-capable).
- **`pnpm migrate`:** runs migration (optional full seed prelude below).
- **`pnpm seed:all`:** runs the same script with `--full` — per README: deletes documents per content type (`post`, `teamMember`, `customer`, `integration`, `helpcenter`, `changelog`, `infopage`), cleans ids to be recreated, waits ~2–3s, then creates content from markdown in dependency order (team → posts → others). **Does not** list `siteSettings` in `CONTENT_TYPES` deletion list.
- Uploads local images under `apps/web/src/images/` when frontmatter uses paths the script understands (`/src/images/`, `@/images/`, relative `../images/` variants).

---

## Routing (`apps/web/src/pages/`)

| Pattern | File(s) | Notes |
|---------|---------|------|
| `/` | `index.astro` | Marketing homepage |
| `/about` | `about.astro` | |
| `/blog/home` | `blog/home.astro` | Listing |
| `/blog/posts/*` | `blog/posts/[...slug].astro` | **rest param** |
| `/blog/tags` | `blog/tags/index.astro` | |
| `/blog/tags/:tag` | `blog/tags/[tag].astro` | |
| `/team/home` | `team/home.astro` | |
| `/team/*` | `team/[...slug].astro` | **rest param** |
| `/customers/home` | `customers/home.astro` | |
| `/customers/*` | `customers/[...slug].astro` | **rest param** |
| `/integrations/home` | `integrations/home.astro` | Tags are in-page anchors, no `/tags/[tag]` route |
| `/integrations/*` | `integrations/[...slug].astro` | **rest param** |
| `/helpcenter/home` | `helpcenter/home.astro` | |
| `/helpcenter/*` | `helpcenter/[...slug].astro` | **rest param** |
| `/changelog/home` | `changelog/home.astro` | |
| `/changelog/*` | `changelog/[...slug].astro` | **rest param** |
| `/infopages/*` | `infopages/[...slug].astro` | **rest param** |
| `/forms/sign-up`, `sign-in`, `contact` | `forms/*.astro` | |
| `/system/*` | `system/*.astro` | Typography, colors, buttons, etc. |
| `/rss.xml` | `rss.xml.js` | Uses `getAllPosts` from `@/lib/data` |
| 404 | `404.astro` | |

---

## Customization (real files)

- **Site URL:** `apps/web/astro.config.mjs` → `site`; RSS uses `context.site`. **`Seo.astro`** uses `siteSettings.siteUrl` from Sanity when available, else fallback URL in component.
- **SEO / head:** `apps/web/src/components/fundations/head/BaseHead.astro` (composes `Seo`, `Meta`, `Fonts`, `Favicons`, scripts); `Seo.astro` uses `@lexingtonthemes/seo` (`AstroSeo`).
- **Global look (Tailwind v4):** `apps/web/src/styles/global.css`.
- **Nav / footer:** `apps/web/src/components/global/Navigation.astro`, `Footer.astro`; Sanity `siteSettings` drives nav/footer/socials when edited in Studio.
- **Page shell:** `apps/web/src/layouts/BaseLayout.astro` imports `BaseHead` and global CSS.

---

## Commands (prefer root scripts)

| Command | Role |
|---------|------|
| `pnpm install` | Workspace deps |
| `pnpm dev` | Parallel dev (web + studio) |
| `pnpm dev:web` | **Day-to-day site** → Astro dev (`apps/web`) |
| `pnpm dev:studio` | Sanity Studio |
| `pnpm build` / `pnpm build:web` / `pnpm build:studio` | Production builds |
| `pnpm migrate` | Markdown → Sanity (needs write token) |
| `pnpm seed:all` | Full reset + seed per README |
| `pnpm clean` | Cleanup script |

---

## Guardrails

- Do **not** rename **`fundations`** (typo preserved across the theme).
- Do not widen **Zod** collection schemas or **Sanity** schemas without updating **`data.ts`**, **`transforms.ts`**, **`types.ts`**, **`queries.ts`**, and consuming **pages/components**.
- Keep **markdown-normalized** and **Sanity-normalized** shapes aligned in the unified layer.
- List **only** integrations/deps that exist in `package.json` / `astro.config.mjs` / `sanity.config.ts` — do not assume MDX or other Astro integrations unless added.
