import { BrowserFrame } from '@/components/BrowserFrame'
import type { Project } from '@/lib/content-types'

/**
 * A slow strip of project screenshots under the hero, in place of the text strip. It only appears once at least three projects
 * have a screenshot (see LiveHeroStrip). The same animation as the text strip: it pauses on hover and stands still for reduced motion.
 */
export function WorkStrip({ projects }: { projects: Project[] }) {
  // Repeat the frames so each half of the loop is wider than a large screen and the strip never shows a gap.
  const reps = Math.max(1, Math.ceil(6 / projects.length))
  const items = Array.from({ length: reps }, () => projects).flat()
  return (
    <div className="mq mq-frames" role="group" aria-label="Recent work">
      <div className="mq-run">
        <ul className="mq-list">
          {items.map((p, i) => (
            <li key={`${p.domain}-${i}`}>
              <BrowserFrame src={p.image} alt={i < projects.length ? `Screenshot of ${p.domain}` : ''} url={p.domain} />
            </li>
          ))}
        </ul>
        <ul className="mq-list" aria-hidden="true">
          {items.map((p, i) => (
            <li key={`${p.domain}-${i}`}>
              <BrowserFrame src={p.image} alt="" url={p.domain} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
