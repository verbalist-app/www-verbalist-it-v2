import Image from 'next/image'

import { Logo, LogoGrid } from '@/components/elements/logo-grid'
import { customers } from '@/lib/customers'

export function CustomerLogosGrid() {
  return (
    <LogoGrid>
      {customers.map((c) => (
        <Logo key={c.slug}>
          <Image
            src={c.logo.src}
            alt={c.name}
            width={c.logo.width}
            height={c.logo.height}
            className="brightness-0"
          />
        </Logo>
      ))}
    </LogoGrid>
  )
}
