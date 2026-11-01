import Link from 'next/link'
import { BrowserFrame } from '@/components/BrowserFrame'
import { PageSpeedScores } from '@/components/PageSpeedScores'
import { WORK, CASE_STUDY } from '@/app/(site)/shared-content'
import { caseStudyForDomain, caseStudyLive } from '@/app/(site)/work/case-studies'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import type { Project } from '@/lib/content-types'

export function WorkGrid({ limit, projects = WORK }: { limit?: number; projects?: Project[] }) {
  const items = limit ? projects.slice(0, limit) : projects
  if (items.length === 0) return null
  return (
    <ul className="hm-cards hm-work">
      {items.map((w, i) => {
        const study = caseStudyForDomain(w.domain)
        const isNewCase = study && caseStudyLive(study)
        const isLegacyCase = w.domain === CASE_STUDY.domain && (CASE_STUDY.published || SHOW_PLACEHOLDERS)
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
            <PageSpeedScores speed={w.speed} />
            <div className="hm-row">
              {(isNewCase || isLegacyCase) && (
                <Link className="btn btn-solid btn-sm" href={`/work/${study?.slug ?? CASE_STUDY.slug}`}>
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
