import { AdminShell } from '../components/AdminShell'
import { requireAdmin } from '@/lib/admin-auth'

export default async function ContentAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role } = await requireAdmin()
  return (
    <AdminShell current="team" email={user.email ?? 'Admin account'} role={role}>
      {children}
    </AdminShell>
  )
}
