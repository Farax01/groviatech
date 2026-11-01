import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClosingCta, Faq } from '@/components/Sections'
import { getPublishedTiers } from '@/lib/pricing'
import { FALLBACK_TIERS } from '@/lib/pricing-fallback'
import type { Track } from '@/lib/types'
import { SERVICES, bySlug } from '../services-content'
import '../../home.css'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = bySlug((await params).slug)
  return s ? { title: s.name, description: s.lede } : {}
}

function ServiceTiers({
  tiers,
  track,
  notIncluded,
}: {
  tiers: typeof FALLBACK_TIERS
  track: Track
  notIncluded: string
}) {
  return (
    <section className="hm-act" aria-labelledby="tiers-h">
      <div className="wrap">
        <h2 id="tiers-h" className="hm-h2">Tiers and prices.</h2>
        <ul className="hm-cards">
          {tiers.filter((tier) => tier.track === track).map((t) => (
            <li key={t.id} className="hm-card">
              <h3>{t.name}</h3>
              {t.audience && <p className="hm-who">{t.audience}</p>}
              <p className="hm-price">
                {t.price_prefix && <small>{t.price_prefix} </small>}
                {t.price_label}
                {t.price_suffix && <small> {t.price_suffix}</small>}
              </p>
              <Link href={`/pricing?track=${track}`} className="btn btn-soft">
                See what is included
              </Link>
            </li>
          ))}
        </ul>
        <p className="hm-who hm-after-h">Not included: {notIncluded}</p>
      </div>
    </section>
  )
}

async function LiveServiceTiers({ track, notIncluded }: { track: Track; notIncluded: string }) {
  const live = await getPublishedTiers(track)
  const tiers = live.length > 0 ? live : FALLBACK_TIERS.filter((tier) => tier.track === track)
  return <ServiceTiers tiers={tiers} track={track} notIncluded={notIncluded} />
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = bySlug((await params).slug)
  if (!s) notFound()

  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <p className="hm-who">{s.name}</p>
          <h1>{s.headline}</h1>
          <p className="hm-lede">{s.lede}</p>
          <div className="hm-actions">
            <Link href="/contact" className="btn btn-solid">Book a free audit</Link>
            <Link href={`/pricing?track=${s.track}`} className="btn">See pricing</Link>
          </div>
        </div>
      </section>
      <section className="hm-act" aria-labelledby="gets-h">
        <div className="wrap">
          <div className="hm-stage hm-stage-plain">
            <div>
              <h2 id="gets-h">What you get.</h2>
              <p className="hm-lead">For {s.who.charAt(0).toLowerCase() + s.who.slice(1)}</p>
            </div>
            <ul className="hm-checks">
              {s.gets.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <Suspense fallback={<ServiceTiers tiers={FALLBACK_TIERS} track={s.track} notIncluded={s.notIncluded} />}>
        <LiveServiceTiers track={s.track} notIncluded={s.notIncluded} />
      </Suspense>
      <section className="hm-act" aria-labelledby="steps-h">
        <div className="wrap">
          <h2 id="steps-h" className="hm-h2">How it works.</h2>
          <ol className="hm-steps">
            {s.steps.map((st) => (
              <li key={st.title}>
                <h3>{st.title}</h3>
                <p className="hm-lead">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq items={s.faq} />
      <ClosingCta />
    </>
  )
}
