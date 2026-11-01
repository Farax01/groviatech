'use client'

import { useEffect, useRef } from 'react'

const FINDINGS = [
  {
    level: 'High',
    title: 'The admin login accepts unlimited password guesses',
    fix: 'Slow or lock the account after a few failed attempts.',
  },
  {
    level: 'Medium',
    title: 'Customer email addresses are visible in a public page’s source',
    fix: 'Stop sending that field to the browser.',
  },
  {
    level: 'Low',
    title: 'Four standard security headers are missing',
    fix: 'Add them to the server’s responses. This takes minutes.',
  },
]

/**
 * An invented excerpt that shows what a Groviatech review reads like. It is labelled as an example.
 * When it scrolls into view the findings appear one at a time, like a scan result. Without JavaScript,
 * or with reduced motion, all three are simply there.
 */
export function ReportExcerpt() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (el.getBoundingClientRect().top < window.innerHeight * 0.6) {
      el.dataset.build = 'run'
      return
    }
    el.dataset.build = 'armed'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.build = 'run'
        io.disconnect()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="rep" ref={ref} data-build="static">
      <span className="rep-badge">Example, not a real client</span>
      <div className="rep-doc">
        <p className="rep-head">Security review</p>
        <ol className="rep-list">
          {FINDINGS.map((f, i) => (
            <li key={f.title} className="rep-item" style={{ '--i': i } as React.CSSProperties}>
              <span className={`rep-pill lvl-${f.level.toLowerCase()}`}>{f.level}</span>
              <p className="rep-title">{f.title}</p>
              <p className="rep-fix">
                <strong>Fix:</strong> {f.fix}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
