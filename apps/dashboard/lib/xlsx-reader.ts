/**
 * Lettore minimale di file .xlsx e .csv per il browser, senza dipendenze.
 *
 * Un .xlsx è uno zip: qui si leggono xl/workbook.xml, le relazioni, sharedStrings.xml
 * e i fogli. Copre i file salvati da Excel, Google Sheets, Numbers e openpyxl.
 * Non gestisce zip64, file cifrati o formule (si legge il valore calcolato).
 * L'implementazione reale in piattaforma può usare una libreria: questo serve alla demo.
 */

export interface WorkbookSheet {
  name: string
  /** Righe del foglio (indice 0 = riga 1 del file). Le celle vuote sono "". */
  rows: string[][]
}

export class WorkbookReadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "WorkbookReadError"
  }
}

export async function readWorkbookFile(file: File): Promise<WorkbookSheet[]> {
  const lower = file.name.toLowerCase()
  if (lower.endsWith(".csv")) {
    const text = await file.text()
    return [{ name: file.name.replace(/\.[^.]+$/, ""), rows: parseCsv(text) }]
  }
  const buffer = await file.arrayBuffer()
  return readXlsx(buffer)
}

export async function readXlsx(buffer: ArrayBuffer): Promise<WorkbookSheet[]> {
  const entries = await unzip(buffer)
  const workbookXml = entryText(entries, "xl/workbook.xml")
  if (!workbookXml) throw new WorkbookReadError("workbook.xml mancante")
  const relsXml = entryText(entries, "xl/_rels/workbook.xml.rels") ?? ""
  const shared = parseSharedStrings(entryText(entries, "xl/sharedStrings.xml") ?? "")

  const rels = new Map<string, string>()
  for (const match of relsXml.matchAll(/<Relationship\b([^>]*?)\/?>/g)) {
    const attrs = parseAttrs(match[1])
    if (attrs.Id && attrs.Target) rels.set(attrs.Id, attrs.Target)
  }

  const sheets: WorkbookSheet[] = []
  for (const match of workbookXml.matchAll(/<sheet\b([^>]*?)\/?>/g)) {
    const attrs = parseAttrs(match[1])
    const rid = attrs["r:id"] ?? attrs.id
    const target = rid ? rels.get(rid) : undefined
    if (!target) continue
    const path = target.startsWith("/") ? target.slice(1) : `xl/${target}`
    const xml = entryText(entries, path)
    if (!xml) continue
    sheets.push({ name: attrs.name ?? `Foglio ${sheets.length + 1}`, rows: parseSheet(xml, shared) })
  }
  if (sheets.length === 0) throw new WorkbookReadError("nessun foglio")
  return sheets
}

// ── XML ──────────────────────────────────────────────────────────────────────

function decodeXml(value: string): string {
  return value
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
}

function parseAttrs(source: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const match of source.matchAll(/([\w:.-]+)="([^"]*)"/g)) {
    attrs[match[1]] = decodeXml(match[2])
  }
  return attrs
}

function textNodes(source: string): string {
  let out = ""
  for (const match of source.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)) out += decodeXml(match[1])
  return out
}

function parseSharedStrings(xml: string): string[] {
  const strings: string[] = []
  for (const match of xml.matchAll(/<si\b[^>]*>([\s\S]*?)<\/si>/g)) strings.push(textNodes(match[1]))
  return strings
}

function columnIndex(ref: string): { col: number; row: number } {
  const letters = ref.match(/^[A-Z]+/)?.[0] ?? "A"
  const digits = ref.match(/\d+/)?.[0] ?? "1"
  let col = 0
  for (const ch of letters) col = col * 26 + (ch.charCodeAt(0) - 64)
  return { col: col - 1, row: parseInt(digits, 10) - 1 }
}

function parseSheet(xml: string, shared: string[]): string[][] {
  const rows: string[][] = []
  let cursorRow = 0
  let cursorCol = 0
  for (const match of xml.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const attrs = parseAttrs(match[1])
    const inner = match[2] ?? ""
    let col = cursorCol
    let row = cursorRow
    if (attrs.r) ({ col, row } = columnIndex(attrs.r))
    cursorRow = row
    cursorCol = col + 1

    let value = ""
    const type = attrs.t
    const rawValue = inner.match(/<v\b[^>]*>([\s\S]*?)<\/v>/)?.[1]
    if (type === "s") value = shared[Number(rawValue)] ?? ""
    else if (type === "inlineStr") value = textNodes(inner)
    else if (type === "b") value = rawValue === "1" ? "TRUE" : "FALSE"
    else if (type === "e") value = ""
    else value = rawValue !== undefined ? decodeXml(rawValue) : ""

    if (value === "") continue
    while (rows.length <= row) rows.push([])
    const line = rows[row]
    while (line.length <= col) line.push("")
    line[col] = value
  }
  return rows
}

// ── CSV ──────────────────────────────────────────────────────────────────────

export function parseCsv(text: string): string[][] {
  const firstLine = text.split(/\r?\n/, 1)[0] ?? ""
  const delimiter = (firstLine.match(/;/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0) ? ";" : ","
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let quoted = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else quoted = false
      } else field += ch
      continue
    }
    if (ch === '"') quoted = true
    else if (ch === delimiter) {
      row.push(field)
      field = ""
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else field += ch
  }
  if (field !== "" || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""))
}

// ── ZIP ──────────────────────────────────────────────────────────────────────

function entryText(entries: Map<string, Uint8Array>, path: string): string | null {
  const data = entries.get(path)
  return data ? new TextDecoder().decode(data) : null
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === "undefined") {
    throw new WorkbookReadError("DecompressionStream non disponibile in questo browser")
  }
  const stream = new Blob([data.slice()]).stream().pipeThrough(new DecompressionStream("deflate-raw"))
  return new Uint8Array(await new Response(stream).arrayBuffer())
}

async function unzip(buffer: ArrayBuffer): Promise<Map<string, Uint8Array>> {
  const bytes = new Uint8Array(buffer)
  const view = new DataView(buffer)
  const entries = new Map<string, Uint8Array>()
  if (bytes.length < 22) throw new WorkbookReadError("file troppo piccolo")

  // End of central directory: dalla fine, saltando l'eventuale commento
  let eocd = -1
  const stop = Math.max(0, bytes.length - 22 - 65535)
  for (let i = bytes.length - 22; i >= stop; i--) {
    if (view.getUint32(i, true) === 0x06054b50) {
      eocd = i
      break
    }
  }
  if (eocd < 0) throw new WorkbookReadError("non è un file zip")

  const count = view.getUint16(eocd + 10, true)
  let cursor = view.getUint32(eocd + 16, true)
  const decoder = new TextDecoder()
  for (let n = 0; n < count; n++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new WorkbookReadError("indice zip corrotto")
    const method = view.getUint16(cursor + 10, true)
    const compressedSize = view.getUint32(cursor + 20, true)
    const nameLength = view.getUint16(cursor + 28, true)
    const extraLength = view.getUint16(cursor + 30, true)
    const commentLength = view.getUint16(cursor + 32, true)
    const localOffset = view.getUint32(cursor + 42, true)
    const name = decoder.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength))
    const localNameLength = view.getUint16(localOffset + 26, true)
    const localExtraLength = view.getUint16(localOffset + 28, true)
    const dataStart = localOffset + 30 + localNameLength + localExtraLength
    const data = bytes.subarray(dataStart, dataStart + compressedSize)
    if (method === 0) entries.set(name, data)
    else if (method === 8) entries.set(name, await inflateRaw(data))
    else throw new WorkbookReadError(`compressione non supportata (${method})`)
    cursor += 46 + nameLength + extraLength + commentLength
  }
  return entries
}
