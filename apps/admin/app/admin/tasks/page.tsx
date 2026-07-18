"use client"

import * as React from "react"
import Link from "next/link"
import { Search, RefreshCw, X } from "lucide-react"
import { PageDescription, PageHeading } from "@/components/ui/page-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/admin/status-badge"
import { TaskActions } from "@/components/admin/task-actions"
import { searchTasks } from "@/lib/admin/api"
import { RUN_STATUSES, TASK_KINDS, type RunStatus, type TaskKind, type TaskSearchRow } from "@/lib/admin/types"
import { getStatusConfig, taskKindLabel } from "@/lib/status"
import { formatDateTime } from "@/lib/admin/format"

const ALL = "ALL"

export default function TasksPage() {
  const [keyword, setKeyword] = React.useState("")
  const [debounced, setDebounced] = React.useState("")
  const [status, setStatus] = React.useState<RunStatus | typeof ALL>(ALL)
  const [kind, setKind] = React.useState<TaskKind | typeof ALL>(ALL)
  const [rows, setRows] = React.useState<TaskSearchRow[] | null>(null)
  const [loading, setLoading] = React.useState(true)

  // debounce keyword
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(keyword), 350)
    return () => clearTimeout(t)
  }, [keyword])

  const load = React.useCallback(async () => {
    setLoading(true)
    try {
      const data = await searchTasks({
        keyword: debounced || undefined,
        status: status === ALL ? undefined : status,
        kind: kind === ALL ? undefined : kind,
        limit: 50,
      })
      setRows(data)
    } finally {
      setLoading(false)
    }
  }, [debounced, status, kind])

  React.useEffect(() => {
    load()
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [load])

  const hasFilters = keyword !== "" || status !== ALL || kind !== ALL
  const reset = () => {
    setKeyword("")
    setStatus(ALL)
    setKind(ALL)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <PageHeading>Task</PageHeading>
          <PageDescription>Cerca, filtra e gestisci i task del backend.</PageDescription>
        </div>
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
          <span className="ml-1.5 hidden sm:inline">Aggiorna</span>
        </Button>
      </div>

      {/* Filtri */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cerca per keyword..."
            className="pl-8"
          />
        </div>
        <Select value={status} onValueChange={(v) => setStatus(v as RunStatus | typeof ALL)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Stato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Tutti gli stati</SelectItem>
            {RUN_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {getStatusConfig(s).label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={kind} onValueChange={(v) => setKind(v as TaskKind | typeof ALL)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Tutti i tipi</SelectItem>
            {TASK_KINDS.map((k) => (
              <SelectItem key={k} value={k}>
                {taskKindLabel(k)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <X className="size-4" />
            <span className="ml-1 hidden sm:inline">Azzera</span>
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Keyword</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Creato</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {!rows ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Nessun task corrisponde ai filtri.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="max-w-[260px] truncate font-medium">
                      <Link href={`/admin/tasks/${t.id}`} className="hover:underline">
                        {t.name ?? t.id}
                      </Link>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{taskKindLabel(t.kind)}</TableCell>
                    <TableCell>
                      <StatusBadge status={t.status} />
                    </TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                      {formatDateTime(t.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <TaskActions taskId={t.id} status={t.status} onDone={load} compact />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Nota: l'endpoint <code className="font-mono">/monitor/tasks/search</code> non pagina né ordina i risultati
        (limite 100). Ordinamento e paginazione lato server sono nella richiesta #3 a Niccolò.
      </p>
    </div>
  )
}
