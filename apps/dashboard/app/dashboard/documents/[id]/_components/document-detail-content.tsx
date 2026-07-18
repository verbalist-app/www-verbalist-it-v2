"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Copy,
  Download,
  MoreHorizontal,
  FileText,
  BarChart3,
  CheckCircle2,
  Loader2,
  RefreshCw,
  ExternalLink,
  Home,
  AlertTriangle,
  Pencil,
  Code,
  Type,
  FileType2,
  FileCode2,
  Save,
  X,
  ChevronDown,
  Check,
  GitCompare,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { PageHeading } from "@/components/ui/page-heading"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { RenameDocumentDialog } from "@/components/dashboard/rename-document-dialog"
import {
  markdownToHtml,
  markdownToPlainText,
  buildHtmlDocument,
  downloadBlob,
} from "@/lib/markdown"
import { useDashboardLocale } from "../../../_lib/dashboard-locale"

// Mock data
const document = {
  id: "1",
  title: "Guida completa al SEO nel 2025: strategie, tecniche e best practice",
  keyword: "seo 2025",
  type: "blog_post",
  status: "completed",
  project: "Blog Aziendale",
  projectId: "1",
  createdAt: "19 Gennaio 2025, 14:32",
  wordCount: 2450,
  readingTime: "10 min",
  content: `
# Guida completa al SEO nel 2025

Il SEO (Search Engine Optimization) continua a evolversi rapidamente. Nel 2025, le strategie che funzionano sono molto diverse da quelle di pochi anni fa. Questa guida ti mostrerà tutto ciò che devi sapere per posizionare il tuo sito ai primi posti di Google.

## Cosa troverai in questa guida

1. Le basi del SEO nel 2025
2. Ottimizzazione on-page avanzata
3. Link building etico ed efficace
4. SEO tecnico: cosa conta davvero
5. AI e SEO: come sfruttare l'intelligenza artificiale

## Le basi del SEO nel 2025

Il SEO si basa su tre pilastri fondamentali: contenuti di qualità, autorevolezza e esperienza utente. Google utilizza centinaia di fattori di ranking, ma questi tre elementi rimangono i più importanti.

### Contenuti di qualità

I contenuti devono essere:
- **Utili**: rispondono a domande reali degli utenti
- **Approfonditi**: coprono l'argomento in modo completo
- **Aggiornati**: informazioni sempre attuali e verificate
- **Originali**: offrono un punto di vista unico

### Autorevolezza (E-E-A-T)

Google valuta l'autorevolezza attraverso:
- Esperienza diretta dell'autore
- Competenze dimostrabili
- Citazioni e backlink da fonti autorevoli
- Segnali di trust (HTTPS, privacy policy, etc.)

## Ottimizzazione on-page

L'ottimizzazione on-page rimane fondamentale. Ecco gli elementi chiave:

### Title tag e meta description

Il title tag deve:
- Contenere la keyword principale
- Essere lungo 50-60 caratteri
- Essere unico per ogni pagina
- Essere accattivante per l'utente

### Struttura degli heading

Usa una gerarchia logica:
- H1: titolo principale (uno per pagina)
- H2: sezioni principali
- H3-H6: sottosezioni

### URL ottimizzati

Gli URL devono essere:
- Brevi e descrittivi
- Contenere la keyword
- Usare i trattini per separare le parole

## Conclusioni

Il SEO nel 2025 richiede un approccio olistico che combina contenuti eccellenti, ottimizzazione tecnica e una solida strategia di link building. Seguendo le best practice descritte in questa guida, potrai migliorare significativamente il posizionamento del tuo sito.
  `.trim(),
}

const analysisData = {
  serpPosition: "Top 10 analizzati",
  competitorCount: 10,
  avgWordCount: 2200,
  topicsIdentified: 12,
  patterns: [
    { name: "FAQ Section", found: 8, total: 10 },
    { name: "Table of Contents", found: 7, total: 10 },
    { name: "Images/Infographics", found: 9, total: 10 },
    { name: "Internal Links", found: 10, total: 10 },
  ],
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  if (parts.length === 1) return text
  return parts.map((part, idx) =>
    idx % 2 === 1 ? <strong key={idx}>{part}</strong> : part
  )
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i++
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(<h3 key={key++}>{formatInline(line.slice(4))}</h3>)
      i++
      continue
    }
    if (line.startsWith("## ")) {
      elements.push(<h2 key={key++}>{formatInline(line.slice(3))}</h2>)
      i++
      continue
    }
    if (line.startsWith("# ")) {
      elements.push(<h1 key={key++}>{formatInline(line.slice(2))}</h1>)
      i++
      continue
    }

    if (line.startsWith("- ")) {
      const items: React.ReactNode[] = []
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(<li key={key++}>{formatInline(lines[i].slice(2))}</li>)
        i++
      }
      elements.push(<ul key={key++}>{items}</ul>)
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(
          <li key={key++}>
            {formatInline(lines[i].replace(/^\d+\.\s/, ""))}
          </li>
        )
        i++
      }
      elements.push(<ol key={key++}>{items}</ol>)
      continue
    }

    elements.push(<p key={key++}>{formatInline(line)}</p>)
    i++
  }

  return elements
}

// Seconda variante generata (mock): stesso tema, taglio e struttura diversi.
const documentContentB = `
# SEO nel 2025: la guida operativa

Le regole del posizionamento cambiano in fretta, ma l'obiettivo resta lo stesso: farsi trovare dalle persone giuste al momento giusto. Qui andiamo dritti al punto, con priorità chiare e azioni concrete.

## Da dove partire

Prima di ottimizzare qualsiasi cosa, rispondi a tre domande: chi cerca, cosa cerca e perché. Senza questa base ogni tecnica SEO diventa un tentativo alla cieca.

## I fattori che contano davvero

- Intento di ricerca: rispondi alla domanda reale dietro la keyword, non alla keyword in sé.
- Qualità percepita: struttura chiara, fonti verificabili, niente riempitivi.
- Esperienza sulla pagina: velocità, leggibilità, nessun ostacolo tra l'utente e la risposta.

## On-page, in pratica

Un buon titolo promette qualcosa di specifico e la pagina mantiene la promessa. Usa sottotitoli che anticipano il contenuto, paragrafi brevi e una sola idea per blocco. Le parole chiave orientano, non saturano il testo.

## Contenuti che chiudono la ricerca

L'utente deve trovare quello che cercava e non tornare indietro. Copri il tema in modo completo, aggiungi esempi concreti e togli tutto ciò che non aiuta a decidere.

## SEO tecnico essenziale

Assicurati che le pagine siano indicizzabili, veloci e leggibili da mobile. Un sito lento o confuso vanifica anche i contenuti migliori.

## Usare l'AI senza rischi

L'intelligenza artificiale accelera la stesura, ma inventa se non le dai contesto. Fornisci dati reali, verifica numeri e citazioni, e aggiungi una revisione prima di pubblicare.
`

function VersionCompare({
  versionA,
  versionB,
  onChoose,
  labels,
}: {
  versionA: string
  versionB: string
  onChoose: (v: "A" | "B") => void
  labels: {
    twoVersionsTitle: string
    twoVersionsDesc: string
    versionA: string
    versionB: string
    useThisVersion: string
  }
}) {
  const versions: { key: "A" | "B"; label: string; text: string }[] = [
    { key: "A", label: labels.versionA, text: versionA },
    { key: "B", label: labels.versionB, text: versionB },
  ]
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
        <GitCompare className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium">{labels.twoVersionsTitle}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{labels.twoVersionsDesc}</p>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {versions.map((v) => (
          <Card key={v.key} className="flex flex-col">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-muted px-2 py-0.5 text-sm font-medium">{v.label}</span>
                <Button size="sm" onClick={() => onChoose(v.key)}>
                  <Check className="mr-2 size-4" />
                  {labels.useThisVersion}
                </Button>
              </div>
              <div className="max-h-[460px] overflow-y-auto rounded-md border border-border/60 p-4">
                <article className="prose prose-neutral prose-sm max-w-none prose-headings:font-medium prose-h1:text-lg prose-h2:text-base prose-h3:text-sm">
                  {renderMarkdown(v.text)}
                </article>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const translations = {
  it: {
    documents: "Documenti",
    processing: "In elaborazione",
    completed: "Completato",
    generating: "Generazione in corso...",
    generatingDesc: "Stiamo analizzando la SERP e generando il contenuto ottimizzato",
    generationFailed: "Generazione non riuscita",
    generationFailedDesc: "Si è verificato un errore durante la generazione del contenuto. I crediti non sono stati addebitati.",
    twoVersionsTitle: "Abbiamo generato due versioni",
    twoVersionsDesc: "Confronta e scegli quella che preferisci. Dopo potrai modificarla ed esportarla.",
    versionA: "Versione A",
    versionB: "Versione B",
    useThisVersion: "Usa questa versione",
    versionChosen: "Versione scelta",
    retry: "Riprova",
    copied: "Copiato!",
    copy: "Copia",
    copyPlainText: "Copia testo pulito",
    copyHtml: "Copia HTML",
    copyMarkdown: "Copia Markdown",
    copyMenuLabel: "Opzioni copia",
    export: "Esporta",
    exportMd: "Scarica .md",
    exportHtml: "Scarica .html",
    exportTxt: "Scarica .txt",
    exportMenuLabel: "Opzioni esportazione",
    edit: "Modifica",
    save: "Salva",
    discard: "Annulla",
    editing: "Modalità modifica",
    contentSaved: "Contenuto aggiornato",
    plainCopied: "Testo pulito copiato",
    htmlCopied: "HTML copiato",
    markdownCopied: "Markdown copiato",
    regenerate: "Rigenera",
    rename: "Rinomina",
    renameTooltip: "Doppio clic per rinominare",
    openInEditor: "Apri in editor",
    publishedTitleLabel: "Titolo pubblicabile",
    publishedTitleHint: "È il titolo H1 del contenuto: appare online quando pubblichi.",
    systemNameLabel: "Nome file",
    systemNameHint: "Identifica il documento all'interno di Verbalist. Usalo per ritrovarlo in elenco e nelle cartelle.",
    renameSystemName: "Rinomina file",
    renamePublishedTitle: "Modifica titolo pubblicabile",
    safeNavigationTitle: "La generazione continua in background",
    safeNavigationDesc: "Puoi navigare in altre sezioni di Verbalist senza perdere il documento. Ti avviseremo quando sarà pronto.",
    docGenerated: "Documento generato con successo",
    docGeneratedDesc: "Puoi copiare il contenuto, esportarlo o modificarlo nell'editor",
    docReadyTitle: (name: string) => `"${name}" è pronto`,
    docReadyDesc: "Apri il documento per controllarlo e pubblicarlo.",
    docReadyAction: "Apri ora",
    notifyReady: "Notifica documento pronto",
    content: "Contenuto",
    serpAnalysis: "Analisi SERP",
    competitorsAnalyzed: "Competitor analizzati",
    avgWordCount: "Word count medio",
    topicsIdentified: "Topic identificati",
    yourWordCount: "Il tuo word count",
    detectedPatterns: "Pattern rilevati",
    competitor: "competitor",
    words: "parole",
    readingTime: "di lettura",
    deleteTitle: "Eliminare questo documento?",
    deleteDesc: "\"{title}\" verrà eliminato permanentemente. Questa azione non può essere annullata.",
    cancel: "Annulla",
    delete: "Elimina",
    moreOptions: "Altre opzioni",
    contentCopied: "Contenuto copiato negli appunti",
  },
  en: {
    documents: "Documents",
    processing: "Processing",
    completed: "Completed",
    generating: "Generating...",
    generatingDesc: "We're analyzing the SERP and generating optimized content",
    generationFailed: "Generation failed",
    generationFailedDesc: "An error occurred during content generation. Credits were not charged.",
    twoVersionsTitle: "We generated two versions",
    twoVersionsDesc: "Compare them and pick the one you prefer. You can edit and export it afterwards.",
    versionA: "Version A",
    versionB: "Version B",
    useThisVersion: "Use this version",
    versionChosen: "Version selected",
    retry: "Retry",
    copied: "Copied!",
    copy: "Copy",
    copyPlainText: "Copy plain text",
    copyHtml: "Copy HTML",
    copyMarkdown: "Copy Markdown",
    copyMenuLabel: "Copy options",
    export: "Export",
    exportMd: "Download .md",
    exportHtml: "Download .html",
    exportTxt: "Download .txt",
    exportMenuLabel: "Export options",
    edit: "Edit",
    save: "Save",
    discard: "Discard",
    editing: "Edit mode",
    contentSaved: "Content updated",
    plainCopied: "Plain text copied",
    htmlCopied: "HTML copied",
    markdownCopied: "Markdown copied",
    regenerate: "Regenerate",
    rename: "Rename",
    renameTooltip: "Double-click to rename",
    openInEditor: "Open in editor",
    publishedTitleLabel: "Published title",
    publishedTitleHint: "This is the H1 of the content — what readers see online.",
    systemNameLabel: "File name",
    systemNameHint: "Identifies the document inside Verbalist. Use it to find it in the list and folders.",
    renameSystemName: "Rename file",
    renamePublishedTitle: "Edit published title",
    safeNavigationTitle: "Generation continues in the background",
    safeNavigationDesc: "You can move to other sections of Verbalist without losing this document. We'll let you know when it's ready.",
    docGenerated: "Document generated successfully",
    docGeneratedDesc: "You can copy, export, or edit in the editor",
    docReadyTitle: (name: string) => `"${name}" is ready`,
    docReadyDesc: "Open the document to review and publish.",
    docReadyAction: "Open now",
    notifyReady: "Document ready notification",
    content: "Content",
    serpAnalysis: "SERP Analysis",
    competitorsAnalyzed: "Competitors analyzed",
    avgWordCount: "Average word count",
    topicsIdentified: "Topics identified",
    yourWordCount: "Your word count",
    detectedPatterns: "Detected patterns",
    competitor: "competitor",
    words: "words",
    readingTime: "reading time",
    deleteTitle: "Delete this document?",
    deleteDesc: "\"{title}\" will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    moreOptions: "More options",
    contentCopied: "Content copied to clipboard",
  },
}

function DocumentDetailInner({
  params,
}: {
  params: { id: string }
}) {
  const { t } = useDashboardLocale()
  const labels = t(translations)
  const searchParams = useSearchParams()
  const isNew = searchParams.get("new") === "true"
  const [isProcessing, setIsProcessing] = React.useState(isNew)
  const [copied, setCopied] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showSuccess, setShowSuccess] = React.useState(false)
  const [showRenameDialog, setShowRenameDialog] = React.useState(false)
  const [systemName, setSystemName] = React.useState<string>(document.title)
  const [title, setTitle] = React.useState(document.title)
  const [content, setContent] = React.useState(document.content)

  React.useEffect(() => {
    if (!isNew) return
    if (typeof window === "undefined") return
    const provisional = window.sessionStorage.getItem("verbalist:last-generated-title")
    if (provisional) {
      setSystemName(provisional)
      setTitle(provisional)
    }
  }, [isNew])

  // Once generation completes, suggest replacing the provisional title with the AI-generated one
  React.useEffect(() => {
    if (!isNew) return
    if (isProcessing) return
    setTitle(document.title)
  }, [isNew, isProcessing])
  const [isEditing, setIsEditing] = React.useState(false)
  const [editBuffer, setEditBuffer] = React.useState(document.content)
  // A/B: due versioni generate; finché non se ne sceglie una si mostra il confronto.
  const versionA = document.content
  const versionB = documentContentB
  const [chosen, setChosen] = React.useState<"A" | "B" | null>(isNew ? null : "A")
  const handleChooseVersion = (v: "A" | "B") => {
    const picked = v === "A" ? versionA : versionB
    setChosen(v)
    setContent(picked)
    setEditBuffer(picked)
    toast.success(labels.versionChosen)
  }

  const startEditing = () => {
    setEditBuffer(content)
    setIsEditing(true)
  }

  const cancelEditing = () => {
    setIsEditing(false)
    setEditBuffer(content)
  }

  const saveEditing = () => {
    setContent(editBuffer)
    setIsEditing(false)
    toast.success(labels.contentSaved)
  }

  const flashCopied = (message: string) => {
    setCopied(true)
    toast.success(message)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleCopyPlain = async () => {
    await navigator.clipboard.writeText(markdownToPlainText(content))
    flashCopied(labels.plainCopied)
  }

  const handleCopyHtml = async () => {
    const html = markdownToHtml(content)
    if (typeof window !== "undefined" && window.ClipboardItem) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([markdownToPlainText(content)], { type: "text/plain" }),
          }),
        ])
        flashCopied(labels.htmlCopied)
        return
      } catch {
        // fallback below
      }
    }
    await navigator.clipboard.writeText(html)
    flashCopied(labels.htmlCopied)
  }

  const handleCopyMarkdown = async () => {
    await navigator.clipboard.writeText(content)
    flashCopied(labels.markdownCopied)
  }

  const slugFor = (input: string) =>
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "document"

  const handleExportMd = () => {
    downloadBlob(`${slugFor(title)}.md`, content, "text/markdown;charset=utf-8")
  }

  const handleExportHtml = () => {
    const body = markdownToHtml(content)
    const html = buildHtmlDocument(title, body)
    downloadBlob(`${slugFor(title)}.html`, html, "text/html;charset=utf-8")
  }

  const handleExportTxt = () => {
    downloadBlob(`${slugFor(title)}.txt`, markdownToPlainText(content), "text/plain;charset=utf-8")
  }

  // Simulate processing completion
  React.useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsProcessing(false), 6000)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  React.useEffect(() => {
    if (isNew && !isProcessing) {
      setShowSuccess(true)
      toast.success(labels.docReadyTitle(title), {
        description: labels.docReadyDesc,
        duration: 10000,
      })
      const timer = setTimeout(() => setShowSuccess(false), 8000)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, isProcessing])


  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">
                <Home className="size-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard/documents">{labels.documents}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage title={systemName}>
              {systemName.length > 40
                ? systemName.substring(0, systemName.lastIndexOf(" ", 40)) + "..."
                : systemName}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                  isProcessing
                    ? "bg-status-warning/10 text-status-warning"
                    : "bg-status-success/10 text-status-success"
                )}
              >
                {isProcessing ? labels.processing : labels.completed}
              </span>
              <span className="text-sm text-muted-foreground">
                {document.createdAt}
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mb-1">
              {labels.publishedTitleLabel}
            </p>
            <PageHeading title={labels.publishedTitleHint}>
              {title}
            </PageHeading>
            <p
              className="mt-2 text-xs text-muted-foreground inline-flex items-center gap-1.5 cursor-pointer hover:text-foreground transition-colors"
              onDoubleClick={() => setShowRenameDialog(true)}
              title={labels.systemNameHint}
            >
              <FileText className="size-3.5" />
              <span>
                {labels.systemNameLabel}: <span className="font-medium">{systemName}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowRenameDialog(true)}
                className="ml-1 inline-flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-muted hover:text-foreground"
                aria-label={labels.renameSystemName}
              >
                <Pencil className="size-3" />
              </button>
            </p>
            <div className="flex items-center gap-3 mt-3 text-sm text-muted-foreground">
              <Link
                href={`/dashboard/projects/${document.projectId}`}
                className="hover:text-foreground"
              >
                {document.project}
              </Link>
              <span>·</span>
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                {document.keyword}
              </code>
              {!isProcessing && (
                <>
                  <span>·</span>
                  <span>{document.wordCount.toLocaleString()} {labels.words}</span>
                  <span>·</span>
                  <span>{document.readingTime} {labels.readingTime}</span>
                </>
              )}
            </div>
          </div>
          {chosen !== null && (
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" size="sm" onClick={cancelEditing}>
                  <X className="mr-2 size-4" />
                  {labels.discard}
                </Button>
                <Button size="sm" onClick={saveEditing}>
                  <Save className="mr-2 size-4" />
                  {labels.save}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={startEditing}>
                  <Pencil className="mr-2 size-4" />
                  {labels.edit}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" aria-label={labels.copyMenuLabel}>
                      {copied ? (
                        <CheckCircle2 className="mr-2 size-4" />
                      ) : (
                        <Copy className="mr-2 size-4" />
                      )}
                      {copied ? labels.copied : labels.copy}
                      <ChevronDown className="ml-1 size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleCopyPlain}>
                      <Type className="mr-2 size-4" />
                      {labels.copyPlainText}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyHtml}>
                      <Code className="mr-2 size-4" />
                      {labels.copyHtml}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyMarkdown}>
                      <FileCode2 className="mr-2 size-4" />
                      {labels.copyMarkdown}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" aria-label={labels.exportMenuLabel}>
                      <Download className="mr-2 size-4" />
                      {labels.export}
                      <ChevronDown className="ml-1 size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleExportMd}>
                      <FileCode2 className="mr-2 size-4" />
                      {labels.exportMd}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportHtml}>
                      <Code className="mr-2 size-4" />
                      {labels.exportHtml}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleExportTxt}>
                      <FileType2 className="mr-2 size-4" />
                      {labels.exportTxt}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="size-9" aria-label={labels.moreOptions}>
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setShowRenameDialog(true)}>
                      <Pencil className="mr-2 size-4" />
                      {labels.rename}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 size-4" />
                      {labels.regenerate}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 size-4" />
                      {labels.openInEditor}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
                      {labels.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
          )}
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Loader2 className="size-5 text-muted-foreground animate-spin motion-reduce:animate-none shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium">{labels.generating}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {labels.generatingDesc}
                  </p>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full w-2/5 rounded-full bg-foreground motion-reduce:animate-none"
                      style={{ animation: "progress-indeterminate 1.5s ease-in-out infinite" }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/40 border-dashed">
            <CardContent className="p-4">
              <div className="flex items-start gap-3 text-sm">
                <ExternalLink className="size-4 mt-0.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="font-medium">{labels.safeNavigationTitle}</p>
                  <p className="text-muted-foreground mt-0.5">
                    {labels.safeNavigationDesc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Failed State */}
      {!isProcessing && document.status === "failed" && (
        <Card className="border-destructive/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="size-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{labels.generationFailed}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {labels.generationFailedDesc}
                </p>
                <Button className="mt-4" size="sm">
                  <RefreshCw className="mr-2 size-4" />
                  {labels.retry}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success banner — promoted to top-level for visibility */}
      {showSuccess && !isProcessing && (
        <Card className="bg-status-success/5 border-status-success/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-status-success shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{labels.docReadyTitle(title)}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {labels.docReadyDesc}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7"
                onClick={() => setShowSuccess(false)}
                aria-label={labels.discard}
              >
                <X className="size-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      {!isProcessing && document.status !== "failed" && (
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList>
            <TabsTrigger value="content">
              <FileText className="mr-2 size-4" />
              {labels.content}
            </TabsTrigger>
            <TabsTrigger value="analysis">
              <BarChart3 className="mr-2 size-4" />
              {labels.serpAnalysis}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {chosen === null ? (
              <VersionCompare
                versionA={versionA}
                versionB={versionB}
                onChoose={handleChooseVersion}
                labels={labels}
              />
            ) : (
            <Card>
              <CardContent className="p-6 lg:p-8">
                {isEditing ? (
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {labels.editing}
                    </p>
                    <Textarea
                      value={editBuffer}
                      onChange={(e) => setEditBuffer(e.target.value)}
                      rows={24}
                      className="font-mono text-sm leading-6"
                    />
                  </div>
                ) : (
                  <article className="prose prose-neutral max-w-none prose-headings:font-medium prose-h1:text-xl prose-h1:lg:text-2xl prose-h2:text-lg prose-h2:lg:text-xl prose-h3:text-base prose-h3:lg:text-lg">
                    {renderMarkdown(content)}
                  </article>
                )}
              </CardContent>
            </Card>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.competitorsAnalyzed}</p>
                  <p className="text-2xl tracking-tight tabular-nums mt-1">{analysisData.competitorCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.avgWordCount}</p>
                  <p className="text-2xl tracking-tight tabular-nums mt-1">{analysisData.avgWordCount.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.topicsIdentified}</p>
                  <p className="text-2xl tracking-tight tabular-nums mt-1">{analysisData.topicsIdentified}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.yourWordCount}</p>
                  <p className="text-2xl tracking-tight tabular-nums mt-1">{document.wordCount.toLocaleString()}</p>
                </CardContent>
              </Card>
            </div>

            {/* Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{labels.detectedPatterns}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysisData.patterns.map((pattern) => (
                  <div key={pattern.name}>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>{pattern.name}</span>
                      <span className="text-muted-foreground">
                        {pattern.found}/{pattern.total} {labels.competitor}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground transition-all"
                        style={{ width: `${(pattern.found / pattern.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <RenameDocumentDialog
        open={showRenameDialog}
        onOpenChange={setShowRenameDialog}
        currentName={systemName}
        onRename={(newName) => setSystemName(newName)}
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{labels.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {labels.deleteDesc.replace("{title}", systemName)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {labels.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

function DocumentDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Header skeleton */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>

      {/* Content skeleton */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-1/3 mt-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    </div>
  )
}

export function DocumentDetailContent({
  params,
}: {
  params: { id: string }
}) {
  return (
    <Suspense fallback={<DocumentDetailSkeleton />}>
      <DocumentDetailInner params={params} />
    </Suspense>
  )
}
