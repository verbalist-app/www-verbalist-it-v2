"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconArrowLeft as ArrowLeft,
  IconPlus as Plus,
  IconDots as MoreHorizontal,
  IconFileText as FileText,
  IconSearch as Search,
  IconFilter as Filter
} from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { getStatusConfig, type Status } from "@/lib/status"
import { useDashboardLocale } from "../../../_lib/dashboard-locale"

const translations = {
  it: {
    projects: "Progetti",
    newDocument: "Nuovo documento",
    searchPlaceholder: "Cerca documenti...",
    searchAriaLabel: "Cerca documenti",
    filters: "Filtri",
    open: "Apri",
    duplicate: "Duplica",
    export: "Esporta",
    delete: "Elimina",
    deleteTitle: "Eliminare questo documento?",
    deleteDesc: "Il documento verrà eliminato permanentemente. Questa azione non può essere annullata.",
    cancel: "Annulla",
    documentDeleted: "Documento eliminato",
    moreOptions: "Altre opzioni",
    words: "parole",
    project: {
      name: "Blog Aziendale",
      description: "Contenuti per il blog corporate",
    },
    documents: [
      { title: "Guida completa al SEO nel 2025", createdAt: "19 Gen 2025" },
      { title: "Come scegliere il miglior CRM per la tua azienda", createdAt: "18 Gen 2025" },
      { title: "10 strategie di marketing B2B che funzionano", createdAt: "17 Gen 2025" },
      { title: "Email marketing: guida definitiva", createdAt: "15 Gen 2025" },
    ],
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
    searchPlaceholder: "Search documents...",
    searchAriaLabel: "Search documents",
    filters: "Filters",
    open: "Open",
    duplicate: "Duplicate",
    export: "Export",
    delete: "Delete",
    deleteTitle: "Delete this document?",
    deleteDesc: "The document will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    documentDeleted: "Document deleted",
    moreOptions: "More options",
    words: "words",
    project: {
      name: "Corporate Blog",
      description: "Content for corporate blog",
    },
    documents: [
      { title: "Complete guide to SEO in 2025", createdAt: "Jan 19, 2025" },
      { title: "How to choose the best CRM for your business", createdAt: "Jan 18, 2025" },
      { title: "10 B2B marketing strategies that work", createdAt: "Jan 17, 2025" },
      { title: "Email marketing: the ultimate guide", createdAt: "Jan 15, 2025" },
    ],
    typeLabels: {
      blog_post: "Blog Post",
      product_page: "Product Page",
      guide: "Guide",
      landing_page: "Landing Page",
    } as Record<string, string>,
  },
}

// Mock data (base structure)
const documentsBase = [
  { id: "1", keyword: "seo 2025", type: "blog_post", status: "completed", wordCount: 2450 as number | null },
  { id: "2", keyword: "miglior crm", type: "blog_post", status: "completed", wordCount: 1890 as number | null },
  { id: "3", keyword: "marketing b2b strategie", type: "blog_post", status: "processing", wordCount: null as number | null },
  { id: "4", keyword: "email marketing guida", type: "guide", status: "completed", wordCount: 3200 as number | null },
]

export function ProjectDetailContent({
  params,
}: {
  params: { id: string }
}) {
  const { locale, t } = useDashboardLocale()
  const statusCfg = getStatusConfig(locale)
  const labels = t(translations)
  const project = { id: "1", ...labels.project }
  const documents = documentsBase.map((d, i) => ({
    ...d,
    title: labels.documents[i].title,
    createdAt: labels.documents[i].createdAt,
  }))
  const typeLabels = labels.typeLabels
  const [deleteTarget, setDeleteTarget] = React.useState<string | null>(null)

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-display tracking-tight lg:text-2xl">
              {project.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {project.description}
            </p>
          </div>
          <Button asChild variant="alternative">
            <Link href={`/dashboard/documents/new?project=${params.id}`}>
              <Plus className="mr-2 size-4" />
              {labels.newDocument}
            </Link>
          </Button>
        </div>
      </div>

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
                      {doc.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {typeLabels[doc.type]}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                        {doc.keyword}
                      </code>
                      {doc.wordCount && (
                        <>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">
                            {doc.wordCount.toLocaleString()} {labels.words}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:block">
                    {doc.createdAt}
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      statusCfg[doc.status as Status].className
                    }`}
                  >
                    {statusCfg[doc.status as Status].label}
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
                      <DropdownMenuItem>{labels.open}</DropdownMenuItem>
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

      {/* Delete document dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{labels.deleteTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {labels.deleteDesc}
            </AlertDialogDescription>
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
