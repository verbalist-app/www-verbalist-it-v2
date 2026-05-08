import { Link } from '@/components/elements/link'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { HeroSimpleCentered } from '@/components/sections/hero-simple-centered'

export const metadata = {
  title: 'Pagina non trovata — Verbalist',
}

export default function NotFound() {
  return (
    <HeroSimpleCentered
      headline="Pagina non trovata"
      subheadline={<p>La pagina che cercavi non esiste o è stata spostata.</p>}
      cta={
        <Link href="/">
          Torna alla home <ArrowNarrowRightIcon />
        </Link>
      }
    />
  )
}
