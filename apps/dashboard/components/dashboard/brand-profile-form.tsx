"use client"

import * as React from "react"
import { Save, Sparkles, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { ChipInput } from "@/components/dashboard/chip-input"
import { cn } from "@/lib/utils"
import {
  TONE_PRESETS,
  emptyBrandProfile,
  getBrandProfile,
  saveBrandProfile,
  type BrandProfile,
  type TonePreset,
} from "@/lib/brand-profile"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const text = {
  it: {
    title: "Profilo brand",
    intro:
      "Entra nel prompt di ogni generazione e ottimizzazione di questo progetto, senza doverlo reinserire nei singoli documenti. Non addestra il modello.",
    active: (date: string) => `Attivo · salvato il ${date}`,
    draft: "Bozza non salvata",
    emptyTitle: "Questo progetto non ha ancora un profilo brand",
    emptyDesc:
      "Senza profilo i testi sono più generici e il tono cambia da un documento all'altro. Compilalo una volta: vale per tutti i contenuti del progetto.",
    emptyCta: "Compila il profilo",
    company: "Azienda",
    companyDesc: "Chi siete e cosa fate, come lo direste a un nuovo fornitore.",
    companyName: "Nome",
    companyNamePlaceholder: "es. Bonfiglioli Riduttori S.p.A.",
    description: "Descrizione",
    descriptionPlaceholder: "Cosa fa l'azienda, per chi, con quale presenza sul mercato.",
    values: "Valori",
    valuesPlaceholder: "es. Affidabilità, continuità operativa, innovazione tecnica",
    tone: "Tono di voce",
    toneDesc: "Un tono di base e, se serve, come lo declinate.",
    tonePreset: "Tono di base",
    tonePresetPlaceholder: "Scegli un tono",
    toneNotes: "Come parlate",
    toneNotesPlaceholder: "es. Tecnico e diretto. Frasi brevi, dati concreti, nessuna enfasi commerciale.",
    rules: "Regole di stile",
    rulesDesc: "Una regola per riga. Verbalist le segue in ogni testo del progetto.",
    rulesDo: "Da seguire",
    rulesDoPlaceholder: "es. Nomina sempre la serie del prodotto",
    rulesDont: "Da evitare",
    rulesDontPlaceholder: "es. Niente superlativi senza un dato a supporto",
    lexicon: "Lessico",
    lexiconDesc: "Termini tecnici da usare nel modo giusto e parole che non devono comparire.",
    glossary: "Glossario",
    glossaryPlaceholder: "es. Serie 300M: riduttori epicicloidali per carichi di picco",
    glossaryHint: "Termine e uso corretto separati dai due punti. Invio per aggiungere.",
    forbidden: "Parole e claim vietati",
    forbiddenPlaceholder: "es. leader mondiale",
    forbiddenHint: "Invio per aggiungere. Verbalist non le userà mai, nemmeno nelle FAQ.",
    links: "Link e call to action",
    linksDesc: "Le pagine da linkare nei testi e l'invito all'azione preferito.",
    cta: "Call to action preferita",
    ctaPlaceholder: "es. Contatta un esperto",
    internalLinks: "Pagine per i link interni",
    internalLinksPlaceholder: "https://…",
    internalLinksHint: "Un URL per volta. Invio per aggiungere.",
    remove: "Rimuovi",
    footerHint: "Le modifiche valgono per i nuovi contenuti. I documenti già generati non cambiano.",
    cancel: "Annulla",
    save: "Salva profilo",
    saved: "Profilo brand salvato",
    savedDesc: "Vale per tutti i nuovi contenuti del progetto.",
    presets: {
      professional: "Professionale",
      technical: "Tecnico",
      informal: "Informale",
      institutional: "Istituzionale",
      commercial: "Commerciale",
    } as Record<TonePreset, string>,
  },
  en: {
    title: "Brand profile",
    intro:
      "Goes into the prompt of every generation and optimization in this project, so you never re-enter it per document. It does not train the model.",
    active: (date: string) => `Active · saved on ${date}`,
    draft: "Unsaved draft",
    emptyTitle: "This project has no brand profile yet",
    emptyDesc:
      "Without a profile, texts are more generic and the tone changes from one document to the next. Fill it in once: it applies to every content in the project.",
    emptyCta: "Fill in the profile",
    company: "Company",
    companyDesc: "Who you are and what you do, as you would tell a new supplier.",
    companyName: "Name",
    companyNamePlaceholder: "e.g. Bonfiglioli Riduttori S.p.A.",
    description: "Description",
    descriptionPlaceholder: "What the company does, for whom, with what market presence.",
    values: "Values",
    valuesPlaceholder: "e.g. Reliability, operational continuity, technical innovation",
    tone: "Tone of voice",
    toneDesc: "A base tone and, if needed, how you adapt it.",
    tonePreset: "Base tone",
    tonePresetPlaceholder: "Pick a tone",
    toneNotes: "How you speak",
    toneNotesPlaceholder: "e.g. Technical and direct. Short sentences, concrete data, no sales emphasis.",
    rules: "Style rules",
    rulesDesc: "One rule per line. Verbalist follows them in every text of the project.",
    rulesDo: "Do",
    rulesDoPlaceholder: "e.g. Always name the product series",
    rulesDont: "Don't",
    rulesDontPlaceholder: "e.g. No superlatives without supporting data",
    lexicon: "Lexicon",
    lexiconDesc: "Technical terms to use correctly and words that must never appear.",
    glossary: "Glossary",
    glossaryPlaceholder: "e.g. 300M Series: planetary gearboxes for peak loads",
    glossaryHint: "Term and correct usage separated by a colon. Enter to add.",
    forbidden: "Forbidden words and claims",
    forbiddenPlaceholder: "e.g. world leader",
    forbiddenHint: "Enter to add. Verbalist will never use them, not even in FAQs.",
    links: "Links and call to action",
    linksDesc: "Pages to link inside the texts and the preferred call to action.",
    cta: "Preferred call to action",
    ctaPlaceholder: "e.g. Talk to an expert",
    internalLinks: "Pages for internal links",
    internalLinksPlaceholder: "https://…",
    internalLinksHint: "One URL at a time. Enter to add.",
    remove: "Remove",
    footerHint: "Changes apply to new content. Documents already generated do not change.",
    cancel: "Cancel",
    save: "Save profile",
    saved: "Brand profile saved",
    savedDesc: "It applies to all new content in the project.",
    presets: {
      professional: "Professional",
      technical: "Technical",
      informal: "Informal",
      institutional: "Institutional",
      commercial: "Commercial",
    } as Record<TonePreset, string>,
  },
}

function stripDate(profile: BrandProfile): Omit<BrandProfile, "updatedAt"> {
  const { updatedAt: _ignored, ...rest } = profile
  return rest
}

export function BrandProfileForm({
  projectId,
  onSaved,
}: {
  projectId: string
  onSaved?: (profile: BrandProfile) => void
}) {
  const { t, locale } = useDashboardLocale()
  const labels = t(text)
  const [saved, setSaved] = React.useState<BrandProfile | null>(null)
  const [draft, setDraft] = React.useState<BrandProfile>(emptyBrandProfile)
  const [editing, setEditing] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)

  // Letto dopo il mount: i profili modificati in sessione stanno in sessionStorage.
  React.useEffect(() => {
    const profile = getBrandProfile(projectId)
    setSaved(profile)
    setDraft(profile ?? emptyBrandProfile)
    setEditing(Boolean(profile))
    setLoaded(true)
  }, [projectId])

  const dirty =
    JSON.stringify(stripDate(draft)) !== JSON.stringify(stripDate(saved ?? emptyBrandProfile))

  const update = <K extends keyof BrandProfile>(key: K, value: BrandProfile[K]) =>
    setDraft((d) => ({ ...d, [key]: value }))

  const handleSave = () => {
    const next = saveBrandProfile(projectId, draft)
    setSaved(next)
    setDraft(next)
    toast.success(labels.saved, { description: labels.savedDesc })
    onSaved?.(next)
  }

  const handleCancel = () => {
    if (saved) {
      setDraft(saved)
      return
    }
    setDraft(emptyBrandProfile)
    setEditing(false)
  }

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso))

  if (!loaded) return null

  if (!editing) {
    return (
      <Empty className="border bg-muted/30">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Sparkles />
          </EmptyMedia>
          <EmptyTitle>{labels.emptyTitle}</EmptyTitle>
          <EmptyDescription>{labels.emptyDesc}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="accent" onClick={() => setEditing(true)}>
            {labels.emptyCta}
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-prose">
          <h2 className="text-base font-medium">{labels.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{labels.intro}</p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
            saved?.updatedAt
              ? "bg-status-success/10 text-status-success"
              : "bg-muted text-muted-foreground",
          )}
        >
          {saved?.updatedAt ? labels.active(formatDate(saved.updatedAt)) : labels.draft}
        </span>
      </div>

      <Card>
        <CardContent className="divide-y divide-border p-0">
          {/* Azienda */}
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-sm font-medium">{labels.company}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.companyDesc}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bp-name">{labels.companyName}</Label>
                <Input
                  id="bp-name"
                  value={draft.companyName}
                  placeholder={labels.companyNamePlaceholder}
                  onChange={(e) => update("companyName", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bp-values">{labels.values}</Label>
                <Input
                  id="bp-values"
                  value={draft.values}
                  placeholder={labels.valuesPlaceholder}
                  onChange={(e) => update("values", e.target.value)}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="bp-desc">{labels.description}</Label>
                <Textarea
                  id="bp-desc"
                  rows={3}
                  value={draft.description}
                  placeholder={labels.descriptionPlaceholder}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Tono */}
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-sm font-medium">{labels.tone}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.toneDesc}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
              <div className="space-y-1.5">
                <Label htmlFor="bp-tone">{labels.tonePreset}</Label>
                <Select
                  value={draft.tonePreset}
                  onValueChange={(value) => update("tonePreset", value as TonePreset)}
                >
                  <SelectTrigger id="bp-tone">
                    <SelectValue placeholder={labels.tonePresetPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_PRESETS.map((preset) => (
                      <SelectItem key={preset} value={preset}>
                        {labels.presets[preset]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bp-tone-notes">{labels.toneNotes}</Label>
                <Textarea
                  id="bp-tone-notes"
                  rows={3}
                  value={draft.toneNotes}
                  placeholder={labels.toneNotesPlaceholder}
                  onChange={(e) => update("toneNotes", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Regole */}
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-sm font-medium">{labels.rules}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.rulesDesc}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bp-do">{labels.rulesDo}</Label>
                <Textarea
                  id="bp-do"
                  rows={4}
                  value={draft.rulesDo}
                  placeholder={labels.rulesDoPlaceholder}
                  onChange={(e) => update("rulesDo", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bp-dont">{labels.rulesDont}</Label>
                <Textarea
                  id="bp-dont"
                  rows={4}
                  value={draft.rulesDont}
                  placeholder={labels.rulesDontPlaceholder}
                  onChange={(e) => update("rulesDont", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Lessico */}
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-sm font-medium">{labels.lexicon}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.lexiconDesc}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bp-glossary">{labels.glossary}</Label>
                <ChipInput
                  id="bp-glossary"
                  value={draft.glossary}
                  onChange={(next) => update("glossary", next)}
                  placeholder={labels.glossaryPlaceholder}
                  hint={labels.glossaryHint}
                  removeLabel={labels.remove}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bp-forbidden">{labels.forbidden}</Label>
                <ChipInput
                  id="bp-forbidden"
                  value={draft.forbidden}
                  onChange={(next) => update("forbidden", next)}
                  placeholder={labels.forbiddenPlaceholder}
                  hint={labels.forbiddenHint}
                  removeLabel={labels.remove}
                />
              </div>
            </div>
          </section>

          {/* Link e CTA */}
          <section className="space-y-4 p-6">
            <div>
              <h3 className="text-sm font-medium">{labels.links}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{labels.linksDesc}</p>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bp-cta">{labels.cta}</Label>
                <Input
                  id="bp-cta"
                  value={draft.preferredCta}
                  placeholder={labels.ctaPlaceholder}
                  onChange={(e) => update("preferredCta", e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bp-links">{labels.internalLinks}</Label>
                <ChipInput
                  id="bp-links"
                  value={draft.internalLinks}
                  onChange={(next) => update("internalLinks", next)}
                  placeholder={labels.internalLinksPlaceholder}
                  hint={labels.internalLinksHint}
                  removeLabel={labels.remove}
                />
              </div>
            </div>
          </section>

          {/* Azioni */}
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">{labels.footerHint}</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCancel} disabled={!dirty && Boolean(saved)}>
                <X className="mr-2 size-4" />
                {labels.cancel}
              </Button>
              <Button variant="accent" onClick={handleSave} disabled={!dirty}>
                <Save className="mr-2 size-4" />
                {labels.save}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
