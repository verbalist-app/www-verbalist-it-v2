export type Capability = {
  icon: string
  headline: string
  body: string
}

export type Feature = {
  slug: string
  category: string
  icon: string
  name: string
  shortName: string
  description: string
  overviewHeadline: string
  overviewBody: string
  capabilities: Capability[]
  details: { title: string; value: string }[]
  customerSlug: string
}

export const features: Feature[] = [
  {
    slug: 'analisi-serp',
    category: 'Ricerca dati',
    icon: 'magnifying-glass',
    name: 'Analisi SERP per content engineering',
    shortName: 'Analisi SERP',
    description:
      'Verbalist legge i primi 10 risultati di Google per la tua keyword e ti consegna un brief con argomenti, domande coperte e gap rispetto ai competitor.',
    overviewHeadline: 'Brief strutturati dalla SERP della tua keyword',
    overviewBody:
      'Verbalist analizza i primi 10 risultati di Google per la tua keyword e li trasforma in un brief editoriale: argomenti, struttura, gap di copertura.',
    capabilities: [
      {
        icon: 'magnifying-glass',
        headline: 'Top 10 di Google',
        body: 'Recupera le prime 10 posizioni organiche di Google per la tua keyword, su qualsiasi mercato supportato.',
      },
      {
        icon: 'book-open',
        headline: 'Argomenti, struttura, domande',
        body: 'Per ogni risultato in top 10 estrae argomenti, struttura editoriale e domande coperte.',
      },
      {
        icon: 'target',
        headline: 'Temi ricorrenti e gap',
        body: 'Mostra i temi che ricorrono nei competitor e i gap di copertura rispetto ai top result.',
      },
      {
        icon: 'map',
        headline: 'Lingua, location, device',
        body: 'Imposti lingua, location e device del paese che ti interessa: Verbalist usa quella SERP come fonte.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Ricerca dati' },
      { title: 'Posizioni', value: 'Top 10 organici' },
      { title: 'Output', value: 'Brief strutturato' },
      { title: 'Lingue', value: 'Multi-lingua' },
    ],
    customerSlug: 'rentokil',
  },
  {
    slug: 'generazione-contenuti',
    category: 'Generazione',
    icon: 'book-open',
    name: 'Software di generazione contenuti SEO',
    shortName: 'Generazione contenuti',
    description:
      'Articoli, schede prodotto, guide e landing page. Verbalist parte dal brief della SERP e scrive sopra le evidenze raccolte dai competitor. Output in Markdown o HTML.',
    overviewHeadline: 'Articoli SEO scritti sopra dati reali, non un prompt',
    overviewBody:
      'Articoli, schede prodotto, guide o landing page. Verbalist scrive a partire dalle evidenze raccolte sulla SERP della tua keyword.',
    capabilities: [
      {
        icon: 'squares-2-stacked',
        headline: 'Quattro formati di output',
        body: 'Genera articoli, schede prodotto, guide e landing page da zero, in italiano e nelle altre lingue supportate.',
      },
      {
        icon: 'chart-bar',
        headline: 'Sopra i dati reali',
        body: 'Costruisce il testo dagli argomenti e dalla struttura dei top result della SERP. La fonte è la ricerca, non l’addestramento del modello.',
      },
      {
        icon: 'user-2',
        headline: 'Adattamento al pubblico',
        body: 'Tono e profondità seguono la keyword, l’intent di ricerca e il pubblico target del progetto.',
      },
      {
        icon: 'code-square',
        headline: 'Markdown o HTML',
        body: 'Restituisce il testo in Markdown o HTML, senza CSS o classi custom. Lo incolli direttamente nel CMS, anche headless.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Generazione' },
      { title: 'Formati', value: '4 tipi' },
      { title: 'Toni', value: '6 preset' },
      { title: 'Output', value: 'Markdown / HTML' },
    ],
    customerSlug: 'pompea',
  },
  {
    slug: 'ottimizzazione-contenuti',
    category: 'Generazione',
    icon: 'git-diff',
    name: 'Software di ottimizzazione contenuti SEO',
    shortName: 'Ottimizzazione contenuti',
    description:
      'Verbalist confronta i tuoi contenuti già pubblicati con la SERP attuale e ti dice dove intervenire. Modifiche puntuali, ordinate per priorità.',
    overviewHeadline: 'Aggiornamenti puntuali, niente riscritture da zero',
    overviewBody:
      'Inserisci testo, URL o PDF di un contenuto già online: Verbalist lo confronta con la SERP corrente per la stessa keyword e ti suggerisce dove intervenire.',
    capabilities: [
      {
        icon: 'git-diff',
        headline: 'Confronto con la SERP',
        body: 'Aggiorna contenuti già pubblicati confrontandoli con la SERP corrente per la stessa keyword target.',
      },
      {
        icon: 'document-2-stacked',
        headline: 'Testo, URL o PDF',
        body: 'Accetta in input testo libero, URL diretti o file PDF del contenuto da riscrivere o aggiornare.',
      },
      {
        icon: 'alert-triangle',
        headline: 'Gap e sezioni datate',
        body: 'Per ogni testo individua argomenti mancanti, sezioni datate e gap di copertura rispetto ai top result correnti.',
      },
      {
        icon: 'sliders',
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
    customerSlug: 'plastisac',
  },
  {
    slug: 'brand-tone-of-voice',
    category: 'Brand',
    icon: 'fingerprint',
    name: 'Brand tone of voice per contenuti AI',
    shortName: 'Brand & Tone of voice',
    description:
      'Configuri il brand una volta sola: tono di voce, terminologia ufficiale, parole da evitare. Ogni contenuto che generi dopo segue quelle regole.',
    overviewHeadline: 'Lo stesso brand su ogni contenuto, senza riconfigurarlo',
    overviewBody:
      'Il brand del progetto vive in un solo posto. Tutti i contenuti che generi dopo rispettano la stessa configurazione.',
    capabilities: [
      {
        icon: 'microphone',
        headline: 'Sei toni di voce',
        body: 'Sei toni di voce preconfigurati, dal professionale al conversazionale. Selezionabili per ogni progetto.',
      },
      {
        icon: 'paperclip',
        headline: 'Documenti in PDF',
        body: 'Fino a 3 PDF per progetto, dal brand book ai white paper. Il modello li legge come contesto.',
      },
      {
        icon: 'fingerprint',
        headline: 'Brand guidelines',
        body: 'Vincoli editoriali tramite testo libero o PDF: tono, terminologia ufficiale, parole da evitare.',
      },
      {
        icon: 'star',
        headline: 'Coerenza per progetto',
        body: 'Le stesse regole valgono per tutti i contenuti del progetto. La configurazione del brand si imposta una sola volta.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Brand' },
      { title: 'Toni', value: '6 preset' },
      { title: 'Documenti', value: 'Fino a 3 PDF' },
      { title: 'Vincoli', value: 'Editoriali' },
    ],
    customerSlug: 'meccanotecnica',
  },
  {
    slug: 'multi-lingua',
    category: 'Infrastruttura',
    icon: 'language',
    name: 'Generazione contenuti SEO multilingua',
    shortName: 'Multi-lingua',
    description:
      'Per ogni mercato Verbalist parte dalla SERP locale di quel paese e genera direttamente nella lingua di destinazione, con keyword e idiomi del posto. Supporta 30+ lingue.',
    overviewHeadline: 'Contenuti nativi nella SERP locale, non traduzioni',
    overviewBody:
      'Verbalist non traduce. Genera contenuti partendo dalla SERP locale, con keyword e idiomi specifici del mercato target.',
    capabilities: [
      {
        icon: 'language',
        headline: 'Lingue ISO 2',
        body: 'Supporta tutte le lingue principali tramite codice ISO 2 (IT, EN, FR, DE, ES e altre).',
      },
      {
        icon: 'map-pin',
        headline: 'Location e device',
        body: 'Imposta location e device per ottenere risultati Google specifici del mercato che hai scelto.',
      },
      {
        icon: 'arrow-left-arrow-right',
        headline: 'Coerenza tra lingue',
        body: 'Tono di voce e brand guidelines del progetto rimangono coerenti su tutte le lingue.',
      },
      {
        icon: 'flag',
        headline: 'Generazione nativa',
        body: 'Per ogni lingua Verbalist usa la SERP locale come fonte. Keyword e idiomi sono quelli del mercato target.',
      },
    ],
    details: [
      { title: 'Categoria', value: 'Infrastruttura' },
      { title: 'Lingue', value: 'ISO 2' },
      { title: 'Location', value: 'Globale' },
      { title: 'Device', value: 'Multi-device' },
    ],
    customerSlug: 'jurny',
  },
]

export function getFeature(slug: string): Feature | undefined {
  return features.find((f) => f.slug === slug)
}

export function getOtherFeatures(slug: string): Feature[] {
  return features.filter((f) => f.slug !== slug)
}
