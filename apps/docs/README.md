# Verbalist Docs

Documentazione pubblica di Verbalist, hostata su **Mintlify** e servita da `https://docs.verbalist.it`.

## Stack

- **[Mintlify](https://mintlify.com)**: generatore di docs con UI moderna (search, dark mode, navigazione, AI search inclusi nel free plan)
- Contenuti in `.mdx` (Markdown + componenti React-like Mintlify)
- Config in `docs.json`
- Deploy automatico via Mintlify Cloud collegato al repo GitHub

## Sviluppo locale

```bash
# Dalla root del monorepo
pnpm install

# Avvia il preview dei docs (porta default: 3000)
pnpm dev:docs
# oppure direttamente
cd apps/docs && pnpm dev
```

## Struttura

```
apps/docs/
├── docs.json              # Config Mintlify (nome, colori, navigazione)
├── introduction.mdx       # Home della doc
├── getting-started/       # Quickstart e prova gratuita
├── funzionalita/          # Le 6 feature di Verbalist
├── guide/                 # How-to per use case ricorrenti
├── faq.mdx                # Domande frequenti
├── logo/                  # logo light/dark per topbar
└── images/                # Asset usati nelle pagine
```

## Setup deploy (una tantum)

### 1. Connetti il repo a Mintlify

1. Vai su [mintlify.com](https://mintlify.com) → Sign up con account GitHub
2. Authorize Mintlify a leggere il repo `verbalist/www-verbalist-it-v2`
3. In dashboard Mintlify scegli "Add deployment" → seleziona il repo
4. Imposta **Content directory:** `apps/docs`
5. Mintlify deploya automaticamente a `<workspace>.mintlify.app`

### 2. Sottodominio personalizzato `docs.verbalist.it`

1. In Mintlify dashboard → Settings → Custom domain
2. Inserisci `docs.verbalist.it`
3. Mintlify ti darà un valore CNAME (es. `cname.mintlify.com`)
4. Sul provider DNS di `verbalist.it`, crea un record:
   ```
   Type: CNAME
   Name: docs
   Value: cname.mintlify.com  (sostituisci col valore reale fornito da Mintlify)
   TTL: auto / 3600
   ```
5. Attendi la propagazione DNS (10 min - 1 ora) → `https://docs.verbalist.it` punta ai docs

### 3. Auto-deploy

Da quel momento, ogni `git push` su `main` che tocca `apps/docs/` triggera un redeploy automatico Mintlify.

## Comandi utili

| Comando | Descrizione |
|---|---|
| `pnpm dev` (in `apps/docs`) | Preview locale su http://localhost:3000 |
| `pnpm broken-links` | Scansiona il docs e segnala link rotti |

## Linee guida contenuti

- Lingua: **italiano** (allineata al sito principale www.verbalist.it)
- Tone of voice: chiaro per chiunque ma non infantile, niente claim vuoti, niente vendor secrets (DataForSEO, modelli LLM specifici, framework backend non si citano)
- Frontmatter standard:
  ```yaml
  ---
  title: "Titolo della pagina"
  description: "1 frase breve, usata per meta description e snippet"
  ---
  ```
- Per richiamare le funzionalità da altre pagine, usa link relativi: `[Analisi SERP](/funzionalita/analisi-serp)`
