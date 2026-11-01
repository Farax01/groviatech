'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/pricing', label: 'Pricing' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/leads', label: 'Leads' },
]

export function AdminNav() {
  const pathname = usePathname()
  return (
    <nav className="adm-nav" aria-label="Admin">
      {LINKS.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href)
        return (
          <Link key={l.href} href={l.href} aria-current={active ? 'page' : undefined}>
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
