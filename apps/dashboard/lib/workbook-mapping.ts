import type { WorkbookSheet } from "./xlsx-reader"
import { validateRows, type BatchPipeline, type ParsedRow } from "./batches"

/**
 * Trasforma i fogli letti da un file in righe del lotto.
 * Riconosce due layout:
 * - "template": il template Verbalist (foglio con intestazioni Pagina, Sezione, Testo attuale,
 *   Keyword principale, Keyword secondarie). Più fogli con quel layout si sommano.
 * - "client": il formato usato da Bonfiglioli, un foglio per pagina con la sezione in colonna A,
 *   il testo in una colonna "Proposta ..." e le keyword in una colonna "Keywords"
 *   (una per riga di cella o separate da punto e virgola).
 * I fogli senza intestazioni riconoscibili (per esempio "Istruzioni") vengono ignorati.
 */

export type WorkbookLayout = "template" | "client"

export interface WorkbookImport {
  rows: ParsedRow[]
  layout: WorkbookLayout | null
  sheetsUsed: string[]
  sheetsSkipped: string[]
}

const norm = (value: string | undefined) => (value ?? "").replace(/\s+/g, " ").trim().toLowerCase()
const clean = (value: string | undefined) =>
  (value ?? "").replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim()
const splitKeywords = (value: string | undefined) =>
  clean(value)
    .split(/[\n;]+/)
    .map((k) => k.trim())
    .filter(Boolean)

function findColumn(header: string[], test: (cell: string) => boolean): number {
  return header.findIndex((cell) => test(norm(cell)))
}

function importTemplateSheet(sheet: WorkbookSheet): ParsedRow[] | null {
  const header = sheet.rows[0] ?? []
  const pageCol = findColumn(header, (h) => h.startsWith("pagina"))
  const sectionCol = findColumn(header, (h) => h.startsWith("sezione"))
  if (pageCol < 0 || sectionCol < 0) return null
  const textCol = findColumn(header, (h) => h.startsWith("testo"))
  const briefCol = findColumn(header, (h) => h.startsWith("brief"))
  const keywordCol = findColumn(header, (h) => h.startsWith("keyword principale") || h === "keyword")
  const secondaryCol = findColumn(header, (h) => h.startsWith("keyword secondarie"))

  const rows: ParsedRow[] = []
  sheet.rows.slice(1).forEach((cells, index) => {
    const page = clean(cells[pageCol])
    const section = clean(cells[sectionCol])
    const text = clean(textCol >= 0 ? cells[textCol] : briefCol >= 0 ? cells[briefCol] : "")
    const keyword = keywordCol >= 0 ? clean(cells[keywordCol]) : ""
    const secondaryKeywords = secondaryCol >= 0 ? splitKeywords(cells[secondaryCol]) : []
    if (!page && !section && !text && !keyword) return
    rows.push({ id: `${sheet.name.trim()}-${index + 2}`, page, section, text, keyword, secondaryKeywords, issues: [] })
  })
  return rows
}

function importClientSheet(sheet: WorkbookSheet): ParsedRow[] | null {
  const header = sheet.rows[0] ?? []
  const keywordCol = findColumn(header, (h) => h.startsWith("keyword"))
  const proposalCols = header.map((cell, i) => (norm(cell).includes("proposta") ? i : -1)).filter((i) => i >= 0)
  const introCol = proposalCols.find((i) => norm(header[i]).includes("intro"))
  let textCol = introCol ?? proposalCols[0] ?? -1
  if (textCol < 0) textCol = findColumn(header, (h) => h.includes("contenuto"))
  if (keywordCol < 0 || textCol < 0) return null

  const page = clean(sheet.name)
  const rows: ParsedRow[] = []
  sheet.rows.slice(1).forEach((cells, index) => {
    const section = clean(cells[0])
    const text = clean(cells[textCol])
    const keywords = splitKeywords(cells[keywordCol])
    if (!section && !text && keywords.length === 0) return
    rows.push({
      id: `${sheet.name.trim()}-${index + 2}`,
      page,
      section: section || `Riga ${index + 2}`,
      text,
      keyword: keywords[0] ?? "",
      secondaryKeywords: keywords.slice(1),
      issues: [],
    })
  })
  return rows
}

export function importWorkbook(sheets: WorkbookSheet[], pipeline: BatchPipeline): WorkbookImport {
  const rows: ParsedRow[] = []
  const sheetsUsed: string[] = []
  const sheetsSkipped: string[] = []
  let layout: WorkbookLayout | null = null

  for (const sheet of sheets) {
    const template = importTemplateSheet(sheet)
    if (template) {
      rows.push(...template)
      sheetsUsed.push(sheet.name.trim())
      layout = layout ?? "template"
      continue
    }
    const client = importClientSheet(sheet)
    if (client) {
      rows.push(...client)
      sheetsUsed.push(sheet.name.trim())
      layout = layout ?? "client"
      continue
    }
    sheetsSkipped.push(sheet.name.trim())
  }

  return { rows: validateRows(rows, pipeline), layout, sheetsUsed, sheetsSkipped }
}
