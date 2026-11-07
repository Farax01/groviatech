'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { Tier, Track } from '@/lib/types'
import { TRACK_COPY } from './content'

/* The three arms of the Groviatech mark double as the track selector. */
const K = 2.4
const J = { x: 280, y: (254.02 - 203.23) * K + 22 }
const toStage = (x: number, y: number) => ({ x: (x - 113.06) * K + 280, y: (y - 203.23) * K + 22 })

function armPath(ex: number, ey: number) {
  const E = toStage(ex, ey)
  const len = Math.hypot(E.x - J.x, E.y - J.y)
  const ux = (E.x - J.x) / len
  const uy = (E.y - J.y) / len
  const nx = -uy
  const ny = ux
  const half = 12.17 * K
  const s = (3.78 * K) / 2
  const f = (n: number) => n.toFixed(1)
  return (
    `M${f(J.x - ux * s)} ${f(J.y - uy * s)}L${f(E.x)} ${f(E.y)}` +
    `M${f(E.x + nx * half)} ${f(E.y + ny * half)}L${f(E.x - nx * half)} ${f(E.y - ny * half)}`
  )
}

const ARMS: { id: Track; d: string }[] = [
  { id: 'web_dev', d: armPath(113.06, 209.12) },
  { id: 'sme_security', d: armPath(68.39, 292.52) },
  { id: 'ai_startup', d: armPath(158.81, 293.39) },
]

function ctaHref(tier: Tier, trackName: string) {
  if (!tier.cta_href.startsWith('/')) return tier.cta_href
  const sep = tier.cta_href.includes('?') ? '&' : '?'
  return `${tier.cta_href}${sep}interest=${encodeURIComponent(`${tier.name}, ${trackName}`)}`
}

export function PricingExplorer({ tiers, initialTrack = 'web_dev' }: { tiers: Tier[]; initialTrack?: Track }) {
  const [track, setTrack] = useState<Track>(initialTrack)

  function pick(next: Track) {
    setTrack(next)
    const url = new URL(window.location.href)
    url.searchParams.set('track', next)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }

  const copy = TRACK_COPY[track]
  const shown = tiers.filter((t) => t.track === track).sort((a, b) => a.sort_order - b.sort_order)

  return (
    <>
      <section className="pr-hero">
        <div className="wrap pr-hero-grid">
          <div className="pr-hero-text">
            <h1>Secure websites, and the security testing behind them</h1>
            <p>
              Plans for building a site that is safe to run, and for testing the one you already have. Pick what you
              need and we send a fixed, written quote.
            </p>
          </div>

          <fieldset className="sel">
            <legend className="sr-only">What do you need?</legend>
            <div className="sel-stage">
              <svg className="sel-mark" viewBox="0 0 560 300" aria-hidden="true">
                {/* the chosen arm is drawn last so it sits on top at the joint */}
                {[...ARMS].sort((a, b) => Number(a.id === track) - Number(b.id === track)).map((a) => (
                  <path key={a.id} d={a.d} pathLength={1} className={track === a.id ? 'arm on' : 'arm'} />
                ))}
              </svg>
              {ARMS.map((a) => (
                <label key={a.id} className={`opt opt-${a.id}`}>
                  <input type="radio" name="track" value={a.id} checked={track === a.id} onChange={() => pick(a.id)} />
                  <span className="opt-name">{TRACK_COPY[a.id].name}</span>
                  <span className="opt-blurb">{TRACK_COPY[a.id].blurb}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      <section className="pr-tiers" aria-labelledby="tiers-h">
        <div className="wrap">
          <div className="pr-tiers-head">
            <h2 id="tiers-h">{copy.heading}</h2>
            <p>{copy.who}</p>
          </div>

          {shown.length === 0 ? (
            <p className="pr-empty">
              We don’t list public tiers for this track right now.{' '}
              <Link href="/contact">Book a free audit</Link> and we will quote it for you.
            </p>
          ) : (
            <div className="tier-grid">
              {shown.map((t) => (
                <article key={t.id} className={t.highlighted ? 'tier is-featured' : 'tier'}>
                  {t.highlighted && <span className="tier-badge">{t.highlight_label || 'Most chosen'}</span>}
                  <h3>{t.name}</h3>
                  {t.audience && <p className="tier-for">{t.audience}</p>}
                  <p className="tier-price">
                    {t.price_prefix && <span className="tier-small">{t.price_prefix}</span>}
                    <span className="tier-num">{t.price_label}</span>
                    {t.price_suffix && <span className="tier-small">{t.price_suffix}</span>}
                  </p>
                  <ul className="tier-feat">
                    {t.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                  {t.cta_href.startsWith('/') ? (
                    <Link href={ctaHref(t, copy.name)} className={t.highlighted ? 'btn btn-solid' : 'btn'}>
                      {t.cta_label}
                    </Link>
                  ) : (
                    <a href={t.cta_href} className={t.highlighted ? 'btn btn-solid' : 'btn'}>
                      {t.cta_label}
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}

          <p className="pr-notincl">
            <strong>Not included.</strong> {copy.notIncluded}
          </p>
        </div>
      </section>
    </>
  )
}
