import { BONFIGLIOLI_PROJECT_ID } from "./projects"

/**
 * Profilo brand di progetto.
 * Corrisponde al parametro `brand_profile` proposto dal backend (Inventio Hub, 14/09/2026):
 * viene passato ai task di generazione e ottimizzazione, non addestra nulla.
 */
export const TONE_PRESETS = [
  "professional",
  "technical",
  "informal",
  "institutional",
  "commercial",
] as const

export type TonePreset = (typeof TONE_PRESETS)[number]

export interface BrandProfile {
  companyName: string
  description: string
  values: string
  tonePreset: TonePreset | ""
  toneNotes: string
  rulesDo: string
  rulesDont: string
  glossary: string[]
  forbidden: string[]
  preferredCta: string
  internalLinks: string[]
  updatedAt: string | null
}

export const emptyBrandProfile: BrandProfile = {
  companyName: "",
  description: "",
  values: "",
  tonePreset: "",
  toneNotes: "",
  rulesDo: "",
  rulesDont: "",
  glossary: [],
  forbidden: [],
  preferredCta: "",
  internalLinks: [],
  updatedAt: null,
}

const mockBrandProfiles: Record<string, BrandProfile> = {
  [BONFIGLIOLI_PROJECT_ID]: {
    companyName: "Bonfiglioli Riduttori S.p.A.",
    description:
      "Gruppo italiano che progetta e produce riduttori, motoriduttori, inverter e sistemi di azionamento per l'industria, le macchine mobili e le energie rinnovabili. Partner dei costruttori di impianti (OEM) con presenza globale e oltre 60 anni di esperienza.",
    values: "Affidabilità, continuità operativa, innovazione tecnica, vicinanza al cliente.",
    tonePreset: "technical",
    toneNotes:
      "Tecnico e diretto. Frasi brevi, dati concreti, nessuna enfasi commerciale. Si rivolge a costruttori di impianti e responsabili tecnici.",
    rulesDo:
      "Nomina sempre la serie del prodotto (Serie 300M, EVOX CP, serie Agile, Serie HDP e C).\nSpiega il beneficio operativo: affidabilità, manutenzione ridotta, continuità h24.\nUsa \"soluzioni\" e \"sistemi di azionamento\", non \"prodotti\".",
    rulesDont:
      "Niente superlativi senza un dato a supporto.\nNon citare prezzi, sconti o promozioni.\nNon promettere prestazioni non documentate nelle schede tecniche.",
    glossary: [
      "Serie 300M: riduttori epicicloidali per carichi di picco elevati",
      "EVOX CP: motoriduttori per vagli e tamburi rotanti",
      "Serie Agile: inverter per il controllo della portata",
      "RSU: rifiuti solidi urbani",
      "OEM: costruttori di impianti e macchine",
    ],
    forbidden: ["leader mondiale", "numero uno", "rivoluzionario", "low cost"],
    preferredCta: "Contatta un esperto Bonfiglioli",
    internalLinks: [
      "https://www.bonfiglioli.com/it/prodotti/riduttori-epicicloidali",
      "https://www.bonfiglioli.com/it/settori/biogas",
      "https://www.bonfiglioli.com/it/contatti",
    ],
    updatedAt: "2026-09-15T09:12:00.000Z",
  },
}

const STORAGE_KEY = "verbalist:brand-profiles"

function readStored(): Record<string, BrandProfile> {
  if (typeof window === "undefined") return {}
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Record<string, BrandProfile>
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

/** Profili noti: mock + modifiche fatte in sessione (solo per la demo). */
export function loadBrandProfiles(): Record<string, BrandProfile> {
  return { ...mockBrandProfiles, ...readStored() }
}

export function getBrandProfile(projectId: string): BrandProfile | null {
  const all = loadBrandProfiles()
  return all[projectId] ?? null
}

export function saveBrandProfile(projectId: string, profile: BrandProfile): BrandProfile {
  const saved = { ...profile, updatedAt: new Date().toISOString() }
  if (typeof window !== "undefined") {
    try {
      const stored = readStored()
      stored[projectId] = saved
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
    } catch {
      // la demo continua anche senza storage
    }
  }
  return saved
}

export function isBrandProfileFilled(profile: BrandProfile | null): boolean {
  if (!profile) return false
  return Boolean(
    profile.companyName.trim() ||
      profile.description.trim() ||
      profile.toneNotes.trim() ||
      profile.tonePreset ||
      profile.rulesDo.trim() ||
      profile.rulesDont.trim() ||
      profile.glossary.length ||
      profile.forbidden.length,
  )
}

export interface ProjectMaterial {
  id: string
  name: string
  sizeKb: number
  uploadedAt: string
}

export const mockMaterials: Record<string, ProjectMaterial[]> = {
  [BONFIGLIOLI_PROJECT_ID]: [
    { id: "m1", name: "Brochure_Biogas_2026.pdf", sizeKb: 940, uploadedAt: "2026-09-14T15:20:00.000Z" },
    { id: "m2", name: "Bonfiglioli_Dos_and_Donts_TOV.pdf", sizeKb: 210, uploadedAt: "2026-09-14T15:22:00.000Z" },
  ],
}
