import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { ButtonLink } from '@/components/elements/button'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Heading } from '@/components/elements/heading'
import { Wallpaper } from '@/components/elements/wallpaper'
import { features, getFeature } from '../_data/features'

type WallpaperColor = 'purple' | 'blue' | 'green' | 'brown'

type SlugContent = {
  title: string
  body: ReactNode[]
  list: ReactNode[]
  closing: ReactNode
  color: WallpaperColor
}

const slugContent: Record<string, SlugContent> = {
  'analisi-serp': {
    title: 'Verbalist legge la SERP della tua keyword',
    color: 'purple',
    body: [
      "L'analisi SERP è la lettura sistematica dei primi 10 risultati organici di Google per una keyword target. Verbalist la esegue a ogni richiesta, ricostruendo argomenti, struttura editoriale e domande coperte dai concorrenti.",
      "Il risultato è un brief. Trovi gli argomenti dei concorrenti, la struttura tipica per capitoli e sotto-paragrafi, le domande coperte e i gap: temi assenti dai top 10 che dovresti coprire.",
      "Tutto questo prima di scrivere una riga. Il brief è il riferimento che usi al posto del foglio bianco.",
    ],
    list: [
      'Top 10 organici di Google, dalla SERP locale del paese che indichi.',
      'Argomenti, struttura editoriale, domande coperte dai competitor.',
      'Gap di copertura rispetto ai top result.',
      'Lingua, location e device personalizzabili per mercato.',
    ],
    closing: "L'analisi della SERP è il primo agente del flusso Verbalist. Tutti gli altri partono da qui.",
  },
  'generazione-contenuti': {
    title: 'Verbalist scrive sopra l’analisi della SERP, non da un prompt',
    color: 'blue',
    body: [
      "La generazione di contenuti SEO con Verbalist è la stesura automatica di articoli, schede prodotto, guide o landing page a partire dal brief uscito dall'analisi SERP. Tu scegli formato e tono, Verbalist compone il testo sopra le evidenze raccolte dai competitor della keyword target.",
      "Scegli tra quattro formati di output e sei toni di voce. Verbalist regola profondità e taglio del testo in base alla keyword, all'intent di ricerca e al pubblico target che hai indicato.",
      "L'output esce in Markdown o HTML, senza CSS né classi custom da ripulire. Lo incolli direttamente nel CMS.",
    ],
    list: [
      'Quattro formati: articolo, scheda prodotto, guida, landing page.',
      'Sei toni di voce: professionale, casual, formale, amichevole, autorevole, conversazionale.',
      'Profondità e taglio del testo guidati da keyword, intent e pubblico target.',
      'Output in Markdown o HTML, senza CSS o classi custom.',
    ],
    closing: "Circa cinque minuti dalla keyword alla prima bozza. Tu rifinisci e pubblichi.",
  },
  'ottimizzazione-contenuti': {
    title: 'Verbalist aggiorna i contenuti che hai già pubblicato',
    color: 'green',
    body: [
      "L'ottimizzazione di un contenuto esistente è il confronto sistematico tra un articolo già pubblicato e i top 10 della SERP corrente per la stessa keyword. Verbalist accetta testo, URL o PDF e identifica argomenti mancanti, sezioni datate e gap di copertura.",
      "Verbalist mostra i gap rispetto ai competitor di oggi, le sezioni datate e gli argomenti mancanti. Ti suggerisce dove intervenire e produce una versione aggiornata del tuo testo.",
      "La riscrittura non parte da zero: stile e struttura dell'originale restano in piedi. Le modifiche sono puntuali, ordinate per priorità (critiche, importanti, minori).",
    ],
    list: [
      'Confronto con la SERP attuale per la stessa keyword target.',
      'Accetta testo libero, URL diretti o file PDF.',
      'Modifiche ordinate per priorità: critical, major, minor.',
      'Stile e struttura originali del testo vengono mantenuti.',
    ],
    closing: "La SERP cambia nel tempo. I tuoi contenuti dovrebbero seguire.",
  },
  'brand-tone-of-voice': {
    title: 'Verbalist applica il tuo brand a ogni contenuto, senza riconfigurarlo',
    color: 'brown',
    body: [
      "Il brand tone of voice in Verbalist è la configurazione del registro linguistico, della terminologia ufficiale e dei vincoli editoriali del tuo brand. Si imposta una volta sola caricando brand guidelines come testo libero o PDF, e si applica a tutti i contenuti generati nello stesso progetto.",
      "Dopo quella configurazione, ogni contenuto che generi rispetta il tuo brand. Verbalist applica le stesse regole su tutti i progetti del medesimo brand.",
      "Se hai più brand sotto lo stesso account, ogni progetto eredita il suo set di regole. Le impostazioni dei brand restano separate.",
    ],
    list: [
      'Sei toni di voce preconfigurati, dal professionale al conversazionale.',
      'Brand guidelines via PDF, fino a 3 documenti per progetto.',
      'Terminologia ufficiale, parole da evitare, contesto editoriale.',
      'Stesse regole applicate a tutti i contenuti del progetto.',
    ],
    closing: "Configuri il brand una volta sola. Vale per ogni articolo che generi dopo.",
  },
  'multi-lingua': {
    title: 'Verbalist genera in lingua nativa, non traduce',
    color: 'purple',
    body: [
      "La generazione multi-lingua di Verbalist è la produzione di contenuti SEO direttamente nella lingua di destinazione, a partire dalla SERP locale del mercato target. Verbalist supporta oltre 30 lingue e per ogni mercato legge la SERP di quel paese, identifica le keyword native e applica gli idiomi locali.",
      "Imposti location, lingua e device del mercato target. Verbalist recupera la SERP di quel paese e produce contenuti pensati per quel pubblico.",
      "Brand tone e vincoli editoriali del progetto restano coerenti su tutte le lingue. Cambia la lingua, non il modo in cui il brand parla.",
    ],
    list: [
      '30+ lingue principali, da IT a EN, FR, DE, ES e altre.',
      'Location e device personalizzabili per indicizzazione locale su Google.',
      'SERP locale come fonte, non traduzione dall’italiano.',
      'Tono di voce e brand coerenti tra le lingue.',
    ],
    closing: "Più mercati. Una sola identità editoriale.",
  },
}

const SITE_URL = 'https://www.verbalist.it'

export async function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const feature = getFeature(slug)
  if (!feature) return {}
  return {
    title: feature.name,
    description: feature.description,
    alternates: { canonical: `/prodotto/${slug}` },
    openGraph: {
      title: feature.name,
      description: feature.description,
      url: `${SITE_URL}/prodotto/${slug}`,
      type: 'article',
    },
  }
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = slugContent[slug]
  const feature = getFeature(slug)
  if (!content || !feature) notFound()

  const featureSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/prodotto/${slug}#software`,
    name: feature.name,
    alternateName: feature.shortName,
    description: feature.description,
    url: `${SITE_URL}/prodotto/${slug}`,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'SEO software',
    operatingSystem: 'Web',
    inLanguage: 'it-IT',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    screenshot: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/img/screenshots/dashboard.webp`,
      width: 2442,
      height: 1414,
    },
    offers: {
      '@type': 'AggregateOffer',
      url: `${SITE_URL}/pricing`,
      priceCurrency: 'EUR',
      lowPrice: '270',
      highPrice: '500',
      offerCount: 2,
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Prodotto' },
      {
        '@type': 'ListItem',
        position: 3,
        name: feature.shortName,
        item: `${SITE_URL}/prodotto/${slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="relative">
        <Wallpaper color={content.color} className="min-h-[420px]">
          <Container className="flex min-h-[420px] flex-col justify-end gap-6 py-16">
            <div className="flex flex-col gap-2">
              <Eyebrow className="text-white/80">{feature.shortName}</Eyebrow>
              <Heading color="light" size="md" className="max-w-4xl">
                {content.title}
              </Heading>
            </div>
          </Container>
        </Wallpaper>
      </section>

      <article className="py-16">
        <Container className="max-w-2xl lg:max-w-2xl">
          <div className="flex flex-col gap-6 text-lg/8 text-mist-700">
            {content.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            <ul className="flex flex-col gap-3 pl-0">
              {content.list.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-mist-500" aria-hidden="true">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-mist-950">{content.closing}</p>

            <ButtonLink href="/signup" className="mt-4 self-start">
              Prova gratis 1 mese
            </ButtonLink>
          </div>
        </Container>
      </article>
    </>
  )
}
