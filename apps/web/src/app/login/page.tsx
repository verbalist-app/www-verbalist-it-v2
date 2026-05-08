import { AuthCard } from '@/components/auth/auth-card'
import { AuthShell } from '@/components/auth/auth-shell'

export const metadata = {
  title: 'Accedi',
  description: 'Entra nella dashboard Verbalist con email e password.',
  alternates: { canonical: '/login' },
  robots: { index: false, follow: true },
}

export default function Page() {
  return (
    <AuthShell side={{ color: 'blue' }}>
      <AuthCard mode="login" />
    </AuthShell>
  )
}
