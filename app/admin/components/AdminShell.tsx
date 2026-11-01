'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOutAction } from '../actions'

const NAV = [
  { href: '/admin', label: 'Overview', key: 'overview' },
  { href: '/admin/leads', label: 'Leads', key: 'leads' },
  { href: '/admin/pricing', label: 'Pricing', key: 'pricing' },
  { href: '/admin/team', label: 'Team', key: 'team' },
  { href: '/admin/projects', label: 'Projects', key: 'projects' },
  { href: '/admin/testimonials', label: 'Testimonials', key: 'testimonials' },
] as const

export function AdminShell({
  children,
  current,
  email,
  role,
}: Readonly<{
  children: React.ReactNode
  current: (typeof NAV)[number]['key']
  email: string
  role: string
}>) {
  const pathname = usePathname()
  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link className="adm-brand" href="/admin" aria-label="Groviatech admin home">
          Groviatech <span className="adm-muted">Admin</span>
        </Link>
        <nav className="adm-nav" aria-label="Admin">
          {NAV.map((item) => {
            const active = pathname
              ? item.href === '/admin'
                ? pathname === item.href
                : pathname.startsWith(item.href)
              : current === item.key
            return (
              <Link key={item.key} href={item.href} aria-current={active ? 'page' : undefined}>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="adm-user">
          <span title={email}>{email}</span>
          <span>{role}</span>
          <form action={signOutAction}>
            <button className="adm-link" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="adm-main">{children}</main>
    </div>
  )
}
