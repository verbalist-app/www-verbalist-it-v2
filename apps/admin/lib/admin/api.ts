/**
 * Client tipizzato verso il Job Manager.
 *
 * - Se NEXT_PUBLIC_JOB_MANAGER_URL è impostata → chiama il backend reale
 *   (monitoring sotto /monitor, risultati sotto /results).
 * - Altrimenti → ritorna i dati finti di mock.ts, così la dashboard gira
 *   in locale senza dipendere dal backend.
 *
 * Nota: il backend oggi NON ha autenticazione (vedi README). Quando verrà
 * aggiunta, passare qui l'header/token in `authHeaders()`.
 */
import {
  MOCK_SYSTEM,
  MOCK_TASKS,
  MOCK_WORKERS,
  getMockDetail,
} from "./mock"
import type {
  PipelineGraph,
  SystemStats,
  TaskOverview,
  TaskSearchFilters,
  TaskSearchRow,
  TaskStatusResponse,
  TaskSubtasksResult,
  TimelineEvent,
  WorkerStats,
} from "./types"

const API_BASE = (process.env.NEXT_PUBLIC_JOB_MANAGER_URL ?? "").replace(/\/$/, "")

export const IS_MOCK = API_BASE === ""

function authHeaders(): Record<string, string> {
  // segnaposto: quando il backend avrà auth, aggiungere qui il token
  return { "Content-Type": "application/json" }
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders(), cache: "no-store" })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json() as Promise<T>
}

async function mutate(path: string, method: "POST" | "DELETE"): Promise<{ ok: boolean; message?: string }> {
  if (IS_MOCK) return { ok: true, message: "Azione simulata (backend non collegato)" }
  const res = await fetch(`${API_BASE}${path}`, { method, headers: authHeaders() })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body?.detail ?? `${method} ${path} → ${res.status}`)
  return { ok: true, message: body?.message }
}

// ---- letture (monitoring) ----

export async function getSystemStats(): Promise<SystemStats> {
  if (IS_MOCK) return MOCK_SYSTEM
  return get<SystemStats>("/monitor/system/stats")
}

export async function getWorkers(): Promise<WorkerStats[]> {
  if (IS_MOCK) return MOCK_WORKERS
  return get<WorkerStats[]>("/monitor/workers/stats")
}

export async function searchTasks(filters: TaskSearchFilters = {}): Promise<TaskSearchRow[]> {
  if (IS_MOCK) {
    const k = filters.keyword?.toLowerCase().trim()
    return MOCK_TASKS.filter((t) => {
      if (filters.status && t.status !== filters.status) return false
      if (filters.kind && t.kind !== filters.kind) return false
      if (k && !(t.name ?? "").toLowerCase().includes(k)) return false
      return true
    }).slice(0, filters.limit ?? 20)
  }
  const q = new URLSearchParams()
  if (filters.keyword) q.set("keyword", filters.keyword)
  if (filters.status) q.set("status", filters.status)
  if (filters.kind) q.set("kind", filters.kind)
  q.set("limit", String(filters.limit ?? 20))
  return get<TaskSearchRow[]>(`/monitor/tasks/search?${q.toString()}`)
}

export async function getTaskOverview(id: string): Promise<TaskOverview> {
  if (IS_MOCK) return getMockDetail(id).overview
  return get<TaskOverview>(`/monitor/tasks/${id}/overview`)
}

export async function getTaskStatus(id: string, lang = "it"): Promise<TaskStatusResponse> {
  if (IS_MOCK) return getMockDetail(id).status
  return get<TaskStatusResponse>(`/monitor/tasks/${id}/status?lang=${lang}`)
}

export async function getTaskGraph(id: string): Promise<PipelineGraph> {
  if (IS_MOCK) return getMockDetail(id).graph
  return get<PipelineGraph>(`/monitor/tasks/${id}/graph`)
}

export async function getTaskTimeline(id: string): Promise<TimelineEvent[]> {
  if (IS_MOCK) return getMockDetail(id).timeline
  return get<TimelineEvent[]>(`/monitor/tasks/${id}/timeline`)
}

// token e costi arrivano dal router /results, non da /monitor
export async function getTaskSubtasks(id: string): Promise<TaskSubtasksResult> {
  if (IS_MOCK) return getMockDetail(id).subtasks
  return get<TaskSubtasksResult>(`/results/tasks/${id}/subtasks`)
}

// ---- azioni (mutations) ----

export function retryTask(id: string) {
  return mutate(`/monitor/tasks/${id}/retry`, "POST")
}
export function pauseTask(id: string) {
  return mutate(`/monitor/tasks/${id}/pause`, "POST")
}
export function resumeTask(id: string) {
  return mutate(`/monitor/tasks/${id}/resume`, "POST")
}
export function cancelTask(id: string) {
  return mutate(`/monitor/tasks/${id}`, "DELETE")
}
