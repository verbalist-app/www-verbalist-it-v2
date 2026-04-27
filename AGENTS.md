# AGENTS.md — Verbalist (Astro + Lexington Flabbergasted theme)

**Verbalist** è il marketing site della piattaforma Verbalist (SaaS B2B per la generazione di contenuti SEO assistita da AI). La home compone hero, logo cloud, feature grids, CTA verso le funzionalità, pricing e testimonial (`apps/web/src/pages/index.astro`); aree supportate: **blog**, **team**, **customers**, **funzionalità**, **help center**, **changelog**, **about**, **forms**, e un piccolo **design system** sotto `/system/`.

Il sito è interamente **statico** (Astro static build, niente SSR) e i contenuti vivono come **markdown nei Content Collections** in `apps/web/src/content/`. Niente CMS esterno: tutto via repo + git.

**Theme di base:** [Lexington Flabbergasted](https://lexingtonthemes.com/templates/flabbergasted) — variant senza Sanity (originale: `/Users/filippo/Downloads/flabbergasted_v6_A`).

---

## Tech stack (dai manifesti)

### Root `package.json` (`verbalist-web-monorepo`)

- **pnpm** `9.15.0`. Scripts: `dev` (parallelo `-r dev`), `dev:web` / `dev:dashboard` (`--filter`), `build` / `build:web` / `build:dashboard`, `clean`.
- **devDependencies:** `gray-matter` (per script utility).

### `apps/web/package.json` (`@lexington/web`)

- **Astro** `^6.1.9`.
- **Tailwind CSS** `^4.1.18` con **`@tailwindcss/vite`** (Vite plugin — non `@astrojs/tailwind`).
- **Integrazioni / content:** `@astrojs/rss`, `@astrojs/sitemap`; `@lexingtonthemes/seo` (per `AstroSeo`).
- **Immagini / UX:** `sharp`, `@tailwindcss/forms`, `@tailwindcss/typography`, `tailwind-scrollbar-hide`, `reading-time`.
- **NON presenti:** nessuna dipendenza Sanity, nessun `@astrojs/mdx`.

### `apps/web/astro.config.mjs`

- **Vite:** `tailwindcss()` da `@tailwindcss/vite`.
- **Integrations:** `@astrojs/sitemap`.
- **`site`:** `https://verbalist.it`.
- **Markdown:** `drafts: true`; `shikiConfig.theme = "css-variables"`.
- **experimental:** `svgo: true`.

### `apps/dashboard/`

App **Next.js** indipendente per l'area applicativa post-login. Parla direttamente al backend Python via API HTTP — **zero dipendenze dal marketing site** o dai content. Linkata in `Navigation.astro` via `PUBLIC_DASHBOARD_URL` (env).

---

## Monorepo layout

| Area | Path |
|------|------|
| Marketing site | `apps/web/` |
| Pages | `apps/web/src/pages/` |
| Layouts | `apps/web/src/layouts/` |
| Components | `apps/web/src/components/` (include **`fundations/`** — typo preservato dal theme) |
| Markdown content | `apps/web/src/content/` |
| Content config (Zod schemas) | `apps/web/src/content.config.ts` |
| Global CSS (Tailwind v4) | `apps/web/src/styles/global.css` |
| Data layer (thin wrapper su `astro:content`) | `apps/web/src/lib/data.ts` |
| Asset locali | `apps/web/src/images/` |
| Asset statici (logos, favicon) | `apps/web/public/` |
| Dashboard Next.js | `apps/dashboard/` |
| Script utility | `scripts/` (solo `clean.sh`) |

`pnpm-workspace.yaml` include `apps/*` e `packages/*`; cartella `packages/` non presente.

---

## Content model (Astro Content Collections)

`apps/web/src/content.config.ts` definisce gli schemi Zod. Loader: `glob` per ogni cartella sotto `apps/web/src/content/`.

| Collection | Folder | Campi notevoli (Zod) |
|------------|--------|----------------------|
| `posts` | `posts/**/*.md` | `title`, `pubDate`, `description`, `team` (id), `image {url, alt}`, `tags` |
| `team` | `team/**/*.md` | `name`, `image {url, alt}`, `bio`, `role`, `bgColor`, `socials` |
| `customers` | `customers/**/*.md` | `customer`, `avatar`, `logo`, `bgColor`, `testimonial`, `ctaTitle`, `about`, `challengesAndSolutions[]`, `results[]`, `details {}` |
| `features` | `features/**/*.md` | `name`, `description`, `permissions[]`, `details[]`, `logo`, `tags` |
| `helpcenter` | `helpcenter/**/*.md` | `page`, `description`, `iconId?`, `category?`, `keywords[]?`, `lastUpdated?`, `faq[]?` |
| `changelog` | `changelog/**/*.md` | `page`, `description`, `pubDate`, `bgColor?` |
| `infopages` | `infopages/**/*.md` | `page`, `pubDate` |

**Esempi reali:**
- `posts` → `apps/web/src/content/posts/1.md`
- `team` → `apps/web/src/content/team/david-lee.md`
- `customers` → `apps/web/src/content/customers/rentokil.md`
- `features` → `apps/web/src/content/features/analisi-serp.md`
- `helpcenter` → `apps/web/src/content/helpcenter/1.md`
- `changelog` → `apps/web/src/content/changelog/1.md`
- `infopages` → `apps/web/src/content/infopages/privacy.md`

### Data layer

`apps/web/src/lib/data.ts` è un thin wrapper su `astro:content` che espone `{ slug, data, render }` uniforme. Pages/components importano da qui (`@/lib/data`), non da `astro:content` direttamente. Funzioni: `getAllPosts/getPostBySlug/getPostsByTag/getAllPostTags`, `getAllTeamMembers/getTeamMemberBySlug`, `getAllCustomers/getCustomerBySlug`, `getAllFeatures/getFeatureBySlug/getAllFeatureTags`, `getAllHelpcenter/getHelpcenterBySlug`, `getAllChangelog/getChangelogBySlug`, `getAllInfopages/getInfopageBySlug`.

---

## Routing (`apps/web/src/pages/`)

| Pattern | File(s) | Note |
|---------|---------|------|
| `/` | `index.astro` | Home marketing |
| `/about` | `about.astro` | |
| `/blog/home` | `blog/home.astro` | Listing |
| `/blog/posts/*` | `blog/posts/[...slug].astro` | rest param |
| `/blog/tags` | `blog/tags/index.astro` | |
| `/blog/tags/:tag` | `blog/tags/[tag].astro` | |
| `/team/home` | `team/home.astro` | |
| `/team/*` | `team/[...slug].astro` | rest param |
| `/customers/home` | `customers/home.astro` | |
| `/customers/*` | `customers/[...slug].astro` | rest param |
| `/funzionalita/home` | `funzionalita/home.astro` | (rinominato da `/integrations/home`) |
| `/funzionalita/*` | `funzionalita/[...slug].astro` | rest param |
| `/helpcenter/home` | `helpcenter/home.astro` | |
| `/helpcenter/*` | `helpcenter/[...slug].astro` | rest param |
| `/changelog/home` | `changelog/home.astro` | |
| `/changelog/*` | `changelog/[...slug].astro` | rest param |
| `/infopages/*` | `infopages/[...slug].astro` | rest param |
| `/forms/sign-up`, `sign-in`, `contact` | `forms/*.astro` | |
| `/system/*` | `system/*.astro` | Design system: typography, colors, buttons, ecc. |
| `/rss.xml` | `rss.xml.js` | Usa `getAllPosts` da `@/lib/data` |
| `/sitemap-index.xml` | auto-generato | `@astrojs/sitemap` |
| 404 | `404.astro` | |

---

## SEO

- `apps/web/src/components/fundations/head/Seo.astro` — usa `AstroSeo` da `@lexingtonthemes/seo`. Defaults Verbalist hardcoded: `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_URL = "https://verbalist.it"`, `locale = "it_IT"`.
- `apps/web/src/components/fundations/head/Meta.astro` — charset, viewport, theme-color, robots.
- `apps/web/src/components/fundations/head/Favicons.astro` — favicon/manifest references (asset attesi in `apps/web/public/`).
- `apps/web/src/components/fundations/head/Fonts.astro` — preload font.
- `<html lang="it">` in `BaseLayout.astro`.

Per aggiungere SEO custom a una pagina, passa `seo` prop a `BaseLayout`:

```astro
<BaseLayout seo={{ title: "Titolo pagina", description: "...", image: { url: "...", alt: "..." } }}>
```

---

## Comandi

| Command | Ruolo |
|---------|------|
| `pnpm install` | Install workspace deps |
| `pnpm dev` | Dev parallelo (web + dashboard) |
| `pnpm dev:web` | **Day-to-day site** → Astro dev (`apps/web`) |
| `pnpm dev:dashboard` | Dashboard Next.js |
| `pnpm build` / `pnpm build:web` / `pnpm build:dashboard` | Build production |
| `pnpm clean` | Cleanup script |

---

## Guardrails

- Non rinominare **`fundations`** (typo preservato dal theme).
- Non aggiungere dipendenze Sanity / `@portabletext/*` / `groq`: il setup è puro Content Collections.
- Quando aggiungi/modifichi una collection, aggiorna `apps/web/src/content.config.ts` (Zod schema) e le funzioni in `apps/web/src/lib/data.ts`.
- **Fedeltà al template:** in dubbio sulla struttura/markup di una pagina, confronta con il template originale in `/Users/filippo/Downloads/flabbergasted_v6_A` e replica.
