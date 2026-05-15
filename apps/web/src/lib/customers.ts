export type Customer = {
  slug: string
  name: string
  logo: { src: string; width: number; height: number }
}

export const customers: Customer[] = [
  {
    slug: 'rentokil',
    name: 'Rentokil',
    logo: { src: '/img/logos/rentokil.svg', width: 100, height: 32 },
  },
  {
    slug: 'pompea',
    name: 'Pompea',
    logo: { src: '/img/logos/pompea.svg', width: 100, height: 32 },
  },
  {
    slug: 'meccanotecnica',
    name: 'Meccanotecnica',
    logo: { src: '/img/logos/meccanotecnica.svg', width: 100, height: 32 },
  },
  {
    slug: 'plastisac',
    name: 'Plastisac',
    logo: { src: '/img/logos/plastisac.svg', width: 100, height: 32 },
  },
  {
    slug: 'sogese',
    name: 'Sogese',
    logo: { src: '/img/logos/sogese.svg', width: 100, height: 32 },
  },
  {
    slug: 'jurny',
    name: 'Jurny',
    logo: { src: '/img/logos/jurny.svg', width: 100, height: 32 },
  },
]
