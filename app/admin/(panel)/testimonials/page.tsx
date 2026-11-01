import Link from 'next/link'
import { requireAdmin } from '@/lib/admin-auth'


type Row = { id: string; quote: string; name: string; role: string | null; published: boolean; permission_confirmed: boolean }

export default async function TestimonialsListPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase.from('testimonials').select('id, quote, name, role, published, permission_confirmed').order('sort_order')
  const rows = (data ?? []) as Row[]

  return (
    <>
      <header className="adm-head">
        <h1>Testimonials</h1>
        <p className="adm-muted">
          Quotes from clients, shown on the home page. A quote can only go live once you have confirmed the person agreed to be quoted.
        </p>
      </header>

      <section className="adm-card">
        <div className="adm-row-head">
          <h2>Quotes</h2>
          <Link className="adm-btn adm-btn-quiet" href="/admin/testimonials/new">
            Add testimonial
          </Link>
        </div>
        {error ? (
          <p className="adm-error" role="alert">
            Couldn’t load testimonials: {error.message}. Have you run <code className="adm-code">supabase/content.sql</code>?
          </p>
        ) : rows.length === 0 ? (
          <p className="adm-muted">No testimonials yet. Run <code className="adm-code">supabase/content-seed.sql</code> to load the current ones, or add one.</p>
        ) : (
          <ul className="adm-list">
            {rows.map((t) => (
              <li key={t.id}>
                <Link href={`/admin/testimonials/${t.id}`}>
                  <span>
                    <strong>{t.name}</strong>
                    <span className="adm-muted"> {t.role}</span>
                    <span className="adm-quote-line">{t.quote}</span>
                  </span>
                  <span>
                    {!t.permission_confirmed && <span className="adm-pill s-contacted">Permission needed</span>}{' '}
                    <span className={`adm-pill ${t.published ? 's-won' : 's-lost'}`}>{t.published ? 'Live' : 'Draft'}</span>
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
