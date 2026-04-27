# Verbalist Web

Marketing site di Verbalist, basato sul theme [Lexington Flabbergasted](https://lexingtonthemes.com/templates/flabbergasted) — variante puramente statica (Astro + Content Collections), senza CMS esterno.

## Stack

- **Astro 6** (static build, niente SSR)
- **Tailwind CSS v4** via Vite plugin
- **Content Collections** (markdown in `apps/web/src/content/`)
- **pnpm monorepo:** `apps/web` (marketing site) + `apps/dashboard` (Next.js, area applicativa post-login)

## Quick start

```bash
pnpm install
pnpm dev:web
```

Apri `http://localhost:4321`.

## Struttura monorepo

```
flabbergasted-sanity-astro_v6A/
├── apps/
│   ├── web/                     # Marketing site Astro
│   │   ├── src/
│   │   │   ├── components/      # Componenti UI (heros, features, customers, …)
│   │   │   ├── content/         # Markdown content (posts, customers, features, …)
│   │   │   ├── content.config.ts # Schemi Zod delle collection
│   │   │   ├── images/          # Asset processati da Astro
│   │   │   ├── layouts/
│   │   │   ├── lib/data.ts      # Wrapper su astro:content
│   │   │   ├── pages/
│   │   │   └── styles/global.css
│   │   ├── public/              # Asset statici (logos, favicon)
│   │   └── astro.config.mjs
│   └── dashboard/               # Next.js app post-login (porta 3001)
├── scripts/clean.sh
├── package.json
└── pnpm-workspace.yaml
```

## Editing dei contenuti

Tutto via repo. Modifica i `.md` in `apps/web/src/content/<collection>/`:

| Collection | Path | Contenuto |
|------------|------|-----------|
| `posts` | `posts/` | Articoli del blog |
| `team` | `team/` | Membri del team |
| `customers` | `customers/` | Case study clienti |
| `features` | `features/` | Schede funzionalità (`/funzionalita/<slug>`) |
| `helpcenter` | `helpcenter/` | Articoli help center |
| `changelog` | `changelog/` | Voci changelog |
| `infopages` | `infopages/` | Privacy, terms, ecc. |

Schemi (campi richiesti) in `apps/web/src/content.config.ts`.

## Comandi

| Command | Cosa fa |
|---------|---------|
| `pnpm install` | Installa dipendenze |
| `pnpm dev:web` | Dev del marketing site (porta 4321) |
| `pnpm dev:dashboard` | Dev della dashboard Next.js (porta 3001) |
| `pnpm dev` | Entrambi in parallelo |
| `pnpm build:web` | Build statica produzione |
| `pnpm clean` | Cleanup `node_modules`, `.env`, `dist` |

## Env

`apps/web/.env`:

```env
# URL della dashboard (linkata in nav come "Inizia ora")
PUBLIC_DASHBOARD_URL=http://localhost:3001/dashboard
# In produzione: https://app.verbalist.it
```

## Deploy

Build statica deployabile ovunque (Vercel / Netlify / S3 / Cloudflare Pages).

```bash
cd apps/web
pnpm build
# output in apps/web/dist/
```

## Note

- **Fedeltà al template:** in dubbio sulla struttura di una pagina, riferimento al template originale in `/Users/filippo/Downloads/flabbergasted_v6_A`.
- **Niente CMS:** il setup è solo Content Collections. Nessuna dipendenza Sanity, nessuna app studio da gestire.
- **Dashboard separata:** `apps/dashboard` è una Next.js indipendente; parla al backend Python via API HTTP, non al marketing site.
