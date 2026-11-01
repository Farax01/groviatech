import Link from 'next/link'
import { ArmTile, type Arm } from '@/components/ArmTile'
import { BrowserFrame } from '@/components/BrowserFrame'
import type { Project, Testimonial } from '@/lib/content-types'
import { visible } from '@/lib/placeholders'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import {
  AUDIT_STEPS,
  CASE_STUDY,
  CREDENTIALS,
  DATA_POINTS,
  FAQ,
  FOUNDER_NOTE,
  RESEARCH,
  SITE,
  TEAM,
  TESTIMONIALS,
  WORK,
  type Person,
} from '@/app/(site)/shared-content'

export const caseStudyLive = CASE_STUDY.published || SHOW_PLACEHOLDERS

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

export function Placeholder() {
  return <span className="ph-tag">Placeholder</span>
}

export function AuditSteps() {
  return (
    <section className="hm-act" data-reveal aria-labelledby="audit-h">
      <div className="wrap">
        <h2 id="audit-h" className="hm-h2">How a free audit works.</h2>
        <ol className="hm-steps">
          {AUDIT_STEPS.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p className="hm-lead">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function WorkGrid({ limit, projects = WORK }: { limit?: number; projects?: Project[] }) {
  const items = limit ? projects.slice(0, limit) : projects
  if (items.length === 0) return null
  return (
    <ul className="hm-cards hm-work">
      {items.map((w, i) => {
        const isCase = w.domain === CASE_STUDY.domain && caseStudyLive
        return (
          <li key={w.domain} className="hm-card hm-card-line">
            <BrowserFrame src={w.image} alt={`Screenshot of ${w.domain}`} url={w.domain} />
            <p className="hm-num">
              <span>{String(i + 1).padStart(2, '0')}</span>
              {w.category && <span>{w.category}</span>}
            </p>
            <h3>{w.domain}</h3>
            {w.description && <p className="hm-who">{w.description}</p>}
            {w.tags && (
              <ul className="hm-tags" aria-label="Built with">
                {w.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
            <div className="hm-row">
              {isCase && (
                <Link className="btn btn-solid btn-sm" href={`/work/${CASE_STUDY.slug}`}>
                  Read the case study
                </Link>
              )}
              <a className="btn btn-soft" href={`https://${w.domain}`} target="_blank" rel="noopener noreferrer">
                Visit ↗<span className="sr-only"> {w.domain} (opens in a new tab)</span>
              </a>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function PersonTile({ p }: { p: Person }) {
  return (
    <li>
      <div className="hm-tile">
        {p.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.photo} alt={p.name} className="hm-photo" />
        ) : (
          <span aria-hidden="true">{initials(p.name)}</span>
        )}
      </div>
      <h3>{p.name}</h3>
      <p className="hm-who">{p.role}</p>
      {p.note && <p className="hm-who">{p.note}</p>}
      {p.link && (
        <a className="btn btn-soft" href={p.link.href} target="_blank" rel="noopener noreferrer">
          {p.link.label} ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </li>
  )
}

export function TeamGrid({ people = TEAM }: { people?: Person[] }) {
  return (
    <ul className="hm-team">
      {people.map((p) => (
        <PersonTile key={p.name} p={p} />
      ))}
    </ul>
  )
}

export function Credentials() {
  const items = visible(CREDENTIALS)
  if (items.length === 0) return null
  return (
    <div className="hm-creds">
      <h3>Abdulmalik’s credentials.</h3>
      <ul>
        {items.map((c, i) => (
          <li key={i} className={c.placeholder ? 'is-ph' : undefined}>
            <a href={c.href} target="_blank" rel="noopener noreferrer">
              <strong>{c.title}</strong>
              <span>{c.issuer}</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {c.placeholder && <Placeholder />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Research() {
  const articles = visible(RESEARCH.articles)
  return (
    <div className="hm-research">
      <div>
        <h3>Research.</h3>
        <p className="hm-lead">Security write-ups by Abdulmalik, published on Medium.</p>
        <a className="btn btn-soft" href={RESEARCH.profile} target="_blank" rel="noopener noreferrer">
          Read on Medium ↗<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {articles.length > 0 && (
        <ul>
          {articles.map((a, i) => (
            <li key={i}>
              <a href={a.href} target="_blank" rel="noopener noreferrer">
                {a.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              {a.placeholder && <Placeholder />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function DataHandling() {
  return (
    <section className="hm-act" data-reveal aria-labelledby="data-h">
      <div className="wrap hm-panel">
        <h2 id="data-h" className="hm-h2">How we handle your data.</h2>
        <div className="hm-principles">
          {DATA_POINTS.map((d) => (
            <div key={d.title}>
              <h3>{d.title}</h3>
              <p className="hm-lead">{d.body}</p>
            </div>
          ))}
        </div>
        <p className="hm-more">
          <Link href="/security" className="btn btn-soft">
            Read the details
          </Link>
        </p>
      </div>
    </section>
  )
}

export function FounderNote({ person }: { person?: Person }) {
  const fouad = person ?? TEAM[0]
  if (!fouad) return null
  return (
    <div className="hm-note">
      <div className="hm-note-tile">
        {fouad.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={fouad.photo} alt={fouad.name} className="hm-photo" />
        ) : (
          <span aria-hidden="true">{initials(fouad.name)}</span>
        )}
      </div>
      <div>
        <h3>{FOUNDER_NOTE.heading}</h3>
        {FOUNDER_NOTE.paragraphs.map((p) => (
          <p key={p} className="hm-lead">
            {p}
          </p>
        ))}
        <p className="hm-who">
          {fouad.name}, {fouad.role}
        </p>
      </div>
    </div>
  )
}

export function Faq({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <section className="hm-act" data-reveal aria-labelledby="faq-h">
      <div className="wrap hm-faq">
        <h2 id="faq-h" className="hm-h2">Questions we get asked.</h2>
        <div>
          {items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ClosingCta({ heading = 'Tell us about your site.', body }: { heading?: string; body?: string }) {
  return (
    <section className="hm-close" data-reveal>
      <div className="wrap">
        <h2>{heading}</h2>
        <p className="hm-lead">
          {body ?? 'Book a free audit. We will tell you what fits, or that you don’t need anything yet.'}
        </p>
        <Link href="/contact" className="btn btn-light">
          Book a free audit
        </Link>
      </div>
    </section>
  )
}

export function WhereWeAre() {
  return (
    <p className="hm-where">
      Based in {SITE.location}.
    </p>
  )
}

export { ArmTile }
export type { Arm }

export function Testimonials({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  if (items.length === 0) return null
  return (
    <section className="hm-act" data-reveal aria-labelledby="quotes-h">
      <div className="wrap">
        <h2 id="quotes-h" className="hm-h2">
          What clients say.
        </h2>
        <ul className="hm-quotes">
          {items.map((t) => (
            <li key={t.quote}>
              <figure>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
