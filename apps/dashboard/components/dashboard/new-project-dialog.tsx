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
import { Textarea } from "@/components/ui/textarea"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const text = {
  it: {
    title: "Crea nuovo progetto",
    description: "Organizza i tuoi documenti in un nuovo progetto.",
    nameLabel: "Nome del progetto",
    namePlaceholder: "es. Blog Aziendale",
    descLabel: "Descrizione (opzionale)",
    descPlaceholder: "A cosa serve questo progetto?",
    cancel: "Annulla",
    create: "Crea progetto",
    created: (name: string) => `Progetto "${name}" creato`,
  },
  en: {
    title: "Create new project",
    description: "Organize your documents in a new project.",
    nameLabel: "Project name",
    namePlaceholder: "e.g., Company Blog",
    descLabel: "Description (optional)",
    descPlaceholder: "What is this project for?",
    cancel: "Cancel",
    create: "Create project",
    created: (name: string) => `Project "${name}" created`,
  },
}

export function NewProjectDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate?: (project: { id: string; name: string; description: string }) => void
}) {
  const { t } = useDashboardLocale()
  const labels = t(text)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (!open) {
      setName("")
      setDescription("")
    }
  }, [open])

  const handleCreate = () => {
    const trimmedName = name.trim()
    if (!trimmedName) return
    const id = `new-${Date.now().toString(36)}`
    onCreate?.({ id, name: trimmedName, description: description.trim() })
    toast.success(labels.created(trimmedName))
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
            handleCreate()
          }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="np-name">{labels.nameLabel}</Label>
            <Input
              id="np-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={labels.namePlaceholder}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="np-desc">{labels.descLabel}</Label>
            <Textarea
              id="np-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={labels.descPlaceholder}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {labels.cancel}
            </Button>
            <Button type="submit" variant="accent" disabled={!name.trim()}>
              {labels.create}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
