"use client"

import * as React from "react"
import { Suspense } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  MoreHorizontal,
  FileText,
  Search,
  Filter,
  Pencil,
  FolderInput,
  Layers,
  Paperclip,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { getStatusConfig, type Status } from "@/lib/status"
import { mockProjects, BONFIGLIOLI_PROJECT_ID } from "@/lib/projects"
import { mockBatches, getBatchCounts, deriveBatchStatus } from "@/lib/batches"
import { getBrandProfile, isBrandProfileFilled, mockMaterials } from "@/lib/brand-profile"
import { BatchStatusPill } from "@/components/dashboard/batch-status-pill"
import { BrandProfileForm } from "@/components/dashboard/brand-profile-form"
import { ProjectMaterials } from "@/components/dashboard/project-materials"
import { RenameDocumentDialog } from "@/components/dashboard/rename-document-dialog"
import { MoveDocumentDialog } from "@/components/dashboard/move-document-dialog"
import { useDashboardLocale } from "../../../_lib/dashboard-locale"

const translations = {
  it: {
    projects: "Progetti",
    newDocument: "Nuovo documento",
    tabs: { documents: "Documenti", brand: "Profilo brand", materials: "Materiali" },
    profileActive: "Profilo brand attivo",
    profileMissing: "Profilo brand da compilare",
    materialsCount: (n: number) => (n === 1 ? "1 materiale" : `${n} materiali`),
    batches: "Lotti",
    batchesDesc: "Elaborazioni multiple avviate da un file.",
    batchMeta: (file: string, date: string, n: number) => `${file} · ${date} · ${n} contenuti`,
    batchProgress: (done: number, total: number) => `${done} di ${total} completati`,
    batchCounts: { processing: "in corso", queued: "in coda", failed: "errore" },
    openBatch: "Apri lotto",
    batchChip: (name: string) => `Lotto · ${name}`,
    documentsTitle: "Documenti",
    searchPlaceholder: "Cerca documenti...",
    searchAriaLabel: "Cerca documenti",
    filters: "Filtri",
    open: "Apri",
    rename: "Rinomina",
    move: "Sposta in progetto",
    duplicate: "Duplica",
    export: "Esporta",
    delete: "Elimina",
    deleteTitle: "Eliminare questo documento?",
    deleteDesc: "Il documento verrà eliminato permanentemente. Questa azione non può essere annullata.",
    cancel: "Annulla",
    documentDeleted: "Documento eliminato",
    moreOptions: "Altre opzioni",
    words: "parole",
    typeLabels: {
      blog_post: "Blog Post",
      product_page: "Pagina Prodotto",
      guide: "Guida",
      landing_page: "Landing Page",
    } as Record<string, string>,
  },
  en: {
    projects: "Projects",
    newDocument: "New document",
    tabs: { documents: "Documents", brand: "Brand profile", materials: "Materials" },
    profileActive: "Brand profile active",
    profileMissing: "Brand profile to fill in",
    materialsCount: (n: number) => (n === 1 ? "1 material" : `${n} materials`),
    batches: "Batches",
    batchesDesc: "Multiple contents processed from one file.",
    batchMeta: (file: string, date: string, n: number) => `${file} · ${date} · ${n} items`,
    batchProgress: (done: number, total: number) => `${done} of ${total} completed`,
    batchCounts: { processing: "in progress", queued: "queued", failed: "failed" },
    openBatch: "Open batch",
    batchChip: (name: string) => `Batch · ${name}`,
    documentsTitle: "Documents",
    searchPlaceholder: "Search documents...",
    searchAriaLabel: "Search documents",
    filters: "Filters",
    open: "Open",
    rename: "Rename",
    move: "Move to project",
    duplicate: "Duplicate",
    export: "Export",
    delete: "Delete",
    deleteTitle: "Delete this document?",
    deleteDesc: "The document will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    documentDeleted: "Document deleted",
    moreOptions: "More options",
    words: "words",
    typeLabels: {
      blog_post: "Blog Post",
      product_page: "Product Page",
      guide: "Guide",
      landing_page: "Landing Page",
    } as Record<string, string>,
  },
}

type ProjectDocument = {
  id: string
  title: { it: string; en: string }
  keyword: string
  type: string
  status: Status
  wordCount: number | null
  createdAt: { it: string; en: string }
  batchId?: string
  batchName?: string
}

// Mock: documenti del progetto generico (Blog Aziendale)
const blogDocuments: ProjectDocument[] = [
  {
    id: "1",
    title: { it: "Guida completa al SEO nel 2025", en: "Complete guide to SEO in 2025" },
    keyword: "seo 2025",
    type: "blog_post",
    status: "completed",
    wordCount: 2450,
    createdAt: { it: "19 Gen 2025", en: "Jan 19, 2025" },
  },
  {
    id: "2",
    title: { it: "Come scegliere il miglior CRM per la tua azienda", en: "How to choose the best CRM for your business" },
    keyword: "miglior crm",
    type: "blog_post",
    status: "completed",
    wordCount: 1890,
    createdAt: { it: "18 Gen 2025", en: "Jan 18, 2025" },
  },
  {
    id: "3",
    title: { it: "10 strategie di marketing B2B che funzionano", en: "10 B2B marketing strategies that work" },
    keyword: "marketing b2b strategie",
    type: "blog_post",
    status: "processing",
    wordCount: null,
    createdAt: { it: "17 Gen 2025", en: "Jan 17, 2025" },
  },
  {
    id: "4",
    title: { it: "Email marketing: guida definitiva", en: "Email marketing: the ultimate guide" },
    keyword: "email marketing guida",
    type: "guide",
    status: "completed",
    wordCount: 3200,
    createdAt: { it: "15 Gen 2025", en: "Jan 15, 2025" },
  },
]

// Mock: documenti generati dal lotto Bonfiglioli
const bonfiglioliDocuments: ProjectDocument[] = [
  {
    id: "lotto-1",
    title: { it: "Biogas · Introduzione del settore", en: "Biogas · Industry introduction" },
    keyword: "riduttori epicicloidali per biogas",
    type: "product_page",
    status: "completed",
    wordCount: 486,
    createdAt: { it: "15 Set 2026", en: "Sep 15, 2026" },
    batchId: "b1",
    batchName: "RevisioneNUR",
  },
  {
    id: "lotto-2",
    title: { it: "Biogas · Disimballaggio e recupero", en: "Biogas · Unpacking and recovery" },
    keyword: "riduttori epicicloidali per biogas",
    type: "product_page",
    status: "completed",
    wordCount: 512,
    createdAt: { it: "15 Set 2026", en: "Sep 15, 2026" },
    batchId: "b1",
    batchName: "RevisioneNUR",
  },
  {
    id: "lotto-3",
    title: { it: "Biogas · Digestore anaerobico", en: "Biogas · Anaerobic digester" },
    keyword: "riduttori per agitatori biogas",
    type: "product_page",
    status: "completed",
    wordCount: 498,
    createdAt: { it: "15 Set 2026", en: "Sep 15, 2026" },
    batchId: "b1",
    batchName: "RevisioneNUR",
  },
]

type ProjectTab = "documents" | "brand" | "materials"

function ProjectDetailInner({ params }: { params: { id: string } }) {
  const { locale, t } = useDashboardLocale()
  const statusCfg = getStatusConfig(locale)
  const labels = t(translations)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isBonfiglioli = params.id === BONFIGLIOLI_PROJECT_ID
  const projectMeta = mockProjects.find((p) => p.id === params.id) ?? mockProjects[0]
  const project = {
    id: params.id,
    name: projectMeta.name[locale],
    description: projectMeta.description[locale],
  }
  const documents = isBonfiglioli ? bonfiglioliDocuments : blogDocuments
  const batches = mockBatches.filter((b) => b.projectId === params.id)
  const typeLabels = labels.typeLabels

  const tabParam = searchParams.get("tab")
  const tab: ProjectTab =
    tabParam === "brand" || tabParam === "materials" ? tabParam : "documents"
  const setTab = (value: string) => {
    const next = new URLSearchParams(searchParams.toString())
    if (value === "documents") next.delete("tab")
    else next.set("tab", value)
    const query = next.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  // Stato del profilo brand: letto dopo il mount (sessionStorage nella demo)
  const [profileFilled, setProfileFilled] = React.useState<boolean | null>(null)
  React.useEffect(() => {
    setProfileFilled(isBrandProfileFilled(getBrandProfile(params.id)))
  }, [params.id])
  const materialsCount = (mockMaterials[params.id] ?? []).length

  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null)
  const [renameTarget, setRenameTarget] = React.useState<{ id: string; name: string } | null>(null)
  const [titleOverrides, setTitleOverrides] = React.useState<Record<string, string>>({})
  const [moveTarget, setMoveTarget] = React.useState<{ id: string } | null>(null)

  const moveProjectOptions = React.useMemo(
    () => mockProjects.map((p) => ({ id: p.id, name: p.name[locale] })),
    [locale],
  )

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="size-4" />
          {labels.projects}
        </Link>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <PageHeading>{project.name}</PageHeading>
            <PageDescription>{project.description}</PageDescription>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {profileFilled !== null && (
                <button
                  type="button"
                  onClick={() => setTab("brand")}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                    profileFilled
                      ? "bg-status-success/10 text-status-success hover:bg-status-success/15"
                      : "bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Sparkles className="size-3" />
                  {profileFilled ? labels.profileActive : labels.profileMissing}
                </button>
              )}
              <button
                type="button"
                onClick={() => setTab("materials")}
                className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Paperclip className="size-3" />
                {labels.materialsCount(materialsCount)}
              </button>
            </div>
          </div>
          <Button asChild variant="accent" className="shrink-0">
            <Link href={`/dashboard/documents/new?project=${params.id}`}>
              <Plus className="mr-2 size-4" />
              {labels.newDocument}
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="documents">
            <FileText className="mr-2 size-4" />
            {labels.tabs.documents}
          </TabsTrigger>
          <TabsTrigger value="brand">
            <Sparkles className="mr-2 size-4" />
            {labels.tabs.brand}
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Paperclip className="mr-2 size-4" />
            {labels.tabs.materials}
          </TabsTrigger>
        </TabsList>

        {/* ── Documenti ─────────────────────────────────────────────────── */}
        <TabsContent value="documents" className="space-y-8">
          {batches.length > 0 && (
            <section className="space-y-3">
              <div>
                <h2 className="text-sm font-medium">{labels.batches}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{labels.batchesDesc}</p>
              </div>
              <Card>
                <CardContent className="divide-y divide-border p-0">
                  {batches.map((batch) => {
                    const counts = getBatchCounts(batch.items)
                    const status = deriveBatchStatus(batch.items, false, false)
                    const done = counts.completed
                    const pct = counts.total ? Math.round((done / counts.total) * 100) : 0
                    const details = [
                      counts.processing ? `${counts.processing} ${labels.batchCounts.processing}` : null,
                      counts.queued ? `${counts.queued} ${labels.batchCounts.queued}` : null,
                      counts.failed ? `${counts.failed} ${labels.batchCounts.failed}` : null,
                    ].filter(Boolean)
                    return (
                      <div
                        key={batch.id}
                        className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between"
                      >
                        <div className="flex min-w-0 items-start gap-3 lg:w-2/5">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Layers className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                href={`/dashboard/batches/${batch.id}`}
                                className="truncate text-sm font-medium hover:underline"
                              >
                                {batch.name}
                              </Link>
                              <BatchStatusPill status={status} />
                            </div>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {labels.batchMeta(batch.fileName, formatDate(batch.createdAt), counts.total)}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <Progress value={pct} className="h-1.5 bg-muted" indicatorClassName="bg-foreground" />
                          <p className="text-xs text-muted-foreground tabular-nums">
                            {labels.batchProgress(done, counts.total)}
                            {details.length > 0 && <span> · {details.join(" · ")}</span>}
                          </p>
                        </div>
                        <Button asChild variant="outline" size="sm" className="shrink-0 self-start lg:self-auto">
                          <Link href={`/dashboard/batches/${batch.id}`}>
                            {labels.openBatch}
                            <ArrowRight className="ml-2 size-4" />
                          </Link>
                        </Button>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </section>
          )}

          <section className="space-y-4">
            {batches.length > 0 && <h2 className="text-sm font-medium">{labels.documentsTitle}</h2>}
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder={labels.searchPlaceholder} className="pl-9" aria-label={labels.searchAriaLabel} />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 size-4" />
                {labels.filters}
              </Button>
            </div>

            {/* Documents List */}
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="size-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0">
                          <Link
                            href={`/dashboard/documents/${doc.id}`}
                            className="font-medium text-sm hover:underline block truncate"
                          >
                            {titleOverrides[doc.id] ?? doc.title[locale]}
                          </Link>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-muted-foreground">{typeLabels[doc.type]}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <code className="text-xs bg-muted px-1.5 py-0.5 rounded">{doc.keyword}</code>
                            {doc.wordCount && (
                              <>
                                <span className="text-xs text-muted-foreground">·</span>
                                <span className="text-xs text-muted-foreground">
                                  {doc.wordCount.toLocaleString()} {labels.words}
                                </span>
                              </>
                            )}
                            {doc.batchId && (
                              <Link
                                href={`/dashboard/batches/${doc.batchId}`}
                                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
                              >
                                <Layers className="size-3" />
                                {labels.batchChip(doc.batchName ?? "")}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground hidden sm:block">
                          {doc.createdAt[locale]}
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusCfg[doc.status].className}`}
                        >
                          {statusCfg[doc.status].label}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
                              aria-label={labels.moreOptions}
                            >
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/documents/${doc.id}`}>{labels.open}</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                setRenameTarget({
                                  id: doc.id,
                                  name: titleOverrides[doc.id] ?? doc.title[locale],
                                })
                              }
                            >
                              <Pencil className="mr-2 size-4" />
                              {labels.rename}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setMoveTarget({ id: doc.id })}>
                              <FolderInput className="mr-2 size-4" />
                              {labels.move}
                            </DropdownMenuItem>
                            <DropdownMenuItem>{labels.duplicate}</DropdownMenuItem>
                            <DropdownMenuItem>{labels.export}</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(doc.id)}>
                              {labels.delete}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </TabsContent>

        {/* ── Profilo brand ─────────────────────────────────────────────── */}
        <TabsContent value="brand">
          <BrandProfileForm projectId={params.id} onSaved={() => setProfileFilled(true)} />
        </TabsContent>

        {/* ── Materiali ─────────────────────────────────────────────────── */}
        <TabsContent value="materials">
          <ProjectMaterials projectId={params.id} />
        </TabsContent>
      </Tabs>

      <RenameDocumentDialog
        open={renameTarget !== null}
        onOpenChange={(open) => !open && setRenameTarget(null)}
        currentName={renameTarget?.name ?? ""}
        onRename={(newName) => {
          if (!renameTarget) return
          setTitleOverrides((prev) => ({ ...prev, [renameTarget.id]: newName }))
          setRenameTarget(null)
        }}
      />

      <MoveDocumentDialog
        open={moveTarget !== null}
        onOpenChange={(open) => !open && setMoveTarget(null)}
        projects={moveProjectOptions}
        count={1}
        currentProjectId={params.id}
        onMove={() => setMoveTarget(null)}
      />

      {/* Delete document dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{labels.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>{labels.deleteDesc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                toast.success(labels.documentDeleted)
                setDeleteTarget(null)
              }}
            >
              {labels.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export function ProjectDetailContent({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <Loader2 className="size-6 animate-spin motion-reduce:animate-none" />
        </div>
      }
    >
      <ProjectDetailInner params={params} />
    </Suspense>
  )
}
