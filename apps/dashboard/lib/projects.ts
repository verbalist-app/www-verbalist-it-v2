import type { DashboardLocale } from "./status"

/**
 * Progetti mock condivisi tra le schermate (sidebar, liste, wizard, lotti).
 * Il progetto "5" è il pilot Bonfiglioli: ha profilo brand, materiali e un lotto.
 */
export interface MockProject {
  id: string
  name: Record<DashboardLocale, string>
  description: Record<DashboardLocale, string>
}

export const mockProjects: MockProject[] = [
  {
    id: "1",
    name: { it: "Blog Aziendale", en: "Corporate Blog" },
    description: { it: "Contenuti per il blog corporate", en: "Content for corporate blog" },
  },
  {
    id: "2",
    name: { it: "Landing Pages", en: "Landing Pages" },
    description: { it: "Pagine di atterraggio per campagne", en: "Landing pages for campaigns" },
  },
  {
    id: "3",
    name: { it: "E-commerce", en: "E-commerce" },
    description: { it: "Descrizioni prodotti e categorie", en: "Product descriptions and categories" },
  },
  {
    id: "4",
    name: { it: "Guide Tecniche", en: "Technical Guides" },
    description: { it: "Tutorial e documentazione", en: "Tutorials and documentation" },
  },
  {
    id: "5",
    name: { it: "Bonfiglioli · Sito IT", en: "Bonfiglioli · IT website" },
    description: {
      it: "Revisione dei testi di settori e applicazioni in ottica SEO e GEO",
      en: "SEO and GEO rewrite of industry and application pages",
    },
  },
]

export const BONFIGLIOLI_PROJECT_ID = "5"

export function getProjectName(id: string, locale: DashboardLocale): string {
  return mockProjects.find((p) => p.id === id)?.name[locale] ?? ""
}
