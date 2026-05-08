"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconLayoutKanban as FolderKanban,
  IconPlus as Plus,
  IconDots as MoreHorizontal,
  IconFileText as FileText,
  IconClock as Clock
} from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { useDashboardLocale } from "../../_lib/dashboard-locale"

const translations = {
  it: {
    title: "Progetti",
    subtitle: "Organizza i tuoi documenti in progetti",
    newProject: "Nuovo progetto",
    createNewProject: "Crea nuovo progetto",
    documents: "documenti",
    edit: "Modifica",
    duplicate: "Duplica",
    delete: "Elimina",
    deleteTitle: (name: string) => `Eliminare "${name}"?`,
    deleteDesc: "Il progetto e tutti i suoi documenti verranno eliminati permanentemente. Questa azione non può essere annullata.",
    cancel: "Annulla",
    projectDeleted: (name: string) => `Progetto "${name}" eliminato`,
    moreOptions: "Altre opzioni",
    projects: [
      { name: "Blog Aziendale", description: "Contenuti per il blog corporate", lastUpdated: "2 ore fa" },
      { name: "Landing Pages", description: "Pagine di atterraggio per campagne", lastUpdated: "1 giorno fa" },
      { name: "E-commerce", description: "Descrizioni prodotti e categorie", lastUpdated: "3 giorni fa" },
      { name: "Guide Tecniche", description: "Tutorial e documentazione", lastUpdated: "1 settimana fa" },
    ],
  },
  en: {
    title: "Projects",
    subtitle: "Organize your documents into projects",
    newProject: "New project",
    createNewProject: "Create new project",
    documents: "documents",
    edit: "Edit",
    duplicate: "Duplicate",
    delete: "Delete",
    deleteTitle: (name: string) => `Delete "${name}"?`,
    deleteDesc: "The project and all its documents will be permanently deleted. This action cannot be undone.",
    cancel: "Cancel",
    projectDeleted: (name: string) => `Project "${name}" deleted`,
    moreOptions: "More options",
    projects: [
      { name: "Corporate Blog", description: "Content for corporate blog", lastUpdated: "2 hours ago" },
      { name: "Landing Pages", description: "Landing pages for campaigns", lastUpdated: "1 day ago" },
      { name: "E-commerce", description: "Product descriptions and categories", lastUpdated: "3 days ago" },
      { name: "Technical Guides", description: "Tutorials and documentation", lastUpdated: "1 week ago" },
    ],
  },
}

// Mock data (base structure)
const projectsBase = [
  { id: "1", documentsCount: 12 },
  { id: "2", documentsCount: 8 },
  { id: "3", documentsCount: 24 },
  { id: "4", documentsCount: 6 },
]

export function ProjectsContent() {
  const { t } = useDashboardLocale()
  const labels = t(translations)
  const projects = projectsBase.map((p, i) => ({
    ...p,
    name: labels.projects[i].name,
    description: labels.projects[i].description,
    lastUpdated: labels.projects[i].lastUpdated,
  }))
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; name: string } | null>(null)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <PageHeading>{labels.title}</PageHeading>
          <PageDescription>{labels.subtitle}</PageDescription>
        </div>
        <Button variant="accent">
          <Plus className="mr-2 size-4" />
          {labels.newProject}
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="group hover:border-primary/40 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <FolderKanban className="size-5 text-muted-foreground shrink-0" />
                  <div>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
                      className="font-medium hover:underline"
                    >
                      {project.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </div>
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
                    <DropdownMenuItem>{labels.edit}</DropdownMenuItem>
                    <DropdownMenuItem>{labels.duplicate}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={() => setDeleteTarget({ id: project.id, name: project.name })}>
                      {labels.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="size-4" />
                  <span>{project.documentsCount} {labels.documents}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  <span>{project.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* New Project Card */}
        <Link href="/dashboard/projects/new" className="block">
          <Card className="border-dashed hover:border-primary/40 transition-colors">
            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[160px] text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="size-5 mb-3" />
              <span className="text-sm font-medium">{labels.createNewProject}</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Delete project dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{deleteTarget ? labels.deleteTitle(deleteTarget.name) : ""}</AlertDialogTitle>
            <AlertDialogDescription>
              {labels.deleteDesc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{labels.cancel}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                toast.success(labels.projectDeleted(deleteTarget?.name ?? ""))
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
