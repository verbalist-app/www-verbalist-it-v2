import { AuthCard } from '@/components/auth/auth-card'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata = {
  title: 'Crea un account',
  description: 'Apri un account Verbalist e inizia la prova.',
  alternates: { canonical: '/signup' },
}

export default function Page() {
  return (
    <AuthShell side={{ color: 'purple' }}>
      <AuthCard mode="signup" />
    </AuthShell>
  )
}
