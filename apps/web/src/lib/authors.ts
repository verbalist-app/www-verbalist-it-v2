const SITE_URL = 'https://www.verbalist.it'

export type AuthorBio = {
  name: string
  bio: string
  jobTitle?: string
  worksFor?: string
  sameAs?: string[]
  // If author is a team rather than a single person, this becomes Organization in schema
  isTeam?: boolean
}

export const authors: Record<string, AuthorBio> = {
  'Team Verbalist': {
    name: 'Team Verbalist',
    bio: "Il team editoriale di Verbalist è formato da SEO specialist e content engineer di NUR Digital Marketing. Lavoriamo da 25 anni su contenuti SEO per clienti enterprise (EY, Mercedes-Benz, LVMH, SDA Bocconi). Pubblichiamo qui pattern e tecniche operative che applichiamo ogni giorno.",
    worksFor: 'NUR S.r.l.',
    sameAs: ['https://nur.it'],
    isTeam: true,
  },
  'Rinaldo Zambello': {
    name: 'Rinaldo Zambello',
    bio: "CEO di NUR Digital Marketing dal 1999. Autore del primo libro italiano sulla Generative Engine Optimization (2024). Lavora su SEO enterprise per clienti come EY, Mercedes-Benz e LVMH.",
    jobTitle: 'CEO, NUR Digital Marketing',
    worksFor: 'NUR S.r.l.',
    sameAs: ['https://nur.it'],
  },
}

export function getAuthor(name: string | undefined): AuthorBio {
  if (name && authors[name]) return authors[name]
  return authors['Team Verbalist']
}

export function authorSchema(author: AuthorBio) {
  if (author.isTeam) {
    return {
      '@type': 'Organization',
      name: author.name,
      description: author.bio,
      url: SITE_URL,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
    }
  }
  return {
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    jobTitle: author.jobTitle,
    worksFor: author.worksFor
      ? { '@type': 'Organization', name: author.worksFor }
      : undefined,
    sameAs: author.sameAs,
  }
}
