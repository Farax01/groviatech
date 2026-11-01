import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BrowserFrame } from '@/components/BrowserFrame'
import { ClosingCta, Placeholder } from '@/components/Sections'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import { CASE_STUDY as C } from '../../shared-content'
import '../../home.css'

export const metadata: Metadata = {
  title: 'TC Janitorial case study',
  description: C.intro,
}

export default function CaseStudyPage() {
  // Hidden in production until you set `published: true` in shared-content.ts.
  if (!C.published && !SHOW_PLACEHOLDERS) notFound()
  const sections = C.sections.filter((s) => !s.placeholder || SHOW_PLACEHOLDERS)
  const metrics = C.metrics.filter((m) => !m.placeholder || SHOW_PLACEHOLDERS)

  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <p className="hm-who">Case study</p>
          <h1>{C.title}</h1>
          <p className="hm-lede">{C.intro}</p>
          <div className="hm-actions">
            <a className="btn" href={`https://${C.domain}`} target="_blank" rel="noopener noreferrer">
              Visit {C.domain} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <section className="hm-act">
        <div className="wrap">
          <dl className="hm-facts">
            {C.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {metrics.length > 0 && (
        <section className="hm-act" data-reveal aria-labelledby="results-h">
          <div className="wrap">
            <h2 id="results-h" className="hm-h2">The numbers.</h2>
            <ul className="hm-metrics">
              {metrics.map((m) => (
                <li key={m.label} className={m.placeholder ? 'is-ph' : undefined}>
                  <p className="hm-who">{m.label}</p>
                  <p className="hm-metric">
                    <span>{m.before}</span> to <strong>{m.after}</strong>
                  </p>
                  {m.placeholder && <Placeholder />}
                </li>
              ))}
            </ul>
            <div className="hm-proof">
              <BrowserFrame
                src={C.proofImage}
                alt="PageSpeed Insights results for tc-janitorial.com, before and after"
                url="pagespeed.web.dev"
                label="PageSpeed screenshot"
              />
            </div>
            {SHOW_PLACEHOLDERS && (
              <p className="hm-who hm-after-h">
                {C.proofNote} <Placeholder />
              </p>
            )}
          </div>
        </section>
      )}

      <section className="hm-act">
        <div className="wrap hm-prose">
          {sections.map((s) => (
            <div key={s.heading} className={s.placeholder ? 'is-ph' : undefined}>
              <h2 className="hm-h2">{s.heading}</h2>
              <p className="hm-lead">
                {s.body} {s.placeholder && <Placeholder />}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ClosingCta heading="Want a site like this?" />
    </>
  )
}
