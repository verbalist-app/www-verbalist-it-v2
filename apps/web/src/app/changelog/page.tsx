import { Section } from '@/components/elements/section'

type ChangelogEntry = {
  version: string
  date: string
  title: string
  description: string
  items: string[]
}

const entries: ChangelogEntry[] = [
  {
    version: 'v2.0.3',
    date: '8 maggio 2026',
    title: 'Pacchetti a consumo al posto degli abbonamenti',
    description:
      'Verbalist passa da abbonamento mensile ad acquisto a consumo. Compri un pacchetto, lo usi quando ti serve. I crediti restano validi 12 mesi.',
    items: [
      'Starter: €270, 30 contenuti, crediti validi 12 mesi.',
      'Pro: €500, 70 contenuti, crediti validi 12 mesi.',
      'Custom: a contatto per volumi maggiori.',
      'Free trial aggiornato: 1 mese, 15 contenuti, senza carta di credito.',
      'Disattivazione automatica account dopo 12 mesi senza utilizzo, con avviso preventivo.',
    ],
  },
  {
    version: 'v2.0.2',
    date: '23 aprile 2026',
    title: 'Stop & Resume con contesto, competitor manuali',
    description:
      "Riprendi una generazione interrotta da dove l'avevi lasciata aggiungendo contesto manuale. Inserisci fino a 5 competitor diretti dal frontend. Avvisi licenza e crediti più chiari.",
    items: [
      'Stop & Resume con contesto manuale: alla ripresa puoi aggiungere testo libero o fino a 3 PDF caricati. Crediti non scalati in caso di errore.',
      "Campo competitor frontend: includi fino a 5 competitor obbligatori nell'analisi, indipendentemente dalla SERP.",
      "Avvisi licenza e crediti migliorati: notifiche più chiare quando l'utilizzo si avvicina al limite del piano.",
      'Bugfix UX step 2: pulsante "Ottimizza prima di Crea" sistemato, placeholder dei campi più espliciti, fix grafici minori.',
    ],
  },
  {
    version: 'v2.0.2',
    date: '17 aprile 2026',
    title: 'Modello AI aggiornato a Claude Opus 4.7',
    description:
      'Upgrade del modello di generazione da Opus 4.6 a Opus 4.7, stesso costo. Nessun feedback negativo nei test interni.',
    items: ['Modello AI aggiornato a Claude Opus 4.7, stesso costo del 4.6.'],
  },
  {
    version: 'v2.0.1',
    date: '14 aprile 2026',
    title: 'Sistema alert giornaliero e notifiche errori',
    description:
      "Alert sullo stato dell'account via email e popup in dashboard, con notifica immediata in caso di errore lato sistema.",
    items: [
      "Sistema alert mattutino: email + popup in dashboard con riepilogo dello stato dell'account.",
      'Notifiche errori lato utente: messaggio chiaro e nessun addebito crediti se la generazione fallisce.',
    ],
  },
  {
    version: 'v2.0.1',
    date: '10 aprile 2026',
    title: 'Affidabilità backend, multilingua e modello AI',
    description:
      'Patch backend: blocco e ripetizione delle generazioni senza scalare crediti, input manuale dei link da analizzare, multilingua e modello AI aggiornato.',
    items: [
      'Modello AI aggiornato a Claude Opus 4.6, stesso costo del 4.5.',
      'Stop & Retry generazione: i crediti non vengono scalati in caso di errore lato sistema.',
      "Input manuale dei link di scraping: indica fino a 5 URL competitor da includere nell'analisi oltre alla SERP.",
      'Multilingua backend: location e lingua selezionabili per ogni generazione (IT/EN al rilascio, altre lingue in arrivo).',
      'Paese SERP e lingua di generazione separati: due dropdown distinti per scegliere dove fare lo scraping e in che lingua scrivere il testo.',
    ],
  },
  {
    version: 'v2.0',
    date: '3 aprile 2026',
    title: 'Nuova UI, tono di voce e pricing per contenuto',
    description:
      "Verbalist 2.0 sostituisce l'interfaccia precedente, introduce le nuove linee guida del tono di voce del brand e adotta il pricing per contenuto al posto del consumo a token.",
    items: [
      'Nuova interfaccia: dashboard ridisegnata, wizard di creazione contenuti in 3 step, panoramica progetti con stato e crediti residui sempre visibili.',
      "Tono di voce e brand: online le nuove linee guida del tono di voce del brand su /brand. Registro, esempi do/don't, palette, logo.",
      'Pricing per contenuto, non per token: si paga in base al numero di contenuti generati al mese, prova gratuita di 15 giorni inclusa in tutti i piani.',
    ],
  },
]

export const metadata = {
  title: 'Changelog',
  description:
    "Tutti gli aggiornamenti, nuove funzionalità e correzioni di Verbalist in ordine cronologico. Note di rilascio della piattaforma di SEO automation.",
  alternates: { canonical: '/changelog' },
}

export default function ChangelogPage() {
  return (
    <Section
      eyebrow="Changelog"
      headline="Note di rilascio"
      subheadline={<p>Scopri gli ultimi rilasci e le migliorie della piattaforma.</p>}
    >
      <div className="flex flex-col gap-16 pt-8 md:gap-24">
        {entries.map((entry) => (
          <article
            key={entry.version}
            className="relative flex flex-col gap-4 md:flex-row md:gap-16"
          >
            <div className="flex h-min w-64 shrink-0 items-center gap-3 md:sticky md:top-24">
              <span className="inline-flex rounded-full bg-mist-950/10 px-2 text-xs/6 font-medium text-mist-950 dark:bg-white/10 dark:text-white">
                {entry.version}
              </span>
              <time className="text-xs font-medium text-mist-600 dark:text-mist-500">{entry.date}</time>
            </div>

            <div className="flex flex-col">
              <h2 className="font-display text-2xl/8 font-medium tracking-tight text-balance text-mist-950 md:text-3xl/10 dark:text-white">
                {entry.title}
              </h2>
              <p className="mt-4 text-sm/7 text-mist-700 dark:text-mist-400">{entry.description}</p>
              <ul className="mt-6 ml-4 space-y-2 text-sm/7 text-mist-700 dark:text-mist-400">
                {entry.items.map((item) => (
                  <li
                    key={item}
                    className="list-[square] pl-2 marker:text-mist-400 dark:marker:text-mist-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
