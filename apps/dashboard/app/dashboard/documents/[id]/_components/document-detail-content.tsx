"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  IconCopy as Copy,
  IconDownload as Download,
  IconDots as MoreHorizontal,
  IconFileText as FileText,
  IconChartBar as BarChart3,
  IconCircleCheck as CheckCircle2,
  IconLoader2 as Loader2,
  IconRefresh as RefreshCw,
  IconExternalLink as ExternalLink,
  IconHome as Home,
  IconAlertTriangle as AlertTriangle
} from '@tabler/icons-react';
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

const translations = {
  it: {
    documents: "Documenti",
    processing: "In elaborazione",
    completed: "Completato",
    generating: "Generazione in corso...",
    generatingDesc: "Stiamo analizzando la SERP e generando il contenuto ottimizzato",
    generationFailed: "Generazione non riuscita",
    generationFailedDesc: "Si è verificato un errore durante la generazione del contenuto. I crediti non sono stati addebitati.",
    retry: "Riprova",
    copied: "Copiato!",
    copy: "Copia",
    export: "Esporta",
    regenerate: "Rigenera",
    openInEditor: "Apri in editor",
    docGenerated: "Documento generato con successo",
    docGeneratedDesc: "Puoi copiare il contenuto, esportarlo o modificarlo nell'editor",
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
    retry: "Retry",
    copied: "Copied!",
    copy: "Copy",
    export: "Export",
    regenerate: "Regenerate",
    openInEditor: "Open in editor",
    docGenerated: "Document generated successfully",
    docGeneratedDesc: "You can copy, export, or edit in the editor",
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

  // Simulate processing completion
  React.useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setIsProcessing(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isNew])

  React.useEffect(() => {
    if (isNew && !isProcessing) {
      setShowSuccess(true)
      const timer = setTimeout(() => setShowSuccess(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [isNew, isProcessing])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(document.content)
    setCopied(true)
    toast.success(labels.contentCopied)
    setTimeout(() => setCopied(false), 3000)
  }

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
            <BreadcrumbPage title={document.title}>
              {document.title.length > 30
                ? document.title.substring(0, document.title.lastIndexOf(" ", 30)) + "..."
                : document.title}
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
            <h1 className="text-xl font-display tracking-tight lg:text-2xl">
              {document.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <CheckCircle2 className="mr-2 size-4" />
              ) : (
                <Copy className="mr-2 size-4" />
              )}
              {copied ? labels.copied : labels.copy}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              {labels.export}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-9" aria-label={labels.moreOptions}>
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
          </div>
        </div>
      </div>

      {/* Processing State */}
      {isProcessing && (
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

      {/* Content */}
      {!isProcessing && document.status !== "failed" && (
        <Tabs defaultValue="content" className="space-y-6">
          {showSuccess && (
            <Card className="bg-status-success/5 border-status-success/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-status-success shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{labels.docGenerated}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {labels.docGeneratedDesc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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
            <Card>
              <CardContent className="p-6 lg:p-8">
                <article className="prose prose-neutral max-w-none prose-headings:font-medium prose-h1:text-xl prose-h1:lg:text-2xl prose-h2:text-lg prose-h2:lg:text-xl prose-h3:text-base prose-h3:lg:text-lg">
                  {renderMarkdown(document.content)}
                </article>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.competitorsAnalyzed}</p>
                  <p className="text-2xl font-display tracking-tight tabular-nums mt-1">{analysisData.competitorCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.avgWordCount}</p>
                  <p className="text-2xl font-display tracking-tight tabular-nums mt-1">{analysisData.avgWordCount.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.topicsIdentified}</p>
                  <p className="text-2xl font-display tracking-tight tabular-nums mt-1">{analysisData.topicsIdentified}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">{labels.yourWordCount}</p>
                  <p className="text-2xl font-display tracking-tight tabular-nums mt-1">{document.wordCount.toLocaleString()}</p>
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{labels.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {labels.deleteDesc.replace("{title}", document.title)}
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
