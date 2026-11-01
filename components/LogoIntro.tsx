'use client'

import { useLayoutEffect, useRef } from 'react'

/*
 * A short opening animation on the home page: the three arms of the mark draw themselves, the name fades in, and the
 * screen lifts away. It plays once per visit. The root layout adds data-intro="seen" to <html> before the first paint when
 * this tab has already played it, so a reload does not repeat it. With reduced motion it never shows, and with
 * JavaScript off it still plays and lifts away on its own, because the animation is pure CSS.
 */
let owner: HTMLElement | null = null // the one intro element that plays in this page load

export function LogoIntro() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (owner && owner !== el) {
      el.hidden = true // coming back to the home page by clicking a link: do not replay
      return
    }
    owner = el
    try {
      sessionStorage.setItem('gt-intro', '1')
    } catch {}
    const done = window.setTimeout(() => {
      el.hidden = true
    }, 2400)
    return () => window.clearTimeout(done)
  }, [])

  return (
    <div className="intro" ref={ref} aria-hidden="true">
      <svg className="intro-mark" viewBox="52.22 203.23 122.76 106.33" width="132" height="114">
        <path className="intro-arm" style={{ ['--d' as string]: 0 }} pathLength={1} d="M113.06 255.91L113.06 209.12M125.23 209.12L100.89 209.12" />
        <path className="intro-arm" style={{ ['--d' as string]: 1 }} pathLength={1} d="M114.49 252.79L68.39 292.52M60.44 283.30L76.34 301.74" />
        <path className="intro-arm" style={{ ['--d' as string]: 2 }} pathLength={1} d="M111.63 252.79L158.81 293.39M150.87 302.61L166.75 284.17" />
      </svg>
      <p className="intro-word">Groviatech</p>
      <p className="intro-tag">Trustworthy. Transparent. Talented.</p>
    </div>
  )
}
