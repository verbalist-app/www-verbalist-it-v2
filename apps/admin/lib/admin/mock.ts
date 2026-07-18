/**
 * Dati finti per far girare la dashboard senza backend collegato.
 * I timestamp sono stringhe ISO fisse (niente new Date()) così il render
 * server e client coincidono e non ci sono mismatch di hydration.
 *
 * Quando NEXT_PUBLIC_JOB_MANAGER_URL è impostata, il client API ignora
 * questo file e chiama il vero Job Manager.
 */
import type {
  PipelineGraph,
  SubtaskResult,
  SystemStats,
  TaskOverview,
  TaskSearchRow,
  TaskStatusResponse,
  TaskSubtasksResult,
  TimelineEvent,
  WorkerStats,
} from "./types"

export const MOCK_SYSTEM: SystemStats = {
  total_tasks: 428,
  active_tasks: 3,
  queued_tasks: 5,
  failed_tasks: 12,
  avg_completion_time: 214, // secondi
  tasks_last_hour: 9,
  worker_count: 1, // worker-1 con un subtask in lock adesso
}

/**
 * Nella realtà /monitor/workers/stats torna quasi sempre vuoto: la view
 * raggruppa per locked_by, ma locked_by viene azzerato a fine subtask.
 * Lasciamo l'array vuoto apposta, così la UI mostra lo stato "vuoto"
 * con la spiegazione (vedi README, richiesta #4 a Niccolò).
 */
export const MOCK_WORKERS: WorkerStats[] = []

// task completati per ora, ultime 24h (per il grafico throughput)
export const MOCK_THROUGHPUT: { hour: string; completati: number; falliti: number }[] = [
  { hour: "10:00", completati: 4, falliti: 0 },
  { hour: "11:00", completati: 6, falliti: 1 },
  { hour: "12:00", completati: 3, falliti: 0 },
  { hour: "13:00", completati: 2, falliti: 0 },
  { hour: "14:00", completati: 5, falliti: 1 },
  { hour: "15:00", completati: 8, falliti: 0 },
  { hour: "16:00", completati: 7, falliti: 2 },
  { hour: "17:00", completati: 5, falliti: 0 },
  { hour: "18:00", completati: 3, falliti: 0 },
  { hour: "19:00", completati: 1, falliti: 0 },
  { hour: "20:00", completati: 2, falliti: 1 },
  { hour: "21:00", completati: 4, falliti: 0 },
  { hour: "22:00", completati: 6, falliti: 0 },
  { hour: "23:00", completati: 5, falliti: 1 },
  { hour: "00:00", completati: 2, falliti: 0 },
  { hour: "01:00", completati: 1, falliti: 0 },
  { hour: "02:00", completati: 0, falliti: 0 },
  { hour: "03:00", completati: 1, falliti: 0 },
  { hour: "04:00", completati: 2, falliti: 0 },
  { hour: "05:00", completati: 3, falliti: 0 },
  { hour: "06:00", completati: 5, falliti: 1 },
  { hour: "07:00", completati: 7, falliti: 0 },
  { hour: "08:00", completati: 8, falliti: 1 },
  { hour: "09:00", completati: 9, falliti: 0 },
]

const A = "a1111111-1111-4111-8111-111111111111"
const B = "b2222222-2222-4222-8222-222222222222"
const C = "c3333333-3333-4333-8333-333333333333"
const D = "d4444444-4444-4444-8444-444444444444"
const E = "e5555555-5555-4555-8555-555555555555"
const F = "f6666666-6666-4666-8666-666666666666"

export const MOCK_TASKS: TaskSearchRow[] = [
  {
    id: A,
    name: "migliori scarpe running 2026",
    kind: "GENERATE_SERP",
    status: "RUNNING",
    created_at: "2026-07-18T09:28:11Z",
    params: { keyword: "migliori scarpe running 2026", content_type: "blog_post", language_code: "IT" },
  },
  {
    id: D,
    name: "infografica energia sostenibile",
    kind: "GENERATE_MEDIA",
    status: "QUEUED",
    created_at: "2026-07-18T09:30:02Z",
    params: { keyword: "energia sostenibile" },
  },
  {
    id: E,
    name: "guida marketing B2B",
    kind: "IMPROVE_SERP",
    status: "PAUSED",
    created_at: "2026-07-18T09:12:45Z",
    params: { keyword: "marketing B2B", content_url: "https://esempio.it/guida-b2b" },
  },
  {
    id: C,
    name: "prezzi pannelli solari",
    kind: "GENERATE_SERP",
    status: "FAILED",
    created_at: "2026-07-18T08:51:20Z",
    params: { keyword: "prezzi pannelli solari", content_type: "guide", language_code: "IT" },
  },
  {
    id: B,
    name: "come scegliere un CRM",
    kind: "IMPROVE_SERP",
    status: "SUCCEEDED",
    created_at: "2026-07-18T08:40:03Z",
    params: { keyword: "come scegliere un CRM", content_type: "blog_post", language_code: "IT" },
  },
  {
    id: F,
    name: "ricette senza glutine",
    kind: "GENERATE_SERP",
    status: "SUCCEEDED",
    created_at: "2026-07-18T08:05:33Z",
    params: { keyword: "ricette senza glutine", content_type: "blog_post", language_code: "IT" },
  },
]

interface MockDetail {
  overview: TaskOverview
  status: TaskStatusResponse
  graph: PipelineGraph
  timeline: TimelineEvent[]
  subtasks: TaskSubtasksResult
}

// --- Task A: GENERATE_SERP in esecuzione (scraping in corso) ---
const detailA: MockDetail = {
  overview: {
    id: A,
    name: "migliori scarpe running 2026",
    kind: "GENERATE_SERP",
    status: "RUNNING",
    priority: 0,
    created_at: "2026-07-18T09:28:11Z",
    started_at: "2026-07-18T09:28:40Z",
    finished_at: null,
    total_subtasks: 9,
    completed_subtasks: 3,
    failed_subtasks: 0,
    running_subtasks: 2,
    duration_seconds: 200,
    progress_percent: 33.33,
  },
  status: {
    task_id: A,
    task_status: "RUNNING",
    task_kind: "GENERATE_SERP",
    current_step: "SCRAPE",
    current_message: "3/5 pagine scaricate",
    aggregated_messages: { SCRAPE: "3/5 pagine scaricate" },
    progress_percent: 37.5,
    error: null,
    subtasks: [
      {
        id: A + "-s1",
        kind: "GET_DATAFORSEO_TOP_10",
        status: "SUCCEEDED",
        ordinal: 0,
        message: "Trovati 10 risultati per 'migliori scarpe running 2026'",
        started_at: "2026-07-18T09:28:41Z",
        finished_at: "2026-07-18T09:29:02Z",
        error: null,
      },
      {
        id: A + "-s2",
        kind: "SCRAPE",
        status: "RUNNING",
        ordinal: 2,
        message: "3/5 pagine scaricate",
        started_at: "2026-07-18T09:29:05Z",
        finished_at: null,
        error: null,
      },
      {
        id: A + "-s3",
        kind: "SERP_ANALYSIS",
        status: "BLOCKED",
        ordinal: 6,
        message: "In attesa di analizzare i competitor...",
        started_at: null,
        finished_at: null,
        error: null,
      },
      {
        id: A + "-s4",
        kind: "SERP_GENERATION",
        status: "BLOCKED",
        ordinal: 7,
        message: "In attesa di generare il contenuto...",
        started_at: null,
        finished_at: null,
        error: null,
      },
    ],
  },
  graph: {
    task_id: A,
    nodes: [
      { id: A + "-s1", label: "GET_DATAFORSEO_TOP_10 #0", status: "SUCCEEDED", payload: {} },
      { id: A + "-sc", label: "CREATE_SCRAPE_TASKS #1", status: "SUCCEEDED", payload: {} },
      { id: A + "-s2", label: "SCRAPE #2", status: "RUNNING", payload: { url: "https://esempio.it/a" } },
      { id: A + "-wb", label: "WAIT_BARRIER #5", status: "BLOCKED", payload: {} },
      { id: A + "-s3", label: "SERP_ANALYSIS #6", status: "BLOCKED", payload: {} },
      { id: A + "-s4", label: "SERP_GENERATION #7", status: "BLOCKED", payload: {} },
    ],
    edges: [
      { from: A + "-s1", to: A + "-sc", type: "hard" },
      { from: A + "-sc", to: A + "-s2", type: "hard" },
      { from: A + "-s2", to: A + "-wb", type: "barrier" },
      { from: A + "-wb", to: A + "-s3", type: "hard" },
      { from: A + "-s3", to: A + "-s4", type: "hard" },
    ],
  },
  timeline: [
    { timestamp: "2026-07-18T09:29:05Z", kind: "started", message: "claimed by worker-1", subtask_id: A + "-s2" },
    { timestamp: "2026-07-18T09:29:02Z", kind: "succeeded", message: null, subtask_id: A + "-s1" },
    { timestamp: "2026-07-18T09:28:41Z", kind: "started", message: "claimed by worker-1", subtask_id: A + "-s1" },
    { timestamp: "2026-07-18T09:28:40Z", kind: "queued", message: "task queued", subtask_id: null },
    { timestamp: "2026-07-18T09:28:11Z", kind: "created", message: "task created", subtask_id: null },
  ],
  subtasks: {
    task_id: A,
    task_status: "RUNNING",
    subtasks: [
      {
        id: A + "-s1",
        kind: "GET_DATAFORSEO_TOP_10",
        status: "SUCCEEDED",
        ordinal: 0,
        attempt: 0,
        result: { urls: 10 },
        error: null,
        started_at: "2026-07-18T09:28:41Z",
        finished_at: "2026-07-18T09:29:02Z",
        token_usage: null,
        model_used: null,
      },
      {
        id: A + "-s2",
        kind: "SCRAPE",
        status: "RUNNING",
        ordinal: 2,
        attempt: 0,
        result: null,
        error: null,
        started_at: "2026-07-18T09:29:05Z",
        finished_at: null,
        token_usage: null,
        model_used: null,
      },
    ],
  },
}

// --- Task B: IMPROVE_SERP completato, con token e modelli ---
const detailB: MockDetail = {
  overview: {
    id: B,
    name: "come scegliere un CRM",
    kind: "IMPROVE_SERP",
    status: "SUCCEEDED",
    priority: 0,
    created_at: "2026-07-18T08:40:03Z",
    started_at: "2026-07-18T08:40:20Z",
    finished_at: "2026-07-18T08:43:55Z",
    total_subtasks: 8,
    completed_subtasks: 8,
    failed_subtasks: 0,
    running_subtasks: 0,
    duration_seconds: 215,
    progress_percent: 100,
  },
  status: {
    task_id: B,
    task_status: "SUCCEEDED",
    task_kind: "IMPROVE_SERP",
    current_step: null,
    current_message: null,
    aggregated_messages: { SCRAPE: "5/5 pagine scaricate" },
    progress_percent: 100,
    error: null,
    subtasks: [
      { id: B + "-s1", kind: "GET_DATAFORSEO_TOP_10", status: "SUCCEEDED", ordinal: 0, message: "Trovati 10 risultati per 'come scegliere un CRM'", started_at: "2026-07-18T08:40:21Z", finished_at: "2026-07-18T08:40:40Z", error: null },
      { id: B + "-s2", kind: "SCRAPE", status: "SUCCEEDED", ordinal: 2, message: "5/5 pagine scaricate", started_at: "2026-07-18T08:40:42Z", finished_at: "2026-07-18T08:41:30Z", error: null },
      { id: B + "-s3", kind: "SERP_ANALYSIS", status: "SUCCEEDED", ordinal: 6, message: "Analisi completata per 'come scegliere un CRM'", started_at: "2026-07-18T08:41:32Z", finished_at: "2026-07-18T08:42:20Z", error: null },
      { id: B + "-s4", kind: "SERP_IMPROVEMENT", status: "SUCCEEDED", ordinal: 7, message: "Contenuto ottimizzato per 'come scegliere un CRM'", started_at: "2026-07-18T08:42:22Z", finished_at: "2026-07-18T08:43:55Z", error: null },
    ],
  },
  graph: {
    task_id: B,
    nodes: [
      { id: B + "-s1", label: "GET_DATAFORSEO_TOP_10 #0", status: "SUCCEEDED", payload: {} },
      { id: B + "-s2", label: "SCRAPE #2", status: "SUCCEEDED", payload: {} },
      { id: B + "-s3", label: "SERP_ANALYSIS #6", status: "SUCCEEDED", payload: {} },
      { id: B + "-s4", label: "SERP_IMPROVEMENT #7", status: "SUCCEEDED", payload: {} },
    ],
    edges: [
      { from: B + "-s1", to: B + "-s2", type: "hard" },
      { from: B + "-s2", to: B + "-s3", type: "barrier" },
      { from: B + "-s3", to: B + "-s4", type: "hard" },
    ],
  },
  timeline: [
    { timestamp: "2026-07-18T08:43:55Z", kind: "task_succeeded", message: "all subtasks done (8 terminal)", subtask_id: null },
    { timestamp: "2026-07-18T08:43:55Z", kind: "succeeded", message: null, subtask_id: B + "-s4" },
    { timestamp: "2026-07-18T08:42:22Z", kind: "started", message: "claimed by worker-1", subtask_id: B + "-s4" },
    { timestamp: "2026-07-18T08:42:20Z", kind: "succeeded", message: null, subtask_id: B + "-s3" },
    { timestamp: "2026-07-18T08:40:03Z", kind: "created", message: "task created", subtask_id: null },
  ],
  subtasks: {
    task_id: B,
    task_status: "SUCCEEDED",
    subtasks: [
      { id: B + "-s1", kind: "GET_DATAFORSEO_TOP_10", status: "SUCCEEDED", ordinal: 0, attempt: 0, result: { urls: 10 }, error: null, started_at: "2026-07-18T08:40:21Z", finished_at: "2026-07-18T08:40:40Z", token_usage: null, model_used: null },
      { id: B + "-s3", kind: "SERP_ANALYSIS", status: "SUCCEEDED", ordinal: 6, attempt: 0, result: { entities: 24 }, error: null, started_at: "2026-07-18T08:41:32Z", finished_at: "2026-07-18T08:42:20Z", token_usage: { input_tokens: 18450, output_tokens: 3200, total_tokens: 21650 }, model_used: "google_genai:gemini-3.1-pro-preview" },
      { id: B + "-s4", kind: "SERP_IMPROVEMENT", status: "SUCCEEDED", ordinal: 7, attempt: 0, result: { words: 1420 }, error: null, started_at: "2026-07-18T08:42:22Z", finished_at: "2026-07-18T08:43:55Z", token_usage: { input_tokens: 42800, output_tokens: 8600, total_tokens: 51400 }, model_used: "claude-opus-4-7" },
    ],
  },
}

// --- Task C: GENERATE_SERP fallito ---
const detailC: MockDetail = {
  overview: {
    id: C,
    name: "prezzi pannelli solari",
    kind: "GENERATE_SERP",
    status: "FAILED",
    priority: 0,
    created_at: "2026-07-18T08:51:20Z",
    started_at: "2026-07-18T08:51:35Z",
    finished_at: "2026-07-18T08:53:10Z",
    total_subtasks: 4,
    completed_subtasks: 1,
    failed_subtasks: 1,
    running_subtasks: 0,
    duration_seconds: 95,
    progress_percent: 25,
  },
  status: {
    task_id: C,
    task_status: "FAILED",
    task_kind: "GENERATE_SERP",
    current_step: null,
    current_message: null,
    aggregated_messages: {},
    progress_percent: 50,
    error: "[SERP_ANALYSIS] Timeout dopo 600s in attesa della risposta LLM",
    subtasks: [
      { id: C + "-s1", kind: "GET_DATAFORSEO_TOP_10", status: "SUCCEEDED", ordinal: 0, message: "Trovati 10 risultati per 'prezzi pannelli solari'", started_at: "2026-07-18T08:51:36Z", finished_at: "2026-07-18T08:51:58Z", error: null },
      { id: C + "-s2", kind: "SERP_ANALYSIS", status: "FAILED", ordinal: 6, message: "Errore nell'analisi per 'prezzi pannelli solari'", started_at: "2026-07-18T08:52:00Z", finished_at: "2026-07-18T08:53:10Z", error: "Timeout dopo 600s in attesa della risposta LLM" },
    ],
  },
  graph: {
    task_id: C,
    nodes: [
      { id: C + "-s1", label: "GET_DATAFORSEO_TOP_10 #0", status: "SUCCEEDED", payload: {} },
      { id: C + "-s2", label: "SERP_ANALYSIS #6", status: "FAILED", payload: {} },
      { id: C + "-s3", label: "SERP_GENERATION #7", status: "BLOCKED", payload: {} },
    ],
    edges: [
      { from: C + "-s1", to: C + "-s2", type: "hard" },
      { from: C + "-s2", to: C + "-s3", type: "hard" },
    ],
  },
  timeline: [
    { timestamp: "2026-07-18T08:53:10Z", kind: "task_failed", message: "[SERP_ANALYSIS] Timeout dopo 600s", subtask_id: null },
    { timestamp: "2026-07-18T08:53:10Z", kind: "failed", message: "Timeout dopo 600s in attesa della risposta LLM", subtask_id: C + "-s2" },
    { timestamp: "2026-07-18T08:52:00Z", kind: "started", message: "claimed by worker-1", subtask_id: C + "-s2" },
    { timestamp: "2026-07-18T08:51:20Z", kind: "created", message: "task created", subtask_id: null },
  ],
  subtasks: {
    task_id: C,
    task_status: "FAILED",
    subtasks: [
      { id: C + "-s1", kind: "GET_DATAFORSEO_TOP_10", status: "SUCCEEDED", ordinal: 0, attempt: 0, result: { urls: 10 }, error: null, started_at: "2026-07-18T08:51:36Z", finished_at: "2026-07-18T08:51:58Z", token_usage: null, model_used: null },
      { id: C + "-s2", kind: "SERP_ANALYSIS", status: "FAILED", ordinal: 6, attempt: 3, result: null, error: "Timeout dopo 600s in attesa della risposta LLM", started_at: "2026-07-18T08:52:00Z", finished_at: "2026-07-18T08:53:10Z", token_usage: null, model_used: "google_genai:gemini-3.1-pro-preview" },
    ],
  },
}

const DETAILS: Record<string, MockDetail> = { [A]: detailA, [B]: detailB, [C]: detailC }

/** costruisce un dettaglio minimo per i task senza dati espliciti (D, E, F) */
function buildFallbackDetail(row: TaskSearchRow): MockDetail {
  const finished = row.status === "SUCCEEDED" || row.status === "FAILED" || row.status === "CANCELED"
  return {
    overview: {
      id: row.id,
      name: row.name,
      kind: row.kind,
      status: row.status,
      priority: 0,
      created_at: row.created_at,
      started_at: row.status === "QUEUED" || row.status === "PENDING" ? null : row.created_at,
      finished_at: finished ? row.created_at : null,
      total_subtasks: 4,
      completed_subtasks: row.status === "SUCCEEDED" ? 4 : 0,
      failed_subtasks: row.status === "FAILED" ? 1 : 0,
      running_subtasks: row.status === "RUNNING" ? 1 : 0,
      duration_seconds: finished ? 180 : null,
      progress_percent: row.status === "SUCCEEDED" ? 100 : 0,
    },
    status: {
      task_id: row.id,
      task_status: row.status,
      task_kind: row.kind,
      current_step: null,
      current_message: null,
      aggregated_messages: {},
      progress_percent: row.status === "SUCCEEDED" ? 100 : 0,
      error: null,
      subtasks: [],
    },
    graph: { task_id: row.id, nodes: [], edges: [] },
    timeline: [{ timestamp: row.created_at, kind: "created", message: "task created", subtask_id: null }],
    subtasks: { task_id: row.id, task_status: row.status, subtasks: [] },
  }
}

export function getMockDetail(id: string): MockDetail {
  if (DETAILS[id]) return DETAILS[id]
  const row = MOCK_TASKS.find((t) => t.id === id)
  if (row) return buildFallbackDetail(row)
  // id sconosciuto: dettaglio vuoto ma valido
  return buildFallbackDetail({
    id,
    name: null,
    kind: "GENERIC",
    status: "PENDING",
    created_at: "2026-07-18T09:00:00Z",
    params: {},
  })
}
