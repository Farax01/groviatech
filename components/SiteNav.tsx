'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/Logo'
import { Mark } from '@/components/Mark'
import { CTA, LINKS, SERVICES } from '@/components/nav-config'

/** A normal bar at the top of the page that shrinks into a floating pill as you scroll. */
export function SiteNav() {
  const pathname = usePathname()
  return <SiteNavContent key={pathname} />
}

function SiteNavContent() {
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const ddRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on Escape, or a click outside the Services menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false)
        setMenuOpen(false)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setServicesOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <header className="nav-wrap" data-scrolled={scrolled}>
      <nav className="nav-pill" aria-label="Main">
        <Link href="/" className="brand" aria-label="Groviatech home">
          <Logo variant="header" height={46} className="brand-full" />
          <span className="brand-icon">
            <Mark size={34} />
          </span>
        </Link>

        <div className="nav-links">
          <div
            className="nav-dd"
            ref={ddRef}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setServicesOpen(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-dd-btn"
              aria-expanded={servicesOpen}
              aria-controls="nav-services"
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg className="nav-chev" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            {servicesOpen && (
              <ul id="nav-services" className="nav-dd-panel">
                {SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href}>
                      <strong>{s.title}</strong>
                      <span>{s.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}

          <Link href={CTA.href} className="btn btn-solid">
            {CTA.label}
          </Link>
        </div>

        <button
          type="button"
          className="btn btn-soft nav-menu-btn"
          aria-expanded={menuOpen}
          aria-controls="nav-sheet"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {menuOpen && (
        <div id="nav-sheet" className="nav-sheet">
          <span className="nav-sheet-label">Services</span>
          {SERVICES.map((s) => (
            <Link key={s.href} href={s.href} className="nav-sheet-sub">
              {s.title}
            </Link>
          ))}
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link href={CTA.href}>{CTA.label}</Link>
        </div>
      )}
    </header>
  )
}
