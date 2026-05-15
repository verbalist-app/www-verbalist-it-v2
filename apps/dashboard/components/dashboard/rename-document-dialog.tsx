"use client"

import * as React from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const text = {
  it: {
    title: "Rinomina documento",
    description: "Cambia il nome del documento.",
    label: "Nome del documento",
    placeholder: "Inserisci il nuovo nome",
    cancel: "Annulla",
    save: "Salva",
    renamed: "Documento rinominato",
  },
  en: {
    title: "Rename document",
    description: "Change the document name.",
    label: "Document name",
    placeholder: "Enter the new name",
    cancel: "Cancel",
    save: "Save",
    renamed: "Document renamed",
  },
}

export function RenameDocumentDialog({
  open,
  onOpenChange,
  currentName,
  onRename,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentName: string
  onRename?: (newName: string) => void
}) {
  const { t } = useDashboardLocale()
  const labels = t(text)
  const [name, setName] = React.useState(currentName)

  React.useEffect(() => {
    if (open) setName(currentName)
  }, [open, currentName])

  const trimmed = name.trim()
  const canSave = trimmed.length > 0 && trimmed !== currentName.trim()

  const handleSave = () => {
    if (!canSave) return
    onRename?.(trimmed)
    toast.success(labels.renamed)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{labels.title}</DialogTitle>
          <DialogDescription>{labels.description}</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="rename-document-name">{labels.label}</Label>
            <Input
              id="rename-document-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={labels.placeholder}
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {labels.cancel}
            </Button>
            <Button type="submit" disabled={!canSave}>
              {labels.save}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
