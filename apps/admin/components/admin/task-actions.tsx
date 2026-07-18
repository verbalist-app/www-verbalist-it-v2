"use client"

import * as React from "react"
import { toast } from "sonner"
import { RotateCcw, Pause, Play, Ban, MoreHorizontal, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { retryTask, pauseTask, resumeTask, cancelTask } from "@/lib/admin/api"
import type { RunStatus } from "@/lib/admin/types"

type ActionFn = (id: string) => Promise<{ ok: boolean; message?: string }>

interface Props {
  taskId: string
  status: RunStatus
  onDone?: () => void
  compact?: boolean
}

function canPause(s: RunStatus) {
  return s === "RUNNING" || s === "QUEUED" || s === "PENDING" || s === "BLOCKED"
}
function canResume(s: RunStatus) {
  return s === "PAUSED"
}
function canRetry(s: RunStatus) {
  return s === "FAILED"
}
function canCancel(s: RunStatus) {
  return s !== "SUCCEEDED" && s !== "CANCELED"
}

export function TaskActions({ taskId, status, onDone, compact = false }: Props) {
  const [pending, setPending] = React.useState(false)
  const [confirmCancel, setConfirmCancel] = React.useState(false)

  const run = React.useCallback(
    async (fn: ActionFn, okMsg: string) => {
      setPending(true)
      try {
        const res = await fn(taskId)
        toast.success(res.message || okMsg)
        onDone?.()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Azione non riuscita")
      } finally {
        setPending(false)
      }
    },
    [taskId, onDone],
  )

  const showPause = canPause(status)
  const showResume = canResume(status)
  const showRetry = canRetry(status)
  const showCancel = canCancel(status)
  const nothing = !showPause && !showResume && !showRetry && !showCancel

  const cancelDialog = (
    <AlertDialog open={confirmCancel} onOpenChange={setConfirmCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Annullare il task?</AlertDialogTitle>
          <AlertDialogDescription>
            I subtask in coda o in esecuzione verranno interrotti. L'operazione non è reversibile.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Torna indietro</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => run(cancelTask, "Task annullato")}
            className="bg-status-error text-white hover:bg-status-error/90"
          >
            Annulla task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  if (compact) {
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8" disabled={pending} aria-label="Azioni">
              {pending ? <Loader className="size-4 animate-spin" /> : <MoreHorizontal className="size-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {showRetry && (
              <DropdownMenuItem onClick={() => run(retryTask, "Subtask falliti rimessi in coda")}>
                <RotateCcw className="mr-2 size-4" /> Riprova
              </DropdownMenuItem>
            )}
            {showPause && (
              <DropdownMenuItem onClick={() => run(pauseTask, "Task in pausa")}>
                <Pause className="mr-2 size-4" /> Metti in pausa
              </DropdownMenuItem>
            )}
            {showResume && (
              <DropdownMenuItem onClick={() => run(resumeTask, "Task ripreso")}>
                <Play className="mr-2 size-4" /> Riprendi
              </DropdownMenuItem>
            )}
            {showCancel && (
              <>
                {(showRetry || showPause || showResume) && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={() => setConfirmCancel(true)}
                  className="text-status-error focus:text-status-error"
                >
                  <Ban className="mr-2 size-4" /> Annulla
                </DropdownMenuItem>
              </>
            )}
            {nothing && <DropdownMenuItem disabled>Nessuna azione</DropdownMenuItem>}
          </DropdownMenuContent>
        </DropdownMenu>
        {cancelDialog}
      </>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {showRetry && (
          <Button variant="outline" size="sm" disabled={pending} onClick={() => run(retryTask, "Subtask falliti rimessi in coda")}>
            <RotateCcw className="mr-1.5 size-4" /> Riprova
          </Button>
        )}
        {showPause && (
          <Button variant="outline" size="sm" disabled={pending} onClick={() => run(pauseTask, "Task in pausa")}>
            <Pause className="mr-1.5 size-4" /> Pausa
          </Button>
        )}
        {showResume && (
          <Button variant="outline" size="sm" disabled={pending} onClick={() => run(resumeTask, "Task ripreso")}>
            <Play className="mr-1.5 size-4" /> Riprendi
          </Button>
        )}
        {showCancel && (
          <Button variant="ghost" size="sm" disabled={pending} onClick={() => setConfirmCancel(true)} className="text-status-error hover:text-status-error">
            <Ban className="mr-1.5 size-4" /> Annulla
          </Button>
        )}
        {nothing && <span className="text-sm text-muted-foreground">Nessuna azione disponibile</span>}
      </div>
      {cancelDialog}
    </>
  )
}
