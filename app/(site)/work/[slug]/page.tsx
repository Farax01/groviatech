import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { BrowserFrame } from '@/components/BrowserFrame'
import { PageSpeedScores } from '@/components/PageSpeedScores'
import { ClosingCta, Placeholder } from '@/components/Sections'
import { getProjects } from '@/lib/content'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import { CASE_STUDIES, caseStudy, caseStudyLive, type CaseStudy } from '../case-studies'
import '../../home.css'
import '../case-study.css'

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = caseStudy((await params).slug)
  if (!c || !caseStudyLive(c)) return {}
  return { title: `${c.client} case study`, description: c.summary }
}

function Gap({ children }: { children: string }) {
  if (!SHOW_PLACEHOLDERS) return null
  return (
    <p className="hm-who">
      {children} <Placeholder />
    </p>
  )
}

async function Evidence({ study }: { study: CaseStudy }) {
  const project = (await getProjects()).find((p) => p.domain === study.domain)
  const hasScores = Boolean(project?.speed)
  return (
    <>
      <div className="wrap">
        <div className="cs-shot">
          <BrowserFrame src={project?.image} alt={`Screenshot of ${study.domain}`} url={study.domain} />
        </div>
      </div>
      <section className="hm-act" data-reveal aria-labelledby="results-h">
        <div className="wrap">
          <h2 id="results-h" className="hm-h2">
            Results.
          </h2>
          {hasScores && (
            <div className="cs-results">
              <p className="hm-lead">How the site scores on Google’s own speed and quality test.</p>
              <PageSpeedScores speed={project?.speed} />
            </div>
          )}
          {!hasScores && <Gap>Add the PageSpeed scores in Admin → Projects → this project.</Gap>}
          {study.outcome ? <p className="cs-text">{study.outcome}</p> : <Gap>Add any other real results: launch figures, traffic, anything measurable.</Gap>}
        </div>
      </section>
    </>
  )
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const study = caseStudy((await params).slug)
  if (!study || !caseStudyLive(study)) notFound()

  return (
    <>
      <section className="hm-hero cs-hero">
        <div className="wrap">
          <p className="hm-who">
            <Link href="/work">Work</Link> · Case study
            {!study.published && <span className="ph-tag">Draft</span>}
          </p>
          <h1 className="hm-post-h1">{study.title}</h1>
          <p className="hm-lede">{study.summary}</p>
          <div className="hm-row">
            <a className="btn btn-solid" href={`https://${study.domain}`} target="_blank" rel="noopener noreferrer">
              Visit {study.domain} ↗<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <Link className="btn btn-soft" href="/contact">
              Book a free audit
            </Link>
          </div>
          <dl className="cs-facts">
            <div>
              <dt>Client</dt>
              <dd>{study.client}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{study.sector}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{study.stack.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Suspense fallback={null}>
        <Evidence study={study} />
      </Suspense>

      <section className="hm-act" data-reveal aria-labelledby="built-h">
        <div className="wrap">
          <h2 id="built-h" className="hm-h2">
            What we built.
          </h2>
          <ul className="cs-built">
            {study.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {(study.brief || study.approach || SHOW_PLACEHOLDERS) && (
        <section className="hm-act" data-reveal aria-labelledby="story-h">
          <div className="wrap">
            <h2 id="story-h" className="hm-h2">
              The brief and how we handled it.
            </h2>
            {study.brief ? <p className="cs-text">{study.brief}</p> : <Gap>Add what the client needed, in your words.</Gap>}
            {study.approach ? <p className="cs-text">{study.approach}</p> : <Gap>Add what was hard, and how you handled it.</Gap>}
          </div>
        </section>
      )}

      {study.quote ? (
        <section className="hm-act" data-reveal aria-label="What the client said">
          <div className="wrap">
            <figure className="cs-quote">
              <blockquote>
                <p>{study.quote.text}</p>
              </blockquote>
              <figcaption>
                <strong>{study.quote.name}</strong> · {study.quote.role}
              </figcaption>
            </figure>
          </div>
        </section>
      ) : (
        SHOW_PLACEHOLDERS && (
          <section className="hm-act">
            <div className="wrap">
              <Gap>Add a quote from the client, once they have agreed to it.</Gap>
            </div>
          </section>
        )
      )}

      {study.disclaimer && (
        <section className="hm-act">
          <div className="wrap">
            <p className="cs-note">{study.disclaimer}</p>
          </div>
        </section>
      )}

      <ClosingCta heading="Want a site that works as hard as this one?" />
    </>
  )
}
