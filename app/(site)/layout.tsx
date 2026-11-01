import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { SiteNav } from '@/components/SiteNav'
import { LEGAL, LINKS, SERVICES, SOCIAL } from '@/components/nav-config'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import { INSIGHTS_LIVE } from './insights/insights-content'
import { SITE, TERMS_PUBLISHED } from './shared-content'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // The Terms link stays out of the footer until the page is published.
  const legal = LEGAL.filter((l) => l.href !== '/terms' || TERMS_PUBLISHED || SHOW_PLACEHOLDERS)
  return (
    <>
      <RevealOnScroll />
      <SiteNav />

      <main>{children}</main>

      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <div>
              <Logo variant="full" tone="white" height={96} className="foot-logo" />
              <p className="foot-where">
                Based in {SITE.location}.{' '}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
            </div>
            <nav className="foot-col" aria-label="Services">
              <span>Services</span>
              {SERVICES.map((s) => (
                <Link key={s.href} href={s.href}>
                  {s.title}
                </Link>
              ))}
            </nav>
            <nav className="foot-col" aria-label="Company">
              <span>Company</span>
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              {(INSIGHTS_LIVE || SHOW_PLACEHOLDERS) && <Link href="/insights">Insights</Link>}
              <Link href="/contact">Contact</Link>
              {SOCIAL.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </nav>
            <nav className="foot-col" aria-label="Legal">
              <span>Trust</span>
              {legal.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="foot-base">{SITE.legalName}</p>
        </div>
      </footer>
    </>
  )
}
