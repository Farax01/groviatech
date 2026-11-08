import type { Metadata } from 'next'
import Link from 'next/link'
import { AdminShell } from '../components/AdminShell'
import { moveLeadToTrashAction, restoreLeadAction, updateLeadAction } from '../actions'
import { ConfirmLeadDeleteButton } from './ConfirmLeadDeleteButton'
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
}: Readonly<{
  searchParams: Promise<{
    status?: string
    view?: string
    error?: string
    updated?: string
    trashed?: string
    restored?: string
    deleted?: string
  }>
}>) {
  const [{ status: requestedStatus, view: requestedView, error, updated, trashed, restored, deleted }, { supabase, user, role }] = await Promise.all([
    searchParams,
    requireAdmin(),
  ])
  const view = requestedView === 'trash' ? 'trash' : 'active'
  const status: LeadStatus | 'all' = LEAD_STATUSES.includes(requestedStatus as LeadStatus)
    ? (requestedStatus as LeadStatus)
    : 'all'

  const trashCountResult = await supabase
    .from('leads')
    .select('id', { count: 'exact', head: true })
    .not('deleted_at', 'is', null)
  if (trashCountResult.error) {
    console.error('Could not count trashed leads:', trashCountResult.error.message)
    throw new Error('Could not load the lead trash.')
  }

  let query = supabase
    .from('leads')
    .select('id, created_at, name, email, company, interest, message, source, status, notes, deleted_at')
    .order('created_at', { ascending: false })
    .limit(100)
  if (view === 'trash') {
    query = query.not('deleted_at', 'is', null)
  } else {
    query = query.is('deleted_at', null)
    if (status !== 'all') query = query.eq('status', status)
  }

  const { data: leads, error: loadError } = await query.returns<AdminLead[]>()
  if (loadError) {
    console.error('Could not load admin leads:', loadError.message)
    throw new Error('Could not load admin leads.')
  }

  return (
    <AdminShell current="leads" email={user.email ?? 'Admin account'} role={role}>
      <header className="adm-head">
        <p className="adm-crumb adm-muted">Admin / Leads</p>
        <h1>{view === 'trash' ? 'Lead trash' : 'Leads'}</h1>
        <p className="adm-muted">
          {view === 'trash'
            ? 'Restore enquiries or permanently delete them. Permanent deletion cannot be undone.'
            : 'Review enquiries, update their status and notes, or move them to trash.'}
        </p>
      </header>

      <nav className="adm-tabs" aria-label="Filter leads by status">
        <Link href="/admin/leads" aria-current={view === 'active' && status === 'all' ? 'page' : undefined}>All</Link>
        {LEAD_STATUSES.map((item) => {
          const href = `/admin/leads?status=${item}`
          return (
            <Link key={item} href={href} aria-current={view === 'active' && status === item ? 'page' : undefined}>
              {LABELS[item]}
            </Link>
          )
        })}
        <Link href="/admin/leads?view=trash" aria-current={view === 'trash' ? 'page' : undefined}>
          Trash ({trashCountResult.count ?? 0})
        </Link>
      </nav>

      {updated && <p className="adm-card" role="status">Lead updated.</p>}
      {trashed && <p className="adm-card" role="status">Lead moved to trash. You can restore it any time.</p>}
      {restored && <p className="adm-card" role="status">Lead restored.</p>}
      {deleted && <p className="adm-card" role="status">Lead permanently deleted.</p>}
      {error && (
        <p className="adm-error" role="alert">
          {error === 'missing' ? 'That lead no longer exists or has already moved.'
            : error === 'invalid' ? 'That lead request is invalid.'
              : error === 'trash' ? 'Could not move the lead to trash. Please try again.'
                : error === 'restore' ? 'Could not restore the lead. Please try again.'
                  : error === 'delete' ? 'Could not permanently delete the lead. Please try again.'
                    : 'Could not save the lead. Check the status and notes, then try again.'}
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
              {view === 'trash' ? (
                <div className="adm-lead-actions">
                  <form action={restoreLeadAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="adm-btn" type="submit">Restore lead</button>
                  </form>
                  <ConfirmLeadDeleteButton id={lead.id} />
                </div>
              ) : (
                <>
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
                  <form className="adm-lead-trash" action={moveLeadToTrashAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="adm-link adm-danger" type="submit">Move to trash</button>
                  </form>
                </>
              )}
            </details>
          ))}
        </div>
      ) : (
        <section className="adm-card">
          <p className="adm-muted">{view === 'trash' ? 'Trash is empty.' : 'No leads found for this filter.'}</p>
        </section>
      )}
    </AdminShell>
  )
}
