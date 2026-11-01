'use client'

import { useEffect, useRef } from 'react'

/** A thin line at the top of the window that fills as you read an article. It follows the page's own scrolling and adds no motion of its own. */
export function ReadingProgress({ target = '.hm-article' }: { target?: string }) {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fill = bar.current
    const article = document.querySelector(target)
    if (!fill || !article) return

    let frame = 0
    const update = () => {
      frame = 0
      const r = article.getBoundingClientRect()
      const length = Math.max(1, r.height - window.innerHeight * 0.75)
      const done = Math.min(1, Math.max(0, (window.innerHeight * 0.25 - r.top) / length))
      fill.style.transform = `scaleX(${done})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <div className="read-bar" aria-hidden="true">
      <div ref={bar} />
    </div>
  )
}
