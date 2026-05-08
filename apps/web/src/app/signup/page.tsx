import { AuthCard } from '@/components/auth/auth-card'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata = {
  title: 'Crea un account',
  description: 'Crea un account Verbalist e prova 1 mese di SEO e content engineering con 15 contenuti inclusi. Senza carta di credito, niente pagamento anticipato.',
  alternates: { canonical: '/signup' },
}

export default function Page() {
  return (
    <AuthShell side={{ color: 'purple' }}>
      <AuthCard mode="signup" />
    </AuthShell>
  )
}
