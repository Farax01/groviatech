import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell } from './components/AdminShell'
import { requireAdmin } from '@/lib/admin-auth'
import type { AdminLead } from '@/lib/admin-types'

export const metadata: Metadata = { title: 'Admin overview | Groviatech' }
export const instant = false

export default async function AdminHomePage() {
  const { supabase, user, role } = await requireAdmin()
  const [newLeads, totalLeads, publishedTiers, recentLeads] = await Promise.all([
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('status', 'new').is('deleted_at', null),
    supabase.from('leads').select('id', { count: 'exact', head: true }).is('deleted_at', null),
    supabase.from('pricing_tiers').select('id', { count: 'exact', head: true }).eq('published', true),
    supabase
      .from('leads')
      .select('id, created_at, name, email, company, interest, message, source, status, notes, deleted_at')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(5)
      .returns<AdminLead[]>(),
  ])

  for (const [label, error] of [
    ['new leads', newLeads.error],
    ['all leads', totalLeads.error],
    ['published pricing tiers', publishedTiers.error],
    ['recent leads', recentLeads.error],
  ] as const) {
    if (error) {
      console.error(`Could not load admin ${label}:`, error.message)
      throw new Error(`Could not load admin ${label}.`)
    }
  }

  return (
    <AdminShell current="overview" email={user.email ?? 'Admin account'} role={role}>
      <header className="adm-head">
        <p className="adm-crumb adm-muted">Admin / Overview</p>
        <h1>Overview</h1>
        <p className="adm-muted">Manage enquiries and the pricing shown on your website.</p>
      </header>

      <section className="adm-stats" aria-label="Admin summary">
        <Link className="adm-stat" href="/admin/leads?status=new">
          <strong>{newLeads.count ?? 0}</strong>
          <span>New leads</span>
        </Link>
        <Link className="adm-stat" href="/admin/leads">
          <strong>{totalLeads.count ?? 0}</strong>
          <span>Active leads</span>
        </Link>
        <Link className="adm-stat" href="/admin/pricing">
          <strong>{publishedTiers.count ?? 0}</strong>
          <span>Published pricing tiers</span>
        </Link>
      </section>

      <section className="adm-card">
        <div className="adm-row-head">
          <h2>Recent leads</h2>
          <Link href="/admin/leads">View all</Link>
        </div>
        {recentLeads.data?.length ? (
          <ul className="adm-list">
            {recentLeads.data.map((lead) => (
              <li key={lead.id}>
                <Link href="/admin/leads">
                  <span>{lead.name} <span className="adm-muted">· {lead.email}</span></span>
                  <span className={`adm-pill s-${lead.status}`}>{lead.status}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="adm-muted">No enquiries yet.</p>
        )}
      </section>
    </AdminShell>
  )
}
