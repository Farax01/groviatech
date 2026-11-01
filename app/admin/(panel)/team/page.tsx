import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'


type Row = { id: string; name: string; role: string; published: boolean; photo_url: string | null }

export default async function TeamListPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase.from('team_members').select('id, name, role, published, photo_url').order('sort_order')
  const rows = (data ?? []) as Row[]

  return (
    <>
      <header className="adm-head">
        <h1>Team</h1>
        <p className="adm-muted">The people shown on the home page and the About page. Changes go live as soon as you save.</p>
      </header>

      <section className="adm-card">
        <div className="adm-row-head">
          <h2>People</h2>
          <Link className="adm-btn adm-btn-quiet" href="/admin/team/new">
            Add person
          </Link>
        </div>
        {error ? (
          <p className="adm-error" role="alert">
            Couldn’t load the team: {error.message}. Have you run <code className="adm-code">supabase/content.sql</code>?
          </p>
        ) : rows.length === 0 ? (
          <p className="adm-muted">No one yet. Run <code className="adm-code">supabase/content-seed.sql</code> to load the current team, or add someone.</p>
        ) : (
          <ul className="adm-list">
            {rows.map((m) => (
              <li key={m.id}>
                <Link href={`/admin/team/${m.id}`}>
                  <span>
                    <strong>{m.name}</strong>
                    <span className="adm-muted"> {m.role}</span>
                  </span>
                  <span>
                    {!m.photo_url && <span className="adm-pill s-contacted">No photo</span>}{' '}
                    <span className={`adm-pill ${m.published ? 's-won' : 's-lost'}`}>{m.published ? 'Live' : 'Draft'}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
