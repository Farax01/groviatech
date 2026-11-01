import type { PageSpeed } from '@/lib/content-types'
import './pagespeed.css'

const SCORES = [
  ['performance', 'Performance'],
  ['accessibility', 'Accessibility'],
  ['bestPractices', 'Best practices'],
  ['seo', 'SEO'],
] as const

export function PageSpeedScores({ speed }: { speed?: PageSpeed }) {
  if (!speed) return null
  const items = SCORES.filter(([key]) => typeof speed[key] === 'number')
  if (items.length === 0) return null
  const date = new Date(`${speed.measuredOn}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
  return (
    <div className="hm-speed">
      <ul aria-label="Google PageSpeed Insights scores, out of 100">
        {items.map(([key, label]) => (
          <li key={key} className={(speed[key] as number) >= 90 ? 'is-good' : undefined}>
            <strong>{speed[key]}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
      <p>
        Google PageSpeed Insights, {speed.device}, measured {date}.
      </p>
    </div>
  )
}
