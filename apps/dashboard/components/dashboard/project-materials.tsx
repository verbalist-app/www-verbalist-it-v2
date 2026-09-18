"use client"

import * as React from "react"
import { FileText, Paperclip, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { mockMaterials, type ProjectMaterial } from "@/lib/brand-profile"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const MAX_FILE_KB = 1024

const text = {
  it: {
    title: "Materiali",
    intro:
      "Brochure, schede tecniche, do's & don'ts. Verbalist li rilegge a ogni generazione di questo progetto e li usa come contesto. Non li usa per addestrare nulla.",
    limits: "Solo PDF, massimo 1 MB per file.",
    upload: "Carica PDF",
    emptyTitle: "Nessun materiale caricato",
    emptyDesc: "Aggiungi i documenti che descrivono prodotti, lessico e regole. Valgono per tutti i contenuti del progetto.",
    uploadedOn: "caricato il",
    remove: "Rimuovi",
    removed: (name: string) => `"${name}" rimosso`,
    uploaded: (count: number) => (count === 1 ? "1 file caricato" : `${count} file caricati`),
    tooBig: (name: string) => `"${name}" supera 1 MB e non è stato caricato`,
    notPdf: (name: string) => `"${name}" non è un PDF`,
  },
  en: {
    title: "Materials",
    intro:
      "Brochures, datasheets, do's & don'ts. Verbalist re-reads them on every generation in this project and uses them as context. It does not train on them.",
    limits: "PDF only, up to 1 MB per file.",
    upload: "Upload PDF",
    emptyTitle: "No materials uploaded",
    emptyDesc: "Add the documents that describe products, lexicon and rules. They apply to every content in the project.",
    uploadedOn: "uploaded on",
    remove: "Remove",
    removed: (name: string) => `"${name}" removed`,
    uploaded: (count: number) => (count === 1 ? "1 file uploaded" : `${count} files uploaded`),
    tooBig: (name: string) => `"${name}" exceeds 1 MB and was not uploaded`,
    notPdf: (name: string) => `"${name}" is not a PDF`,
  },
}

function formatSize(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}

export function ProjectMaterials({ projectId }: { projectId: string }) {
  const { t, locale } = useDashboardLocale()
  const labels = t(text)
  const [files, setFiles] = React.useState<ProjectMaterial[]>(() => mockMaterials[projectId] ?? [])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat(locale === "it" ? "it-IT" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso))

  const handleFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? [])
    const accepted: ProjectMaterial[] = []
    for (const file of picked) {
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        toast.error(labels.notPdf(file.name))
        continue
      }
      if (file.size > MAX_FILE_KB * 1024) {
        toast.error(labels.tooBig(file.name))
        continue
      }
      accepted.push({
        id: `u-${Date.now().toString(36)}-${accepted.length}`,
        name: file.name,
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
        uploadedAt: new Date().toISOString(),
      })
    }
    if (accepted.length) {
      setFiles((prev) => [...prev, ...accepted])
      toast.success(labels.uploaded(accepted.length))
    }
    if (inputRef.current) inputRef.current.value = ""
  }

  const remove = (file: ProjectMaterial) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id))
    toast.success(labels.removed(file.name))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-prose">
          <h2 className="text-base font-medium">{labels.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{labels.intro}</p>
          <p className="mt-1 text-xs text-muted-foreground">{labels.limits}</p>
        </div>
        <Button variant="outline" onClick={() => inputRef.current?.click()} className="shrink-0">
          <Paperclip className="mr-2 size-4" />
          {labels.upload}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length === 0 ? (
        <Empty className="border bg-muted/30">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Paperclip />
            </EmptyMedia>
            <EmptyTitle>{labels.emptyTitle}</EmptyTitle>
            <EmptyDescription>{labels.emptyDesc}</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="accent" onClick={() => inputRef.current?.click()}>
              {labels.upload}
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {files.map((file) => (
                <li key={file.id} className="flex items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{file.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {formatSize(file.sizeKb)} · {labels.uploadedOn} {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 shrink-0"
                    onClick={() => remove(file)}
                    aria-label={`${labels.remove}: ${file.name}`}
                  >
                    <X className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
