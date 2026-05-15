"use client"

import * as React from "react"
import Link from "next/link"
import {
  Plus,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  FileText,
  Trash2,
  FolderInput,
  Eye,
  Download,
  Pencil,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
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
import { getStatusConfig, type Status } from "@/lib/status"
import { RenameDocumentDialog } from "@/components/dashboard/rename-document-dialog"
import { MoveDocumentDialog } from "@/components/dashboard/move-document-dialog"
import { useDashboardLocale } from "../../_lib/dashboard-locale"

// Mock data
const allDocuments = [
  {
    id: "1",
    title: { it: "Guida completa al SEO nel 2025", en: "Complete SEO Guide for 2025" },
    keyword: "seo 2025",
    type: "blog_post",
    project: { it: "Blog Aziendale", en: "Company Blog" },
    projectId: "1",
    status: "completed",
    wordCount: 2450,
    createdAt: "2025-01-19",
  },
  {
    id: "2",
    title: { it: "Come scegliere il miglior CRM", en: "How to Choose the Best CRM" },
    keyword: "miglior crm",
    type: "guide",
    project: { it: "Landing Pages", en: "Landing Pages" },
    projectId: "2",
    status: "processing",
    wordCount: 0,
    createdAt: "2025-01-19",
  },
  {
    id: "3",
    title: { it: "10 strategie di marketing B2B", en: "10 B2B Marketing Strategies" },
    keyword: "marketing b2b",
    type: "blog_post",
    project: { it: "Blog Aziendale", en: "Company Blog" },
    projectId: "1",
    status: "completed",
    wordCount: 1890,
    createdAt: "2025-01-18",
  },
  {
    id: "4",
    title: { it: "Ottimizzazione pagina prodotto", en: "Product Page Optimization" },
    keyword: "pagina prodotto ecommerce",
    type: "product_page",
    project: { it: "E-commerce", en: "E-commerce" },
    projectId: "3",
    status: "completed",
    wordCount: 980,
    createdAt: "2025-01-17",
  },
  {
    id: "5",
    title: { it: "Come aumentare le conversioni", en: "How to Increase Conversions" },
    keyword: "aumentare conversioni",
    type: "landing_page",
    project: { it: "Landing Pages", en: "Landing Pages" },
    projectId: "2",
    status: "completed",
    wordCount: 1250,
    createdAt: "2025-01-16",
  },
  {
    id: "6",
    title: { it: "Guida all'email marketing", en: "Email Marketing Guide" },
    keyword: "email marketing",
    type: "guide",
    project: { it: "Guide Tecniche", en: "Technical Guides" },
    projectId: "4",
    status: "failed",
    wordCount: 0,
    createdAt: "2025-01-15",
  },
  {
    id: "7",
    title: { it: "Strategie di link building", en: "Link Building Strategies" },
    keyword: "link building",
    type: "blog_post",
    project: { it: "Blog Aziendale", en: "Company Blog" },
    projectId: "1",
    status: "completed",
    wordCount: 2100,
    createdAt: "2025-01-14",
  },
  {
    id: "8",
    title: { it: "Analisi competitor", en: "Competitor Analysis" },
    keyword: "analisi competitor seo",
    type: "guide",
    project: { it: "Guide Tecniche", en: "Technical Guides" },
    projectId: "4",
    status: "completed",
    wordCount: 3200,
    createdAt: "2025-01-13",
  },
]

const content = {
  it: {
    title: "Documenti",
    subtitle: "Gestisci tutti i tuoi contenuti generati",
    newDocument: "Nuovo documento",
    searchPlaceholder: "Cerca per titolo o keyword...",
    searchAriaLabel: "Cerca per titolo o keyword",
    allStatuses: "Tutti gli stati",
    completed: "Completato",
    processing: "In elaborazione",
    failed: "Errore",
    allTypes: "Tutti i tipi",
    blogPost: "Blog Post",
    productPage: "Pagina Prodotto",
    guideTutorial: "Guida/Tutorial",
    landingPage: "Landing Page",
    allProjects: "Tutti i progetti",
    blogAziendale: "Blog Aziendale",
    landingPages: "Landing Pages",
    ecommerce: "E-commerce",
    guideTecniche: "Guide Tecniche",
    clearFilters: "Rimuovi filtri",
    documentsSelected: "documenti selezionati",
    move: "Sposta",
    delete: "Elimina",
    selectAll: "Seleziona tutti i documenti",
    document: "Documento",
    project: "Progetto",
    type: "Tipo",
    status: "Status",
    words: "Parole",
    date: "Data",
    noDocuments: "Nessun documento trovato",
    view: "Visualizza",
    export: "Esporta",
    rename: "Rinomina",
    moveToProject: "Sposta in progetto",
    moreOptions: "Altre opzioni",
    page: "Pagina",
    of: "di",
    showing: "Mostrando",
    documents: "documenti",
    deleteDialogTitle: "Eliminare questo documento?",
    deleteDialogDescription: "Il documento verrà eliminato permanentemente. Questa azione non può essere annullata.",
    cancel: "Annulla",
    documentDeleted: "Documento eliminato",
    deletionCancelled: "Eliminazione annullata",
    documentsDeleted: "documenti eliminati",
    documentsMoved: "documenti spostati",
    guide: "Guida",
    typeBlogPost: "Blog Post",
    typeProductPage: "Pagina Prodotto",
    typeGuide: "Guida",
    typeLandingPage: "Landing Page",
  },
  en: {
    title: "Documents",
    subtitle: "Manage all your generated content",
    newDocument: "New document",
    searchPlaceholder: "Search by title or keyword...",
    searchAriaLabel: "Search by title or keyword",
    allStatuses: "All statuses",
    completed: "Completed",
    processing: "Processing",
    failed: "Failed",
    allTypes: "All types",
    blogPost: "Blog Post",
    productPage: "Product Page",
    guideTutorial: "Guide/Tutorial",
    landingPage: "Landing Page",
    allProjects: "All projects",
    blogAziendale: "Company Blog",
    landingPages: "Landing Pages",
    ecommerce: "E-commerce",
    guideTecniche: "Technical Guides",
    clearFilters: "Clear filters",
    documentsSelected: "documents selected",
    move: "Move",
    delete: "Delete",
    selectAll: "Select all documents",
    document: "Document",
    project: "Project",
    type: "Type",
    status: "Status",
    words: "Words",
    date: "Date",
    noDocuments: "No documents found",
    view: "View",
    export: "Export",
    rename: "Rename",
    moveToProject: "Move to project",
    moreOptions: "More options",
    page: "Page",
    of: "of",
    showing: "Showing",
    documents: "documents",
    deleteDialogTitle: "Delete this document?",
    deleteDialogDescription: "This document will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    documentDeleted: "Document deleted",
    deletionCancelled: "Deletion cancelled",
    documentsDeleted: "documents deleted",
    documentsMoved: "documents moved",
    guide: "Guide",
    typeBlogPost: "Blog Post",
    typeProductPage: "Product Page",
    typeGuide: "Guide",
    typeLandingPage: "Landing Page",
  },
}

type SortField = "title" | "createdAt" | "wordCount"
type SortDirection = "asc" | "desc"

const ITEMS_PER_PAGE = 5

export function DocumentsContent() {
  const { t, locale } = useDashboardLocale()
  const statusCfg = getStatusConfig(locale)
  const c = t(content)

  const statusOptions = [
    { value: "all", label: c.allStatuses },
    { value: "completed", label: c.completed },
    { value: "processing", label: c.processing },
    { value: "failed", label: c.failed },
  ]

  const typeOptions = [
    { value: "all", label: c.allTypes },
    { value: "blog_post", label: c.blogPost },
    { value: "product_page", label: c.productPage },
    { value: "guide", label: c.guideTutorial },
    { value: "landing_page", label: c.landingPage },
  ]

  const projectOptions = [
    { value: "all", label: c.allProjects },
    { value: "1", label: c.blogAziendale },
    { value: "2", label: c.landingPages },
    { value: "3", label: c.ecommerce },
    { value: "4", label: c.guideTecniche },
  ]

  const typeLabels: Record<string, string> = {
    blog_post: c.typeBlogPost,
    product_page: c.typeProductPage,
    guide: c.typeGuide,
    landing_page: c.typeLandingPage,
  }

  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [typeFilter, setTypeFilter] = React.useState("all")
  const [projectFilter, setProjectFilter] = React.useState("all")
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [sortField, setSortField] = React.useState<SortField>("createdAt")
  const [sortDirection, setSortDirection] = React.useState<SortDirection>("desc")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null)
  const [showBulkDeleteDialog, setShowBulkDeleteDialog] = React.useState(false)
  const [renameTarget, setRenameTarget] = React.useState<{ id: string; name: string } | null>(null)
  const [titleOverrides, setTitleOverrides] = React.useState<Record<string, string>>({})
  const [moveTarget, setMoveTarget] = React.useState<{ id: string; currentProjectId: string } | null>(null)
  const [showBulkMoveDialog, setShowBulkMoveDialog] = React.useState(false)
  const [projectOverrides, setProjectOverrides] = React.useState<Record<string, string | null>>({})

  const getDocTitle = React.useCallback(
    (doc: (typeof allDocuments)[number]) =>
      titleOverrides[doc.id] ?? t(doc.title),
    [titleOverrides, t],
  )

  // Filter and sort documents
  const filteredDocuments = React.useMemo(() => {
    let result = allDocuments.filter((doc) => {
      const docTitle = getDocTitle(doc)
      const docProjectId = projectOverrides[doc.id] ?? doc.projectId
      const matchesSearch = search === "" ||
        docTitle.toLowerCase().includes(search.toLowerCase()) ||
        doc.keyword.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === "all" || doc.status === statusFilter
      const matchesType = typeFilter === "all" || doc.type === typeFilter
      const matchesProject = projectFilter === "all" || docProjectId === projectFilter
      return matchesSearch && matchesStatus && matchesType && matchesProject
    })

    // Sort
    result.sort((a, b) => {
      let comparison = 0
      if (sortField === "title") {
        comparison = getDocTitle(a).localeCompare(getDocTitle(b))
      } else if (sortField === "createdAt") {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortField === "wordCount") {
        comparison = a.wordCount - b.wordCount
      }
      return sortDirection === "asc" ? comparison : -comparison
    })

    return result
  }, [search, statusFilter, typeFilter, projectFilter, sortField, sortDirection, getDocTitle, projectOverrides])

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE)
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, typeFilter, projectFilter])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedDocuments.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(paginatedDocuments.map((doc) => doc.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleBulkDelete = () => {
    const count = selectedIds.length
    setSelectedIds([])
    setShowBulkDeleteDialog(false)
    toast.success(`${count} ${c.documentsDeleted}`, {
      action: {
        label: c.cancel,
        onClick: () => toast.info(c.deletionCancelled),
      },
      duration: 5000,
    })
  }

  const handleBulkMove = () => {
    setShowBulkMoveDialog(true)
  }

  const moveProjectOptions = React.useMemo(
    () => projectOptions.filter((o) => o.value !== "all").map((o) => ({ id: o.value, name: o.label })),
    [projectOptions],
  )

  const getDocProjectId = (doc: (typeof allDocuments)[number]) =>
    projectOverrides[doc.id] ?? doc.projectId

  const clearFilters = () => {
    setSearch("")
    setStatusFilter("all")
    setTypeFilter("all")
    setProjectFilter("all")
  }

  const hasActiveFilters = search !== "" || statusFilter !== "all" || typeFilter !== "all" || projectFilter !== "all"

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 size-4" />
    return sortDirection === "asc" ? <ArrowUp className="ml-2 size-4" /> : <ArrowDown className="ml-2 size-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <PageHeading>{c.title}</PageHeading>
          <PageDescription>{c.subtitle}</PageDescription>
        </div>
        <Button asChild variant="accent">
          <Link href="/dashboard/documents/new">
            <Plus className="mr-2 size-4" />
            {c.newDocument}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder={c.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                aria-label={c.searchAriaLabel}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={projectFilter} onValueChange={setProjectFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {projectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="mr-2 size-4" />
                  {c.clearFilters}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedIds.length} {c.documentsSelected}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleBulkMove}>
                  <FolderInput className="mr-2 size-4" />
                  {c.move}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setShowBulkDeleteDialog(true)}>
                  <Trash2 className="mr-2 size-4" />
                  {c.delete}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === paginatedDocuments.length && paginatedDocuments.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label={c.selectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => toggleSort("title")}
                >
                  {c.document}
                  <SortIcon field="title" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">{c.project}</TableHead>
              <TableHead className="hidden lg:table-cell">{c.type}</TableHead>
              <TableHead>{c.status}</TableHead>
              <TableHead className="hidden sm:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => toggleSort("wordCount")}
                >
                  {c.words}
                  <SortIcon field="wordCount" />
                </Button>
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => toggleSort("createdAt")}
                >
                  {c.date}
                  <SortIcon field="createdAt" />
                </Button>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="size-8 text-muted-foreground" />
                    <p className="text-muted-foreground">{c.noDocuments}</p>
                    {hasActiveFilters && (
                      <Button variant="link" size="sm" onClick={clearFilters}>
                        {c.clearFilters}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(doc.id)}
                      onCheckedChange={() => toggleSelect(doc.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link
                        href={`/dashboard/documents/${doc.id}`}
                        className="font-medium hover:underline"
                      >
                        {getDocTitle(doc)}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        <code className="bg-muted px-1 py-0.5 rounded">{doc.keyword}</code>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {(() => {
                      const projectId = getDocProjectId(doc)
                      const projectName =
                        moveProjectOptions.find((p) => p.id === projectId)?.name ??
                        t(doc.project)
                      return projectId ? (
                        <Link
                          href={`/dashboard/projects/${projectId}`}
                          className="text-sm hover:underline"
                        >
                          {projectName}
                        </Link>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )
                    })()}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {typeLabels[doc.type]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusCfg[doc.status as Status].badgeVariant}>
                      {statusCfg[doc.status as Status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm tabular-nums">
                      {doc.wordCount > 0 ? doc.wordCount.toLocaleString() : "-"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString(locale === "it" ? "it-IT" : "en-US")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8" aria-label={c.moreOptions}>
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/documents/${doc.id}`}>
                            <Eye className="mr-2 size-4" />
                            {c.view}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setRenameTarget({ id: doc.id, name: getDocTitle(doc) })
                          }
                        >
                          <Pencil className="mr-2 size-4" />
                          {c.rename}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 size-4" />
                          {c.export}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            setMoveTarget({
                              id: doc.id,
                              currentProjectId: getDocProjectId(doc),
                            })
                          }
                        >
                          <FolderInput className="mr-2 size-4" />
                          {c.moveToProject}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget(doc.id)}>
                          <Trash2 className="mr-2 size-4" />
                          {c.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <p className="text-sm text-muted-foreground">
              {c.showing} {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredDocuments.length)} {c.of} {filteredDocuments.length} {c.documents}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm">
                {c.page} {currentPage} {c.of} {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
      {/* Delete single document dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{c.deleteDialogTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {c.deleteDialogDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                toast.success(c.documentDeleted, {
                  action: {
                    label: c.cancel,
                    onClick: () => toast.info(c.deletionCancelled),
                  },
                  duration: 5000,
                })
                setDeleteTarget(null)
              }}
            >
              {c.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
        currentProjectId={moveTarget?.currentProjectId ?? null}
        onMove={(destinationProjectId) => {
          if (!moveTarget) return
          setProjectOverrides((prev) => ({
            ...prev,
            [moveTarget.id]: destinationProjectId,
          }))
          setMoveTarget(null)
        }}
      />

      <MoveDocumentDialog
        open={showBulkMoveDialog}
        onOpenChange={setShowBulkMoveDialog}
        projects={moveProjectOptions}
        count={selectedIds.length}
        currentProjectId={null}
        onMove={(destinationProjectId) => {
          setProjectOverrides((prev) => {
            const next = { ...prev }
            for (const id of selectedIds) {
              next[id] = destinationProjectId
            }
            return next
          })
          setSelectedIds([])
          setShowBulkMoveDialog(false)
        }}
      />

      {/* Bulk delete dialog */}
      <AlertDialog open={showBulkDeleteDialog} onOpenChange={setShowBulkDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{c.delete} {selectedIds.length} {c.documents}?</AlertDialogTitle>
            <AlertDialogDescription>
              {t({ it: "I documenti selezionati verranno eliminati permanentemente. Questa azione non può essere annullata.", en: "The selected documents will be permanently deleted. This action cannot be undone." })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{c.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleBulkDelete}
            >
              {c.delete} {selectedIds.length} {c.documents}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
