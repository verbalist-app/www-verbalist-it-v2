# Lotti e profilo brand: guida alla demo

Per Giulia (frontend dell'app vera) e Niccolò (backend). Scritta da Filippo, 18 settembre 2026.

Questa è la demo di interfaccia per il pilot Bonfiglioli: elaborazione di più contenuti da un file Excel e profilo brand a livello di progetto. È una dashboard Next.js con dati finti, deployata su https://verbalist-dashboard-v2.vercel.app. Non è l'app che usano i clienti (app.verbalist.it): serve come specifica cliccabile di schermate, stati e testi. L'unica parte "vera" è la lettura del file Excel, che gira nel browser.

## A cosa serve

- Far vedere al cliente e al team il flusso completo prima di scriverlo nell'app vera.
- Dare a Giulia stati, regole, etichette e ordine dei campi già decisi, così non li reinventa.
- Dare a Niccolò una controparte visiva degli endpoint della sua stima del 14 settembre.

Riferimenti: mail di Giada del 9 e 11 settembre (desiderata e TO DO), stima backend di Niccolò del 14 settembre, stima frontend di Giulia del 14 settembre.

## Dove vederla

Percorso consigliato, tutto con dati già caricati:

1. Progetto Bonfiglioli, tab Documenti con la sezione Lotti: `/dashboard/projects/5`
2. Tab Profilo brand compilato: `/dashboard/projects/5?tab=brand`. Tab Materiali: `?tab=materials`.
3. Nuovo documento: `/dashboard/documents/new`. Allo step 2 scegli il progetto Bonfiglioli e la modalità "Più contenuti da file". Carica un .xlsx (il file del cliente o il template scaricabile lì) oppure usa il link "prova con le righe d'esempio". L'anteprima mostra una riga in errore e un avviso di keyword duplicata: Continua si sblocca solo escludendo la riga in errore.
4. Step 3, "Avvia lotto": si arriva alla pagina del lotto con la coda simulata.
5. Pagina di un lotto già avviato: `/dashboard/batches/b1`. Pausa, annulla, riprova sulla riga in errore, esporta tutto, filtro per stato.
6. Documento generato da un lotto: `/dashboard/documents/lotto-1` (breadcrumb e link al lotto, export Word ed Excel nel menu).
7. Guida con i template: `/dashboard/help`.

Un progetto senza profilo brand (per esempio `/dashboard/projects/1`) mostra lo stato vuoto e, nel wizard, il chip "Non configurato" con il link per configurarlo.

## Le schermate e i file

| Schermata | File | Cosa contiene |
|---|---|---|
| Progetto: tab Documenti, Profilo brand, Materiali; sezione Lotti | `app/dashboard/projects/[id]/_components/project-detail-content.tsx` | Tab con `?tab=`, chip di stato del profilo, card del lotto con avanzamento |
| Form del profilo brand | `components/dashboard/brand-profile-form.tsx` | Campi, stato vuoto, salvataggio, etichette IT/EN |
| Materiali del progetto | `components/dashboard/project-materials.tsx` | Lista PDF, upload, limiti, copy onesto sui PDF |
| Wizard Nuovo documento | `app/dashboard/documents/new/_components/new-document-content.tsx` | Progetto in cima, tre modalità, blocco profilo brand con contesto aggiuntivo, modalità da file con anteprima e stima, riepilogo del lotto |
| Pagina Lotto | `app/dashboard/batches/[id]/_components/batch-detail-content.tsx` | Stato, avanzamento, contatori, azioni, tabella righe, costo |
| Lista documenti | `app/dashboard/documents/_components/documents-content.tsx` | Chip "Lotto", filtro per origine |
| Dettaglio documento | `app/dashboard/documents/[id]/_components/document-detail-content.tsx` | Breadcrumb con il lotto, export .docx e .xlsx |
| Aiuto | `app/dashboard/help/_components/help-content.tsx` | Scheda guida con i template, due FAQ |
| Stima crediti e tempo | `components/dashboard/batch-estimate.tsx` | Riusata in anteprima, riepilogo e lotto |
| Pill di stato del lotto | `components/dashboard/batch-status-pill.tsx` | Sei stati del lotto |

Dati e regole:

| Cosa | File |
|---|---|
| Tipi del lotto, stati, conteggi, stime, validazione righe, righe d'esempio | `lib/batches.ts` |
| Campi del profilo brand, toni predefiniti, profilo mock, materiali mock | `lib/brand-profile.ts` |
| Stati dei documenti (aggiunti in coda, in pausa, annullato) | `lib/status.ts` |
| Progetti mock, il "5" è Bonfiglioli | `lib/projects.ts` |
| Lettura di .xlsx e .csv nel browser | `lib/xlsx-reader.ts` |
| Mappatura fogli e colonne in righe del lotto | `lib/workbook-mapping.ts` |
| Template Excel scaricabili | `public/templates/` |

Tutte le stringhe sono nei file delle schermate, in un oggetto con le chiavi `it` ed `en`.

## Stati e regole

Stati di una riga del lotto: in coda, in elaborazione, completato, errore, annullato. Stati del lotto: in coda, in corso, in pausa, completato, completato con errori, annullato. Il lotto è "completato con errori" quando non ci sono più righe in coda o in corso e almeno una è in errore.

Regole dell'anteprima del file:

- Errore, blocca l'avvio: testo vuoto (solo per "testi da ottimizzare"), keyword principale mancante, pagina o sezione mancante.
- Avviso, non blocca: stessa keyword principale di un'altra riga.
- L'utente può escludere una riga in errore. Continua resta disattivato finché esiste una riga in errore, perché il backend valida l'intera richiesta prima di creare i task.
- Limite: 50 righe per file (`BATCH_MAX_ITEMS`), oltre compare un avviso e non si prosegue.

Numeri usati nelle stime: 20 crediti per riga (`CREDITS_PER_DOCUMENT` in `lib/credits.ts`), 72 secondi per riga (circa un'ora per 50 righe, dalla stima di Niccolò). Il riepilogo blocca l'avvio se i crediti richiesti superano quelli disponibili. I lotti girano a priorità più bassa delle richieste singole: il copy lo dice in tre punti (anteprima, riepilogo, pagina del lotto).

Il profilo brand vale per tutti i contenuti del progetto. Nel wizard non si reinserisce: si vede solo lo stato (attivo con data, oppure non configurato con link al progetto). Il contesto aggiuntivo del singolo documento resta disponibile in un collapsible, con al massimo 3 PDF, e si somma al profilo.

## Cosa è vero e cosa è finto

| Parte | Stato nella demo |
|---|---|
| Lettura del file .xlsx o .csv | Vera, nel browser, senza librerie. Riconosce il template e il formato del cliente. |
| Validazione delle righe | Vera, sulle righe lette. |
| Profilo brand e materiali | Salvati solo nella sessione del browser (`sessionStorage`). Il progetto 5 parte già compilato. |
| Avvio del lotto, coda, pausa, annulla, riprova | Simulati: un timer avanza le righe ogni 2 secondi, la riga "Separatore" fallisce la prima volta. |
| Export Word, Excel, HTML del lotto e del documento | Finti: mostrano solo la conferma. I formati Markdown, HTML e TXT del documento singolo scaricano davvero. |
| Documenti generati dal lotto | Un solo documento mock (`lotto-1`) con testo e FAQ presi dal file del cliente. |
| Crediti | Numeri mock: 156 usati su 500. |

## Il file di input

Template Verbalist (`public/templates/`): un foglio "Contenuti" con le colonne Pagina, Sezione, Testo attuale, Keyword principale, Keyword secondarie, Note. La versione per "keyword da cui generare" ha Brief al posto di Testo attuale. Il foglio "Istruzioni" viene ignorato in lettura.

Formato del cliente (RevisioneNUR.xlsx): un foglio per pagina, sezione in colonna A, testo in una colonna "Proposta ottimizzata SEO", keyword in una colonna "Keywords" con una keyword per riga di cella. La demo lo legge così: la prima keyword è la principale, le altre secondarie. Le colonne cambiano tra i fogli (Biogas ha anche il box di sintesi), quindi la lettura va per intestazione e non per posizione.

Output proposto: lo stesso file di input con le colonne aggiunte Title, Meta description, H1, H2, Testo ottimizzato, Crediti. Da confermare con Giada, che lo gira al cliente per il data entry su Pimcore.

## Mappa con il backend

| Stima di Niccolò | Dove si vede |
|---|---|
| `brand_profile` sui task | Form del profilo brand: nome e descrizione azienda, valori, tono di base più descrizione libera, regole da seguire e da evitare, glossario, termini vietati, CTA, pagine per i link interni |
| `POST /commands/bulk/{pipeline}` con `defaults` e `items`, massimo 50, errori per item | Step 3, "Avvia lotto". Gli errori per item tornano nell'anteprima dello step 2 |
| `GET /monitor/bulk/{id}` con pausa, ripresa, annullamento | Pagina Lotto: pill di stato, avanzamento, contatori, azioni |
| `GET /results/bulk/{id}` paginato, filtro per stato, costo totale | Pagina Lotto: tabella righe, filtri, costo, esporta tutto |

Non coperto da nessuna stima: PDF a livello di progetto (tab Materiali), procedura di profilazione automatica, tipo di contenuto "sezione di pagina" con intro, box e FAQ, integrazione Pimcore.

## Decisioni aperte

1. Limite di righe per lotto: 3, 5 o 15 come tetto commerciale, contro i 50 tecnici. Nella demo è una costante.
2. Materiali di progetto nella prima versione o dopo.
3. Colonne definitive di input e output.
4. Tipo "sezione di pagina" dentro o fuori dal pilot.
5. Righe con errori: bloccare finché tutte sono valide (scelta attuale) o permettere di escluderle in blocco.

## Come si avvia in locale

```bash
pnpm install --filter @lexington/dashboard
pnpm dev:dashboard        # http://localhost:3001/dashboard
pnpm build:dashboard      # build di produzione
```

Il push su `main` deploya in automatico su Vercel. Gli errori TypeScript in `components/ui/toaster.tsx` sono preesistenti e non bloccano la build.

## Dove mettere le mani

- Testi: l'oggetto `content` o `translations` in cima a ogni schermata.
- Righe d'esempio e lotto mock: `sampleRows` e `mockBatches` in `lib/batches.ts`.
- Profilo e materiali mock del progetto 5: `lib/brand-profile.ts`.
- Limiti e stime: `BATCH_MAX_ITEMS`, `SECONDS_PER_ITEM` in `lib/batches.ts`, `CREDITS_PER_DOCUMENT` in `lib/credits.ts`.
- Riconoscimento di un nuovo formato di file: aggiungere una funzione `import...Sheet` in `lib/workbook-mapping.ts`.
