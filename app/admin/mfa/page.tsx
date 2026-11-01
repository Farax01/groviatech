import type { Metadata } from 'next'
import { requireAllowlistedUser } from '@/lib/admin-auth'
import { MfaSetupForm } from '../components/MfaSetupForm'

export const metadata: Metadata = { title: 'Admin MFA | Groviatech' }
export const instant = false

export default async function AdminMfaPage() {
  const { supabase } = await requireAllowlistedUser()
  const { data, error } = await supabase.auth.mfa.listFactors()
  if (error) {
    console.error('Could not list admin authenticator factors:', error.message)
    throw new Error('Could not load admin authenticator factors.')
  }

  const factor = data.totp.find((item) => item.status === 'verified')
  return (
    <main className="adm-center">
      <MfaSetupForm verifiedFactorId={factor?.id ?? null} />
    </main>
  )
}
