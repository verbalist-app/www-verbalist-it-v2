export type Customer = {
  slug: string
  name: string
  logo: { src: string; width: number; height: number }
  testimonial: string
  ctaTitle: string
  about: string
  challenge: string
  approach: string
  results: string[]
  details: { title: string; value: string }[]
  cardFootnote: string
}

export const customers: Customer[] = [
  {
    slug: 'rentokil',
    name: 'Rentokil',
    logo: { src: '/img/logos/rentokil.svg', width: 100, height: 32 },
    testimonial:
      'Con Verbalist abbiamo ridotto drasticamente il tempo per produrre articoli SEO multilingua, mantenendo la coerenza editoriale tra i mercati.',
    ctaTitle:
      'Come Rentokil produce contenuti SEO su scala mantenendo lo stesso tono di voce in 5 lingue.',
    about:
      'Rentokil è leader globale nei servizi di pest control e hygiene, presente in oltre 80 paesi con un\'ampia produzione editoriale tematica destinata a clienti business e consumer.',
    challenge:
      'Produrre articoli SEO su un volume elevato, in più lingue e mercati, mantenendo coerenza terminologica e brand voice. Ogni mercato ha SERP, intenti di ricerca e regolamentazioni diverse.',
    approach:
      "Verbalist analizza la SERP locale per ogni keyword, costruisce il brief sulle evidenze dei top result e genera l'articolo nella lingua del mercato. Il tono di voce e i vincoli editoriali del brand restano identici, paese per paese.",
    results: [
      'Articoli SEO multilingua prodotti su scala, con tempi di pubblicazione ridotti drasticamente.',
      'Workflow editoriale coerente tra i mercati internazionali, con tono di voce e terminologia uniformi.',
      'Analisi SERP locale integrata nel processo di scrittura, allineata agli intenti di ricerca del mercato.',
    ],
    details: [
      { title: 'Settore', value: 'Pest control e hygiene' },
      { title: 'Sede', value: 'Crawley, UK' },
      { title: 'Dipendenti', value: '56.000+' },
      { title: 'Gruppo', value: 'Rentokil Initial' },
      { title: 'Servizi', value: 'Contenuti SEO multilingua, blog e landing' },
    ],
    cardFootnote: 'Pest control · 56.000+ dipendenti · Crawley, UK',
  },
  {
    slug: 'pompea',
    name: 'Pompea',
    logo: { src: '/img/logos/pompea.svg', width: 100, height: 32 },
    testimonial:
      'Con Verbalist le nostre schede prodotto e gli articoli del blog escono più rapidamente, senza perdere il tono di voce del brand.',
    ctaTitle:
      "Come Pompea ottimizza schede prodotto e contenuti editoriali per l'e-commerce moda.",
    about:
      "Pompea è uno storico brand italiano di intimo, calze e abbigliamento, presente nella grande distribuzione e online con un catalogo ampio e in costante evoluzione stagionale.",
    challenge:
      "Il catalogo Pompea cambia ogni stagione e l'e-commerce richiede schede prodotto sempre fresche, ottimizzate per le keyword giuste e coerenti con il tono del brand. Scrivere centinaia di descrizioni a ogni rilascio era un collo di bottiglia.",
    approach:
      "Verbalist genera schede prodotto a partire dai dati di catalogo e dall'analisi delle SERP per ciascuna categoria, mantenendo la voce Pompea. Lo stesso flusso alimenta il blog editoriale, che viene aggiornato con articoli stagionali allineati alle ricerche dei clienti.",
    results: [
      'Schede prodotto pubblicate più rapidamente a ogni rilascio stagionale.',
      'Articoli editoriali allineati ai trend di ricerca dei clienti, prodotti senza saturare il team.',
      'Tono di voce coerente tra catalogo, blog e landing di campagna.',
    ],
    details: [
      { title: 'Settore', value: 'Fashion, intimo e calzetteria' },
      { title: 'Sede', value: 'Mantova, IT' },
      { title: 'Dipendenti', value: '200+' },
      { title: 'Gruppo', value: 'Pompea S.p.A.' },
      { title: 'Servizi', value: 'Schede prodotto e-commerce, blog editoriale, landing campagne' },
    ],
    cardFootnote: 'E-commerce moda · 200+ dipendenti · Mantova, IT',
  },
  {
    slug: 'meccanotecnica',
    name: 'Meccanotecnica',
    logo: { src: '/img/logos/meccanotecnica.svg', width: 100, height: 32 },
    testimonial:
      'Verbalist ci aiuta a produrre contenuti tecnici in più lingue mantenendo precisione terminologica e tono di voce corporate.',
    ctaTitle:
      'Come Meccanotecnica produce contenuti tecnici multilingua per i mercati export.',
    about:
      "Meccanotecnica è un'azienda italiana del settore manifatturiero, attiva nella progettazione e produzione di componenti meccanici di precisione, con una presenza commerciale consolidata sui principali mercati internazionali.",
    challenge:
      'I clienti business di Meccanotecnica cercano informazioni tecniche puntuali sui componenti, in inglese, tedesco, francese e altre lingue. Tradurre e adattare il sito senza perdere precisione terminologica richiedeva tempi lunghi e supervisione costante.',
    approach:
      'Verbalist genera contenuti tecnici nella lingua di destinazione partendo dalle SERP locali, con la terminologia corporate caricata come riferimento. Il team marketing valida e pubblica, riducendo il ciclo di approvazione tra Italia e filiali estere.',
    results: [
      'Schede tecniche e pagine prodotto pubblicate nelle lingue dei mercati export.',
      'Terminologia tecnica coerente con il glossario corporate, applicata automaticamente.',
      'Cicli di revisione tra sede italiana e filiali estere ridotti significativamente.',
    ],
    details: [
      { title: 'Settore', value: 'Manifatturiero, componenti meccanici' },
      { title: 'Sede', value: 'Italia' },
      { title: 'Dipendenti', value: '150+' },
      { title: 'Gruppo', value: 'Meccanotecnica S.r.l.' },
      { title: 'Servizi', value: 'Pagine prodotto, schede tecniche, blog di settore multilingua' },
    ],
    cardFootnote: 'Manifatturiero · 150+ dipendenti · Italia',
  },
  {
    slug: 'plastisac',
    name: 'Plastisac',
    logo: { src: '/img/logos/plastisac.svg', width: 100, height: 32 },
    testimonial:
      'Con Verbalist riusciamo a tenere aggiornate centinaia di schede prodotto del nostro catalogo packaging senza sovraccaricare il team.',
    ctaTitle:
      'Come Plastisac mantiene un ampio catalogo packaging sempre aggiornato e ottimizzato SEO.',
    about:
      "Plastisac è un'azienda italiana specializzata in soluzioni di packaging in plastica per il settore industriale, con un catalogo ampio destinato a clienti business di diversi comparti.",
    challenge:
      "Il catalogo Plastisac comprende centinaia di referenze tecniche, in continua evoluzione. Mantenere aggiornate descrizioni e schede prodotto in modo SEO-friendly era un'attività che il team marketing svolgeva manualmente, con tempi di rilascio lunghi.",
    approach:
      'Verbalist genera e aggiorna le schede prodotto partendo dai dati tecnici di catalogo e dalle SERP per ciascuna categoria di packaging. Le specifiche tecniche e il tono Plastisac vengono mantenuti, mentre il team gestisce la validazione finale.',
    results: [
      'Schede prodotto del catalogo aggiornate con un flusso ripetibile e governato.',
      'Contenuti SEO allineati a ciò che i buyer cercano per ogni categoria di packaging.',
      'Tempi di rilascio sulle nuove referenze ridotti, con il team marketing più libero su attività strategiche.',
    ],
    details: [
      { title: 'Settore', value: 'Packaging industriale' },
      { title: 'Sede', value: 'Italia' },
      { title: 'Dipendenti', value: '100+' },
      { title: 'Gruppo', value: 'Plastisac S.r.l.' },
      { title: 'Servizi', value: 'Schede prodotto catalogo, pagine categoria, contenuti SEO B2B' },
    ],
    cardFootnote: 'Packaging industriale · 100+ dipendenti · Italia',
  },
  {
    slug: 'sogese',
    name: 'Sogese',
    logo: { src: '/img/logos/sogese.svg', width: 100, height: 32 },
    testimonial:
      'Verbalist ci permette di produrre landing e articoli SEO sui nostri servizi senza dipendere da agenzie esterne.',
    ctaTitle:
      'Come Sogese acquisisce richieste qualificate generando contenuti SEO sui servizi B2B.',
    about:
      "Sogese è una società italiana di servizi B2B, con un'offerta articolata su più aree di attività rivolte a clienti business e a strutture pubbliche e private.",
    challenge:
      'Per intercettare le richieste qualificate dei clienti business, Sogese aveva bisogno di landing dedicate per ogni servizio, ottimizzate sulle keyword giuste e coerenti con la voce aziendale. Affidarsi ad agenzie esterne era costoso e i tempi non rispondevano alla velocità del mercato.',
    approach:
      'Verbalist genera landing e articoli SEO per ciascuna area di servizio, partendo dall\'analisi della SERP locale e dalle indicazioni del team commerciale. Le pagine vengono pubblicate rapidamente e aggiornate ogni volta che la SERP cambia, senza dover riavviare un processo esterno.',
    results: [
      'Landing dedicate per ciascuna area di servizio, prodotte internamente in autonomia.',
      'Acquisizione organica supportata da contenuti SEO allineati alle ricerche dei buyer B2B.',
      'Aggiornamenti dei contenuti rapidi, senza dipendere da agenzie esterne.',
    ],
    details: [
      { title: 'Settore', value: 'Servizi B2B' },
      { title: 'Sede', value: 'Italia' },
      { title: 'Dipendenti', value: '300+' },
      { title: 'Gruppo', value: 'Sogese S.r.l.' },
      { title: 'Servizi', value: 'Landing servizi, blog SEO, contenuti acquisizione' },
    ],
    cardFootnote: 'Servizi B2B · 300+ dipendenti · Italia',
  },
  {
    slug: 'jurny',
    name: 'Jurny',
    logo: { src: '/img/logos/jurny.svg', width: 100, height: 32 },
    testimonial:
      'Verbalist ci permette di produrre contenuti SEO localizzati per ogni mercato in cui operiamo, senza moltiplicare i tempi del team.',
    ctaTitle:
      'Come Jurny scala i contenuti SEO per le destinazioni internazionali in cui gestisce property.',
    about:
      'Jurny è una piattaforma di property management automatizzata per affitti brevi, attiva in più mercati internazionali con un\'offerta basata su tecnologia e AI.',
    challenge:
      'Jurny gestisce property in decine di città e paesi, ognuno con keyword, intenti di ricerca e domande tipiche degli host molto diverse. Mantenere un blog SEO aggiornato per ciascun mercato con un team ridotto era insostenibile.',
    approach:
      'Verbalist genera contenuti SEO localizzati partendo dalla SERP del singolo mercato. Il tono di voce e i punti chiave del prodotto restano coerenti tra paesi, mentre keyword, esempi e riferimenti normativi sono adattati al contesto locale.',
    results: [
      'Contenuti localizzati prodotti su scala per ogni nuovo mercato in cui Jurny si espande.',
      'Tono di voce uniforme tra le diverse destinazioni, allineato al posizionamento del brand.',
      'Tempi di pubblicazione ridotti, con un team editoriale ridotto che governa il flusso.',
    ],
    details: [
      { title: 'Settore', value: 'PropTech, affitti brevi' },
      { title: 'Sede', value: 'Los Angeles, US' },
      { title: 'Dipendenti', value: '100+' },
      { title: 'Gruppo', value: 'Jurny Inc.' },
      { title: 'Servizi', value: 'Blog SEO multilingua, guide host, landing per destinazione' },
    ],
    cardFootnote: 'PropTech · 100+ dipendenti · Los Angeles, US',
  },
]

export function getCustomer(slug: string): Customer | undefined {
  return customers.find((c) => c.slug === slug)
}

export function getOtherCustomers(slug: string): Customer[] {
  return customers.filter((c) => c.slug !== slug)
}
