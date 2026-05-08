export type Capability = {
  headline: string
  body: string
}

export type Feature = {
  slug: string
  category: string
  name: string
  description: string
  overviewHeadline: string
  overviewBody: string
  capabilities: Capability[]
  details: { title: string; value: string }[]
}

export const features: Feature[] = [
  {
    slug: 'analisi-serp',
    category: 'Ricerca dati',
    name: 'Analisi SERP per content engineering',
    description:
      'Trasforma le top 10 di Google in un brief strutturato. Argomenti, domande coperte e gap di copertura, pronti per il content team.',
    overviewHeadline: 'Brief strutturati dalla SERP della tua keyword',
    overviewBody:
      'Verbalist analizza i primi 10 risultati di Google per la tua keyword e li trasforma in un brief con argomenti, struttura e domande coperte.',
    capabilities: [
      {
        headline: 'Top 10 di Google',
        body: 'Recupera le prime 10 posizioni organiche di Google per la tua keyword, in tempo reale e su qualsiasi mercato.',
      },
      {
        headline: 'Argomenti, struttura, domande',
        body: 'Estrae argomenti trattati, struttura editoriale e domande coperte da ciascun risultato analizzato.',
      },
      {
        headline: 'Temi ricorrenti e gap',
        body: 'Identifica temi ricorrenti tra i competitor e segnala i gap di copertura rispetto ai top result.',
      },
      {
        headline: 'Lingua, location, device',
        body: 'Funziona su qualsiasi lingua, location e device supportato. Risultati geo-rilevanti per ogni mercato.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Ricerca dati' },
      { title: 'Posizioni', value: 'Top 10 organici' },
      { title: 'Output', value: 'Brief strutturato' },
      { title: 'Lingue', value: 'Multi-lingua' },
    ],
  },
  {
    slug: 'generazione-contenuti',
    category: 'Generazione',
    name: 'Software di generazione contenuti SEO',
    description:
      'Scrivi articoli SEO partendo da SERP e competitor reali, non da un prompt generico. Output Markdown o HTML pronto per il tuo CMS.',
    overviewHeadline: 'Articoli SEO scritti sopra dati reali, non un prompt',
    overviewBody:
      'Articoli, schede prodotto, guide o landing page. Verbalist scrive a partire dalle evidenze raccolte sulla SERP della tua keyword, non da un prompt generico.',
    capabilities: [
      {
        headline: 'Quattro formati di output',
        body: 'Genera articoli, schede prodotto, guide e landing page da zero, in italiano e nelle altre lingue supportate.',
      },
      {
        headline: 'Sopra i dati reali',
        body: 'Si basa su argomenti e struttura dei top result della SERP, non su modelli generici di addestramento del modello.',
      },
      {
        headline: 'Adattamento al pubblico',
        body: 'Adatta tono e profondità in base a keyword, intent di ricerca e pubblico target indicato per il progetto.',
      },
      {
        headline: 'Markdown o HTML',
        body: "Restituisce il testo in Markdown o HTML, pronto per il copia-incolla nel tuo CMS o CMS headless.",
      },
    ],
    details: [
      { title: 'Categoria', value: 'Generazione' },
      { title: 'Formati', value: '4 tipi' },
      { title: 'Toni', value: '6 preset' },
      { title: 'Output', value: 'Markdown / HTML' },
    ],
  },
  {
    slug: 'ottimizzazione-contenuti',
    category: 'Generazione',
    name: 'Software di ottimizzazione contenuti SEO',
    description:
      'Aggiorna gli articoli pubblicati con dati SERP attuali. Verbalist identifica gap, sezioni datate e modifiche prioritarie senza riscritture.',
    overviewHeadline: 'Aggiornamenti puntuali, niente riscritture da zero',
    overviewBody:
      'Verbalist confronta i contenuti già online con la SERP corrente e ti suggerisce dove intervenire. Modifiche puntuali, niente riscritture da capo.',
    capabilities: [
      {
        headline: 'Confronto con la SERP',
        body: 'Aggiorna contenuti già pubblicati confrontandoli con la SERP corrente per la stessa keyword target.',
      },
      {
        headline: 'Testo, URL o PDF',
        body: 'Accetta in input testo libero, URL diretti o file PDF del contenuto da riscrivere o aggiornare.',
      },
      {
        headline: 'Gap e sezioni datate',
        body: 'Identifica argomenti mancanti, sezioni datate e gap di copertura rispetto ai top result correnti.',
      },
      {
        headline: 'Modifiche prioritarie',
        body: 'Riscrive applicando le modifiche identificate, ordinate per priorità (critical, major, minor). Stile e struttura originali del testo vengono mantenuti.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Generazione' },
      { title: 'Input accettati', value: 'Testo, URL, PDF' },
      { title: 'Approccio', value: 'Modifiche puntuali' },
      { title: 'Stile originale', value: 'Mantenuto' },
    ],
  },
  {
    slug: 'brand-tone-of-voice',
    category: 'Brand',
    name: 'Brand tone of voice per contenuti AI',
    description:
      'Applica il tuo brand a ogni contenuto generato: 6 toni preset, brand guidelines via PDF, terminologia coerente per progetto.',
    overviewHeadline: 'Lo stesso brand su ogni contenuto, senza riconfigurarlo',
    overviewBody:
      'Toni di voce, terminologia e vincoli editoriali. Verbalist apprende il tuo brand e lo applica automaticamente a tutto quello che scrive.',
    capabilities: [
      {
        headline: 'Sei toni di voce',
        body: 'Sei toni di voce preconfigurati, dal professionale al conversazionale. Selezionabile per ogni progetto.',
      },
      {
        headline: 'Documenti in PDF',
        body: 'Carica brand book, white paper e documenti di riferimento in PDF per dare contesto al modello.',
      },
      {
        headline: 'Brand guidelines',
        body: 'Vincoli editoriali tramite testo libero o PDF: tono, terminologia ufficiale, parole da evitare.',
      },
      {
        headline: 'Coerenza per progetto',
        body: 'Le stesse regole si applicano automaticamente a tutti i contenuti del progetto, senza riconfigurarle ogni volta.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Brand' },
      { title: 'Toni', value: '6 preset' },
      { title: 'Documenti', value: 'Fino a 3 PDF' },
      { title: 'Vincoli', value: 'Editoriali' },
    ],
  },
  {
    slug: 'multi-lingua',
    category: 'Infrastruttura',
    name: 'Generazione contenuti SEO multilingua',
    description:
      'Genera contenuti nativi nella lingua del mercato target, partendo dalla SERP locale e non da una traduzione automatica della versione italiana.',
    overviewHeadline: 'Contenuti nativi nella SERP locale, non traduzioni',
    overviewBody:
      'Verbalist non traduce. Genera contenuti partendo dalla SERP locale, con keyword e idiomi specifici del mercato target.',
    capabilities: [
      {
        headline: 'Lingue ISO 2',
        body: 'Supporta tutte le lingue principali tramite codice ISO 2 (IT, EN, FR, DE, ES e altre).',
      },
      {
        headline: 'Location e device',
        body: 'Imposta location e device per ottenere risultati Google geo-rilevanti per il mercato target.',
      },
      {
        headline: 'Coerenza tra lingue',
        body: 'Mantiene tono di voce, terminologia e vincoli editoriali coerenti tra le diverse lingue del progetto.',
      },
      {
        headline: 'Generazione nativa',
        body: 'Parte dalla SERP locale, non da una globale. Keyword e idiomi del mercato target, non traduzioni.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Infrastruttura' },
      { title: 'Lingue', value: 'ISO 2' },
      { title: 'Location', value: 'Globale' },
      { title: 'Device', value: 'Multi-device' },
    ],
  },
]

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}

export function getOtherFeatures(slug: string): Feature[] {
  return features.filter((f) => f.slug !== slug)
}
