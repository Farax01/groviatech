import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'


type Row = { id: string; domain: string; category: string | null; published: boolean; image_url: string | null }

export default async function ProjectsListPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase.from('projects').select('id, domain, category, published, image_url').order('sort_order')
  const rows = (data ?? []) as Row[]
  const withImages = rows.filter((r) => r.published && r.image_url).length

  return (
    <>
      <header className="adm-head">
        <h1>Projects</h1>
        <p className="adm-muted">
          The work shown on the home page (the first three) and the Work page. Once three live projects have a screenshot, the
          home page shows them in a moving strip under the headline.
        </p>
      </header>

      <section className="adm-card">
        <div className="adm-row-head">
          <h2>
            Projects <span className="adm-muted">({withImages} with a screenshot)</span>
          </h2>
          <Link className="adm-btn adm-btn-quiet" href="/admin/projects/new">
            Add project
          </Link>
        </div>
        {error ? (
          <p className="adm-error" role="alert">
            Couldn’t load projects: {error.message}. Have you run <code className="adm-code">supabase/content.sql</code>?
          </p>
        ) : rows.length === 0 ? (
          <p className="adm-muted">No projects yet. Run <code className="adm-code">supabase/content-seed.sql</code> to load the current ones, or add one.</p>
        ) : (
          <ul className="adm-list">
            {rows.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/projects/${p.id}`}>
                  <span>
                    <strong>{p.domain}</strong>
                    <span className="adm-muted"> {p.category}</span>
                  </span>
                  <span>
                    {!p.image_url && <span className="adm-pill s-contacted">No screenshot</span>}{' '}
                    <span className={`adm-pill ${p.published ? 's-won' : 's-lost'}`}>{p.published ? 'Live' : 'Draft'}</span>
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
