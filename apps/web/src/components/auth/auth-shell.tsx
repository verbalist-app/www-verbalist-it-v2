import Image from 'next/image'
import type { ReactNode } from 'react'

import { Wallpaper } from '@/components/elements/wallpaper'

const customerLogos = [
  { name: 'Rentokil', file: '/img/logos/rentokil.svg' },
  { name: 'Pompea', file: '/img/logos/pompea.svg' },
  { name: 'Meccanotecnica', file: '/img/logos/meccanotecnica.svg' },
  { name: 'Plastisac', file: '/img/logos/plastisac.svg' },
  { name: 'Sogese', file: '/img/logos/sogese.svg' },
  { name: 'Jurny', file: '/img/logos/jurny.svg' },
]

export function AuthShell({
  children,
  side,
}: {
  children: ReactNode
  side: { color: 'blue' | 'purple' | 'green' | 'brown' }
}) {
  return (
    <section className="grid min-h-[calc(100vh-5.25rem)] grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16 lg:px-12">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <div className="relative hidden lg:block">
        <Wallpaper color={side.color} className="h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 z-10 px-12 pb-12">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            {customerLogos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.file}
                alt={logo.name}
                width={100}
                height={32}
                className="h-6 w-auto opacity-90 [filter:brightness(0)_invert(1)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
