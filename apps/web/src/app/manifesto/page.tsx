import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Wallpaper } from '@/components/elements/wallpaper'

const SITE_URL = 'https://www.verbalist.it'

export const metadata = {
  title: 'Manifesto',
  description:
    "Il content marketing era un mestiere data-driven. Poi è arrivato il prompt. Verbalist torna al dato — il manifesto che spiega perché lo facciamo.",
  alternates: { canonical: '/manifesto' },
  openGraph: {
    title: 'Manifesto — Verbalist',
    description:
      "Il content marketing era un mestiere data-driven. Poi è arrivato il prompt. Verbalist torna al dato.",
    url: `${SITE_URL}/manifesto`,
    type: 'article',
  },
}

const manifestoSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${SITE_URL}/manifesto#article`,
  headline: 'Il content marketing era un mestiere data-driven. Poi è arrivato il prompt.',
  description:
    "Il content marketing era un mestiere data-driven. Poi è arrivato il prompt. Verbalist torna al dato.",
  url: `${SITE_URL}/manifesto`,
  inLanguage: 'it-IT',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/manifesto` },
  author: { '@id': `${SITE_URL}/#organization` },
  publisher: { '@id': `${SITE_URL}/#organization` },
  articleSection: 'Manifesto',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Manifesto', item: `${SITE_URL}/manifesto` },
  ],
}

export default function ManifestoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(manifestoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative">
        <Wallpaper color="purple" className="min-h-[clamp(320px,55svh,420px)]">
          <Container className="flex min-h-[clamp(320px,55svh,420px)] flex-col justify-end gap-6 py-16">
            <p className="text-xs/5 font-semibold tracking-wide text-white/80 uppercase">
              Manifesto
            </p>
            <Heading color="light" size="md" className="max-w-4xl">
              Il content marketing era un mestiere data-driven. Poi è arrivato il prompt.
            </Heading>
          </Container>
        </Wallpaper>
      </section>

      <article className="py-16">
        <Container className="max-w-2xl lg:max-w-2xl">
          <div className="flex flex-col gap-6 text-lg/8 text-mist-700">
            <p>
              Per vent&rsquo;anni la SEO ha lavorato sopra dati: SERP, competitor, log di
              ricerca, brief. Era un mestiere preciso. Si leggevano i dati e si scriveva sopra
              di essi. Funzionava o no, ma c&rsquo;era una misura.
            </p>

            <p>Poi è arrivata l&apos;intelligenza artificiale. E i contenuti sono diventati un prompt.</p>

            <p>
              «Crea un articolo su X», «Riscrivi questo blog post in tono Y». Il prompt sposta il
              lavoro dal dato al modello — da quello che la SERP dice, a quello che il modello sa
              già. La keyword reale, le domande coperte dai competitor, il contesto del cliente
              non entrano più nel testo. Funziona. Ma si vede.
            </p>

            <p>
              Si vede sui motori AI. ChatGPT, Perplexity, Gemini citano contenuti con dati
              strutturati e fonti riconoscibili. Non testi generici prodotti dallo stesso modello.
            </p>

            <p>
              Si vede su Google. I contenuti che si posizionano sono quelli che rispondono alle
              query reali della SERP, non quelli scritti per la SEO immaginata di cinque anni fa.
            </p>

            <p className="text-mist-950">Verbalist torna al dato.</p>

            <ul className="flex flex-col gap-3 pl-0">
              <li className="flex gap-3">
                <span className="text-mist-500" aria-hidden="true">
                  —
                </span>
                <span>Analizziamo la SERP, non il prompt.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-mist-500" aria-hidden="true">
                  —
                </span>
                <span>Estraiamo il contesto dai competitor sulla keyword target.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-mist-500" aria-hidden="true">
                  —
                </span>
                <span>
                  Costruiamo brief sopra le evidenze raccolte, non sopra l&rsquo;output del
                  modello.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-mist-500" aria-hidden="true">
                  —
                </span>
                <span>
                  Output in Markdown o HTML, con Schema.org strutturato. Pronto per Google e per
                  i motori AI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-mist-500" aria-hidden="true">
                  —
                </span>
                <span>
                  Pricing una tantum, perché non vogliamo affittarti il software ogni mese.
                </span>
              </li>
            </ul>

            <p>
              Il content engineering è il ritorno della SEO al suo mestiere originario: scrivere
              sopra dati di ricerca, non riempire un prompt.
            </p>

            <p className="pt-6 text-base/7 text-mist-950">
              — Team Verbalist
              <br />
              <span className="text-mist-700">NUR S.r.l.</span>
            </p>
          </div>
        </Container>
      </article>
    </>
  )
}
