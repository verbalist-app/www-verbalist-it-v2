# Verbalist Admin

Dashboard interna per vedere e gestire cosa fa il backend AI (il Job Manager). Non è per i clienti: la usiamo noi del team per tenere sotto controllo la generazione dei contenuti.

Questo documento spiega a cosa serve, come è fatta, quali endpoint chiama e cosa mi serve dal backend per portarla in produzione.

## A cosa serve

Il backend è una pipeline asincrona a più passi: analisi SERP, scraping delle pagine, analisi dei competitor, generazione o ottimizzazione del testo. Gira con un worker e cinque slot in parallelo. Dall'app utente quel processo non si vede. Questa dashboard lo rende visibile e gestibile, con quattro obiettivi:

1. Vedere lo stato del sistema in tempo reale: task attivi, coda, errori, tempo medio, throughput.
2. Aprire un task e capire dove sta, passo per passo, con il grafo delle dipendenze e la timeline degli eventi.
3. Intervenire quando qualcosa si blocca: riprova, pausa, ripresa, annullamento.
4. Controllare token e costo per ogni generazione, con il modello usato a ogni passo.

Gli stessi endpoint `/monitor/.../status` che alimentano questa dashboard servono già la barra di avanzamento lato utente. Qui li usiamo per la vista d'insieme, non per il singolo task.

## Come è fatta

È un'app Next.js separata dentro il monorepo (`apps/admin`), accanto alla dashboard utente. Riusa lo stesso stile: shadcn/ui, il tema "mist", i font Geist e Familjen Grotesk. Chi conosce `apps/dashboard` si ritrova subito.

Parla direttamente al Job Manager via HTTP. Il monitoraggio sta sotto `/monitor`, token e costi sotto `/results`. Non c'è database né stato proprio: legge e mostra.

Oggi parte con dati finti, così gira in locale senza backend. Quando imposti la variabile d'ambiente con l'URL del Job Manager, passa ai dati reali.

## Come si avvia

Dalla radice del monorepo:

```bash
pnpm install
pnpm dev:admin        # apre http://localhost:3002
```

Per collegarla al backend reale, crea `apps/admin/.env.local`:

```
NEXT_PUBLIC_JOB_MANAGER_URL=http://localhost:8881
```

Senza quella variabile la dashboard resta in modalità demo (lo vedi dal badge "Dati demo" nella barra e nella sidebar). Con la variabile impostata chiama gli endpoint veri e fa polling ogni pochi secondi.

## Le pagine e cosa chiamano

| Pagina | Endpoint |
|--------|----------|
| Panoramica (`/`) | `GET /monitor/system/stats`, `GET /monitor/workers/stats` |
| Task (`/tasks`) | `GET /monitor/tasks/search` |
| Dettaglio task (`/tasks/{id}`) | `GET /monitor/tasks/{id}/overview`, `/status`, `/graph`, `/timeline` + `GET /results/tasks/{id}/subtasks` (token e modello) |
| Azioni sul task | `POST .../retry`, `POST .../pause`, `POST .../resume`, `DELETE /monitor/tasks/{id}` |

La scheda "Token e costi" del dettaglio prende `token_usage` e `model_used` da `/results/tasks/{id}/subtasks` e calcola il costo con un listino segnaposto (vedi sotto).

## Cosa mi serve da te

Quattro cose per passare dalla demo alla produzione. Le ho numerate perché le ritrovi citate nei commenti del codice e nella UI.

1. Autenticazione su `/monitor`. Oggi il backend non ha auth: la protezione è solo la rete Docker, e il platform PHP chiama gli endpoint senza token. Per aprire questa dashboard nel browser servono due strade possibili: un token o header condiviso sugli endpoint `/monitor` e `/results`, oppure un proxy dietro la sessione del platform (come fa già l'app). Dimmi quale preferisci e adeguo il client (`lib/admin/api.ts`, funzione `authHeaders`).

2. Un endpoint per i costi di sistema. Il costo per singolo task lo ricostruisco già dai token. Manca l'aggregato: costo e token totali per giorno e per modello. La matematica c'è già in `scripts/pricing.py` più il tuo YAML di listino. Se la esponi come endpoint, tolgo il listino segnaposto e mostro i numeri veri.

3. Paginazione e ordinamento su `tasks/search`, più due endpoint che oggi mancano. La ricerca non pagina, non ordina e taglia a 100 risultati: per una lista vera serve almeno `ORDER BY created_at DESC` con offset o cursore. In più hai già pronte due view non esposte, `v_bottlenecks` (tempi medi per tipo di subtask) e `v_high_retry_tasks` (keyword con molti retry): con un endpoint ciascuna diventano due widget utili in panoramica.

4. La vista worker. `v_worker_performance` raggruppa per `locked_by`, ma `locked_by` viene azzerato a fine subtask, quindi la vista torna quasi sempre vuota e la tabella worker resta senza dati. Due opzioni: aggiungere una colonna tipo `completed_by` valorizzata al completamento, oppure lasciar perdere la sezione (con un solo worker conta poco). Dimmi tu.

C'è anche un dettaglio minore: `progress_percent` è calcolato in due modi diversi tra `/overview` (su tutti i subtask) e `/status` (solo sui passi operativi). Non è bloccante, ma se li allinei la percentuale diventa una sola.

## Note tecniche

Stati. Il backend ha otto `RunStatus`. Sono mappati a etichetta italiana e colore in `lib/status.ts`.

Aggregazione SCRAPE. In `/status` i subtask di scraping arrivano già raggruppati in una riga sola ("3/5 pagine scaricate"). Se un domani vuoi vedere ogni pagina, l'endpoint accetta `include_details=true`. Per ora mostro la versione aggregata, che è più leggibile.

Lingua. `/status` accetta `lang` e torna messaggi già localizzati. La dashboard passa `it`.

Prezzi segnaposto. Finché non c'è l'endpoint costi (richiesta 2), il calcolo usa un listino finto in `lib/admin/pricing.ts`. I valori sono da buttare: servono solo a far vedere la colonna.

## Dove mettere le mani

```
apps/admin/
  app/page.tsx            redirect da / a /admin
  app/admin/
    layout.tsx            barra laterale e barra in alto
    page.tsx              Panoramica (/admin)
    tasks/page.tsx        lista task con filtri e azioni (/admin/tasks)
    tasks/[id]/page.tsx   dettaglio: pipeline, grafo, timeline, token e costi
  components/admin/
    status-badge.tsx      stato -> badge colorato
    stat-card.tsx         card KPI
    task-actions.tsx      pulsanti retry / pausa / ripresa / annulla
    pipeline-view.tsx     stepper dei passi + grafo dipendenze
  lib/admin/
    types.ts              tipi allineati ai contratti del backend
    api.ts                client HTTP (reale o mock)
    mock.ts               dati finti per la modalità demo
    pricing.ts            calcolo costo (listino segnaposto)
    format.ts             date, durate, percentuali
  lib/status.ts           stati, colori, etichette dei passi
```

Il resto (`components/ui`, `app/globals.css`, i font) è identico alla dashboard utente, così le due restano coerenti.
