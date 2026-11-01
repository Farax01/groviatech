import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell } from '../components/AdminShell'
import { updateLeadAction } from '../actions'
import { requireAdmin } from '@/lib/admin-auth'
import { LEAD_STATUSES, type AdminLead, type LeadStatus } from '@/lib/admin-types'

export const metadata: Metadata = { title: 'Leads | Groviatech Admin' }
export const instant = false

const LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  won: 'Won',
  lost: 'Lost',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export default async function AdminLeadsPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ status?: string; error?: string; updated?: string }> }>) {
  const [{ status: requestedStatus, error, updated }, { supabase, user, role }] = await Promise.all([
    searchParams,
    requireAdmin(),
  ])
  const status: LeadStatus | 'all' = LEAD_STATUSES.includes(requestedStatus as LeadStatus)
    ? (requestedStatus as LeadStatus)
    : 'all'

  let query = supabase
    .from('leads')
    .select('id, created_at, name, email, company, interest, message, source, status, notes')
    .order('created_at', { ascending: false })
    .limit(100)
  if (status !== 'all') query = query.eq('status', status)

  const { data: leads, error: loadError } = await query.returns<AdminLead[]>()
  if (loadError) {
    console.error('Could not load admin leads:', loadError.message)
    throw new Error('Could not load admin leads.')
  }

  return (
    <AdminShell current="leads" email={user.email ?? 'Admin account'} role={role}>
      <header className="adm-head">
        <p className="adm-crumb adm-muted">Admin / Leads</p>
        <h1>Leads</h1>
        <p className="adm-muted">Review enquiries and keep their status and internal notes up to date.</p>
      </header>

      <nav className="adm-tabs" aria-label="Filter leads by status">
        <Link href="/admin/leads" aria-current={status === 'all' ? 'page' : undefined}>All</Link>
        {LEAD_STATUSES.map((item) => (
          <Link
            key={item}
            href={`/admin/leads?status=${item}`}
            aria-current={status === item ? 'page' : undefined}
          >
            {LABELS[item]}
          </Link>
        ))}
      </nav>

      {updated && <p className="adm-card" role="status">Lead updated.</p>}
      {error && (
        <p className="adm-error" role="alert">
          {error === 'missing'
            ? 'That lead no longer exists.'
            : error === 'invalid'
              ? 'Check the lead status and notes, then try again.'
              : 'Could not save the lead. Please try again.'}
        </p>
      )}

      {leads?.length ? (
        <div>
          {leads.map((lead) => (
            <details className="adm-card adm-lead" key={lead.id}>
              <summary>
                <span>
                  <strong>{lead.name}</strong>
                  <span className="adm-muted"> · {lead.email} · {formatDate(lead.created_at)}</span>
                </span>
                <span className={`adm-pill s-${lead.status}`}>{LABELS[lead.status]}</span>
              </summary>
              <dl className="adm-meta">
                {lead.company && <div><dt>Company</dt><dd>{lead.company}</dd></div>}
                {lead.interest && <div><dt>Interest</dt><dd>{lead.interest}</dd></div>}
                <div><dt>Source</dt><dd>{lead.source}</dd></div>
              </dl>
              {lead.message && <p className="adm-message">{lead.message}</p>}
              <form className="adm-form adm-lead-form" action={updateLeadAction}>
                <input type="hidden" name="id" value={lead.id} />
                <label>
                  Status
                  <select name="status" defaultValue={lead.status}>
                    {LEAD_STATUSES.map((item) => <option key={item} value={item}>{LABELS[item]}</option>)}
                  </select>
                </label>
                <label>
                  Internal notes
                  <textarea name="notes" rows={4} maxLength={4000} defaultValue={lead.notes ?? ''} />
                </label>
                <button className="adm-btn" type="submit">Save lead</button>
              </form>
            </details>
          ))}
        </div>
      ) : (
        <section className="adm-card">
          <p className="adm-muted">No leads found for this filter.</p>
        </section>
      )}
    </AdminShell>
  )
}
