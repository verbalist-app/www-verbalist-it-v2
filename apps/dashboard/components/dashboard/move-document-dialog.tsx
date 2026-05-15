"use client"

import * as React from "react"
import { Folder, Check } from "lucide-react"
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
import { cn } from "@/lib/utils"
import { useDashboardLocale } from "@/app/dashboard/_lib/dashboard-locale"

const text = {
  it: {
    titleSingle: "Sposta documento",
    titleBulk: (n: number) => `Sposta ${n} documenti`,
    descriptionSingle: "Scegli il progetto di destinazione.",
    descriptionBulk: "I documenti selezionati verranno spostati nel progetto scelto.",
    none: "Nessun progetto",
    cancel: "Annulla",
    move: "Sposta",
    moved: "Documento spostato",
    movedBulk: (n: number) => `${n} documenti spostati`,
  },
  en: {
    titleSingle: "Move document",
    titleBulk: (n: number) => `Move ${n} documents`,
    descriptionSingle: "Choose the destination project.",
    descriptionBulk: "The selected documents will be moved to the chosen project.",
    none: "No project",
    cancel: "Cancel",
    move: "Move",
    moved: "Document moved",
    movedBulk: (n: number) => `${n} documents moved`,
  },
}

export type ProjectOption = {
  id: string
  name: string
}

export function MoveDocumentDialog({
  open,
  onOpenChange,
  projects,
  count = 1,
  currentProjectId,
  onMove,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  projects: ProjectOption[]
  count?: number
  currentProjectId?: string | null
  onMove?: (destinationProjectId: string | null) => void
}) {
  const { t } = useDashboardLocale()
  const labels = t(text)
  const [selected, setSelected] = React.useState<string | null>(currentProjectId ?? null)

  React.useEffect(() => {
    if (open) setSelected(currentProjectId ?? null)
  }, [open, currentProjectId])

  const isBulk = count > 1
  const canMove = selected !== (currentProjectId ?? null)

  const handleMove = () => {
    if (!canMove) return
    onMove?.(selected)
    toast.success(isBulk ? labels.movedBulk(count) : labels.moved)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isBulk ? labels.titleBulk(count) : labels.titleSingle}</DialogTitle>
          <DialogDescription>
            {isBulk ? labels.descriptionBulk : labels.descriptionSingle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-1 max-h-72 overflow-y-auto rounded-md border bg-muted/30 p-1">
          {[{ id: "", name: labels.none } as ProjectOption, ...projects].map((p) => {
            const value = p.id === "" ? null : p.id
            const isSelected = selected === value
            return (
              <button
                key={p.id || "__none__"}
                type="button"
                onClick={() => setSelected(value)}
                className={cn(
                  "flex w-full items-center gap-3 rounded px-3 py-2 text-left text-sm transition-colors hover:bg-muted",
                  isSelected && "bg-muted"
                )}
              >
                <Folder
                  className={cn(
                    "size-4 shrink-0",
                    p.id === "" ? "text-muted-foreground/60" : "text-muted-foreground"
                  )}
                />
                <span className="flex-1 truncate">{p.name}</span>
                {isSelected && <Check className="size-4 text-foreground" />}
              </button>
            )
          })}
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {labels.cancel}
          </Button>
          <Button type="button" onClick={handleMove} disabled={!canMove}>
            {labels.move}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
