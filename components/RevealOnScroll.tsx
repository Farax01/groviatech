'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import './blue-theme.css'

/**
 * Sections marked data-reveal fade in and rise a few pixels, once, as they scroll into view.
 * Only opacity and transform change, so the layout never jumps. Anything already on screen when the page loads
 * is left alone, and nothing is hidden for visitors who ask for reduced motion or whose browser lacks IntersectionObserver.
 */
export function RevealOnScroll() {
  const pathname = usePathname()

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          ;(e.target as HTMLElement).dataset.rv = 'show'
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
      el.dataset.rv = 'hide'
      io.observe(el)
    })

    return () => io.disconnect()
  }, [pathname])

  return null
}
