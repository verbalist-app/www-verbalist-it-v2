/**
 * Tipi allineati 1:1 ai contratti del Job Manager (python_backend).
 * Fonti: endpoints/task_monitoring_endpoints.py, endpoints/results_enpoints.py,
 * models/tasks.py. Se cambia lo schema a backend, aggiornare qui.
 */

// models/tasks.py → RunStatus (8 stati)
export type RunStatus =
  | "QUEUED"
  | "PENDING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | "BLOCKED"
  | "PAUSED"

export const RUN_STATUSES: RunStatus[] = [
  "QUEUED",
  "PENDING",
  "RUNNING",
  "SUCCEEDED",
  "FAILED",
  "CANCELED",
  "BLOCKED",
  "PAUSED",
]

// stati terminali: il worker non li rimette più in coda
export const TERMINAL_STATUSES: RunStatus[] = ["SUCCEEDED", "FAILED", "CANCELED"]

// models/tasks.py → TaskKind
export type TaskKind = "IMPROVE_SERP" | "GENERATE_SERP" | "GENERIC" | "GENERATE_MEDIA"

export const TASK_KINDS: TaskKind[] = [
  "GENERATE_SERP",
  "IMPROVE_SERP",
  "GENERATE_MEDIA",
  "GENERIC",
]

// models/tasks.py → SubTaskKind
export type SubTaskKind =
  | "GET_DATAFORSEO_TOP_10"
  | "RESOLVE_CUSTOM_URLS"
  | "SCRAPE"
  | "CREATE_SCRAPE_TASKS"
  | "WAIT_BARRIER"
  | "SERP_ANALYSIS"
  | "SERP_IMPROVEMENT"
  | "SERP_GENERATION"
  | "RETRIEVE_MEDIA_SUGGESTIONS"
  | "CREATE_IMAGE_TASKS"
  | "IMAGE_GENERATION"
  | "MEDIA_AGGREGATION"

export type DependencyType = "hard" | "soft" | "barrier"

// GET /monitor/system/stats
export interface SystemStats {
  total_tasks: number
  active_tasks: number
  queued_tasks: number
  failed_tasks: number
  avg_completion_time: number // secondi
  tasks_last_hour: number
  worker_count: number
}

// GET /monitor/workers/stats
export interface WorkerStats {
  worker_id: string
  tasks_processed: number
  avg_duration: number
  succeeded: number
  failed: number
  success_rate: number
  last_activity: string
}

// GET /monitor/tasks/search
export interface TaskSearchRow {
  id: string
  name: string | null
  kind: TaskKind
  status: RunStatus
  created_at: string
  params: Record<string, unknown>
}

// GET /monitor/tasks/{id}/overview
export interface TaskOverview {
  id: string
  name: string | null
  kind: TaskKind
  status: RunStatus
  priority: number
  created_at: string
  started_at: string | null
  finished_at: string | null
  total_subtasks: number
  completed_subtasks: number
  failed_subtasks: number
  running_subtasks: number
  duration_seconds: number | null
  progress_percent: number
}

// GET /monitor/tasks/{id}/status → SubtaskStatus
export interface SubtaskStatus {
  id: string
  kind: SubTaskKind
  status: RunStatus
  ordinal: number
  message: string
  started_at: string | null
  finished_at: string | null
  error: string | null
}

// GET /monitor/tasks/{id}/status
export interface TaskStatusResponse {
  task_id: string
  task_status: RunStatus
  task_kind: TaskKind
  current_step: string | null
  current_message: string | null
  aggregated_messages: Record<string, string>
  progress_percent: number
  error: string | null
  subtasks: SubtaskStatus[]
}

// GET /monitor/tasks/{id}/graph
export interface GraphNode {
  id: string
  label: string
  status: RunStatus
  payload: Record<string, unknown>
}
export interface GraphEdge {
  from: string
  to: string
  type: DependencyType
}
export interface PipelineGraph {
  task_id: string
  nodes: GraphNode[]
  edges: GraphEdge[]
}

// GET /monitor/tasks/{id}/timeline
export interface TimelineEvent {
  timestamp: string
  kind: string
  message: string | null
  subtask_id: string | null
}

// token usage (models/tasks.py: Subtask.token_usage)
export interface TokenUsage {
  input_tokens: number
  output_tokens: number
  total_tokens: number
}

// GET /results/tasks/{id}/subtasks → riga subtask con costo
export interface SubtaskResult {
  id: string
  kind: SubTaskKind
  status: RunStatus
  ordinal: number
  attempt: number
  result: Record<string, unknown> | null
  error: string | null
  started_at: string | null
  finished_at: string | null
  token_usage: TokenUsage | null
  model_used: string | null
}

export interface TaskSubtasksResult {
  task_id: string
  task_status: RunStatus
  subtasks: SubtaskResult[]
}

// filtri per la lista task
export interface TaskSearchFilters {
  keyword?: string
  status?: RunStatus
  kind?: TaskKind
  limit?: number
}
