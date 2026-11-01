import type { Metadata } from 'next'
import { AdminShell } from '../components/AdminShell'
import { ConfirmDeleteButton } from '../components/ConfirmDeleteButton'
import { savePricingTierAction } from '../actions'
import { requireAdmin } from '@/lib/admin-auth'
import { TRACKS, type Tier, type Track } from '@/lib/types'

export const metadata: Metadata = { title: 'Pricing editor | Groviatech Admin' }
export const instant = false

const TRACK_LABELS: Record<Track, string> = {
  web_dev: 'Web development',
  sme_security: 'Small-business security',
  ai_startup: 'AI startup testing',
}

function TierForm({ tier }: Readonly<{ tier?: Tier }>) {
  return (
    <>
      <form className="adm-form" action={savePricingTierAction}>
        {tier && <input type="hidden" name="id" value={tier.id} />}
        <div className="adm-grid2">
          <label>
            Service track
            <select name="track" defaultValue={tier?.track ?? 'web_dev'}>
              {TRACKS.map(({ id }) => <option key={id} value={id}>{TRACK_LABELS[id]}</option>)}
            </select>
          </label>
          <label>
            Tier name
            <input name="name" required maxLength={80} defaultValue={tier?.name ?? ''} />
          </label>
        </div>
        <div className="adm-grid3">
          <label>
            Price prefix
            <input name="price_prefix" maxLength={20} placeholder="from" defaultValue={tier?.price_prefix ?? ''} />
          </label>
          <label>
            Price
            <input name="price_label" required maxLength={40} defaultValue={tier?.price_label ?? ''} />
          </label>
          <label>
            Price suffix
            <input name="price_suffix" maxLength={30} placeholder="/mo or one-time" defaultValue={tier?.price_suffix ?? ''} />
          </label>
        </div>
        <label>
          Audience description
          <input name="audience" maxLength={200} defaultValue={tier?.audience ?? ''} />
        </label>
        <label>
          Features <span className="adm-hint">One feature per line, up to 30 features.</span>
          <textarea name="features" rows={6} defaultValue={tier?.features.join('\n') ?? ''} />
        </label>
        <div className="adm-grid2">
          <label>
            Call-to-action label
            <input name="cta_label" required maxLength={60} defaultValue={tier?.cta_label ?? 'Book a free audit'} />
          </label>
          <label>
            Call-to-action URL
            <input name="cta_href" required maxLength={300} defaultValue={tier?.cta_href ?? '/contact'} />
          </label>
        </div>
        <div className="adm-grid2">
          <label>
            Sort order
            <input name="sort_order" type="number" step="1" required defaultValue={tier?.sort_order ?? 10} />
          </label>
          <label>
            Highlight label
            <input name="highlight_label" maxLength={40} placeholder="Most chosen" defaultValue={tier?.highlight_label ?? ''} />
          </label>
        </div>
        <label className="adm-check">
          <input type="checkbox" name="highlighted" defaultChecked={tier?.highlighted ?? false} />
          Highlight this tier
        </label>
        <label className="adm-check">
          <input type="checkbox" name="published" defaultChecked={tier?.published ?? true} />
          Published on the website
        </label>
        <div className="adm-actions">
          <button className="adm-btn" type="submit">{tier ? 'Save changes' : 'Create tier'}</button>
        </div>
      </form>
      {tier && <ConfirmDeleteButton id={tier.id} />}
    </>
  )
}

function TierPreview({ tier }: Readonly<{ tier: Tier }>) {
  return (
    <aside className="adm-preview" aria-label={`Preview for ${tier.name}`}>
      <p className="adm-muted">Current public card preview</p>
      <article className={tier.highlighted ? 'adm-tier is-hi' : 'adm-tier'}>
        {tier.highlighted && <span className="adm-badge">{tier.highlight_label || 'Most chosen'}</span>}
        <h3>{tier.name}</h3>
        {tier.audience && <p className="adm-tier-for">{tier.audience}</p>}
        <p className="adm-price">
          {tier.price_prefix && <small>{tier.price_prefix} </small>}
          <strong>{tier.price_label}</strong>
          {tier.price_suffix && <small> {tier.price_suffix}</small>}
        </p>
        <ul>{tier.features.map((feature, index) => <li key={`${index}-${feature}`}>{feature}</li>)}</ul>
        <span className="adm-tier-cta">{tier.cta_label}</span>
      </article>
    </aside>
  )
}

export default async function AdminPricingPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ error?: string; saved?: string; deleted?: string }> }>) {
  const [{ error, saved, deleted }, { supabase, user, role }] = await Promise.all([
    searchParams,
    requireAdmin(),
  ])
  const { data: tiers, error: loadError } = await supabase
    .from('pricing_tiers')
    .select('*')
    .order('track')
    .order('sort_order')
    .returns<Tier[]>()
  if (loadError) {
    console.error('Could not load pricing tiers for admin:', loadError.message)
    throw new Error('Could not load pricing tiers.')
  }

  return (
    <AdminShell current="pricing" email={user.email ?? 'Admin account'} role={role}>
      <header className="adm-head">
        <p className="adm-crumb adm-muted">Admin / Pricing</p>
        <h1>Pricing</h1>
        <p className="adm-muted">Edit the published tiers shown on the public pricing page.</p>
      </header>

      {saved && <p className="adm-card" role="status">Pricing tier saved.</p>}
      {deleted && <p className="adm-card" role="status">Pricing tier deleted.</p>}
      {error && (
        <p className="adm-error" role="alert">
          {error === 'invalid'
            ? 'Some values are missing or invalid. Check the form and try again.'
            : error === 'missing'
              ? 'That pricing tier no longer exists.'
              : error === 'delete'
                ? 'Could not delete that pricing tier.'
                : 'Could not save pricing. Please try again.'}
        </p>
      )}

      <section className="adm-card">
        <div className="adm-head">
          <h2>Add a pricing tier</h2>
          <p className="adm-muted">Create a tier for one of the three public service tracks.</p>
        </div>
        <TierForm />
      </section>

      {tiers?.map((tier) => (
        <section className="adm-card" key={tier.id}>
          <div className="adm-row-head">
            <div>
              <h2>{tier.name}</h2>
              <p className="adm-muted">{TRACK_LABELS[tier.track]} · {tier.published ? 'Published' : 'Unpublished'}</p>
            </div>
            <span className={tier.published ? 'adm-pill s-won' : 'adm-pill s-lost'}>
              {tier.published ? 'Published' : 'Hidden'}
            </span>
          </div>
          <div className="adm-editor">
            <div>
              <TierForm tier={tier} />
            </div>
            <TierPreview tier={tier} />
          </div>
        </section>
      ))}
    </AdminShell>
  )
}
