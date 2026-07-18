/**
 * Calcolo costo a partire dai token, come fa scripts/pricing.py nel backend
 * (costo = token / 1.000.000 x prezzo_per_1M).
 *
 * ATTENZIONE: i prezzi qui sotto sono SEGNAPOSTO, servono solo a far vedere
 * la colonna "costo" nella UI. La fonte di verità è il file YAML di pricing
 * lato backend: quando Niccolò espone l'endpoint costi, questi valori vanno
 * rimossi e sostituiti dai dati reali.
 */

export interface ModelPrice {
  input_per_1m: number // USD per 1M token input
  output_per_1m: number // USD per 1M token output
}

// chiavi = nomi modello come salvati in Subtask.model_used (configs/llm.py)
export const PRICE_CATALOG: Record<string, ModelPrice> = {
  "claude-opus-4-7": { input_per_1m: 15, output_per_1m: 75 },
  "claude-sonnet-4-6": { input_per_1m: 3, output_per_1m: 15 },
  "google_genai:gemini-3.1-pro-preview": { input_per_1m: 1.25, output_per_1m: 10 },
  "gpt-5": { input_per_1m: 1.25, output_per_1m: 10 },
}

export function priceFor(model: string | null | undefined): ModelPrice | null {
  if (!model) return null
  return PRICE_CATALOG[model] ?? null
}

export function costForTokens(
  model: string | null | undefined,
  inputTokens: number,
  outputTokens: number,
): number | null {
  const price = priceFor(model)
  if (!price) return null
  return (inputTokens / 1_000_000) * price.input_per_1m + (outputTokens / 1_000_000) * price.output_per_1m
}

export function formatUsd(value: number | null): string {
  if (value === null) return "—"
  if (value === 0) return "$0.00"
  if (value < 0.01) return "< $0.01"
  return `$${value.toFixed(2)}`
}

export function formatTokens(n: number | null | undefined): string {
  if (n === null || n === undefined) return "—"
  return new Intl.NumberFormat("it-IT").format(n)
}
