import type { Tier } from '@/lib/types'

// Shown only if Supabase can't be reached or has no published tiers,
// so the pricing page never renders empty. Keep roughly in step with the admin.
const base = {
  price_prefix: null,
  price_suffix: null,
  audience: null,
  highlighted: false,
  highlight_label: null,
  cta_label: 'Book a free audit',
  cta_href: '/contact',
  published: true,
  updated_at: '',
} as const

export const FALLBACK_TIERS: Tier[] = [
  { ...base, id: 'fb-1', track: 'web_dev', name: 'Launch', price_prefix: 'from', price_label: '$1,500', sort_order: 10,
    audience: 'A secure brochure site for a small business',
    features: ['Up to 5 pages', 'Hardened setup, SSL and security headers', '14 days of support'] },
  { ...base, id: 'fb-2', track: 'web_dev', name: 'Secure Business', price_prefix: 'from', price_label: '$3,500', sort_order: 20,
    highlighted: true, highlight_label: 'Most chosen',
    audience: 'Sites that take payments, bookings or customer data',
    features: ['Forms, payments, bookings or customer data', 'Pre-launch security review with a written report', '30 days of support'] },
  { ...base, id: 'fb-3', track: 'web_dev', name: 'Platform', price_prefix: 'from', price_label: '$6,500', sort_order: 30,
    audience: 'Portals, e-commerce and integrations',
    features: ['Portals, e-commerce and integrations', 'Independent pentest by our security team', '90 days of support'] },

  { ...base, id: 'fb-4', track: 'sme_security', name: 'Security Check', price_label: '$900', price_suffix: 'one-time', sort_order: 10,
    audience: 'Find out where your current site is exposed',
    features: ['Audit of your existing site', 'Misconfigurations, outdated software, exposed data, payment and form risks', 'Plain-English report with a risk rating'] },
  { ...base, id: 'fb-5', track: 'sme_security', name: 'Fix & Harden', price_prefix: 'from', price_label: '$1,800', price_suffix: 'one-time', sort_order: 20,
    highlighted: true, highlight_label: 'Most chosen',
    audience: 'We fix what the audit finds',
    features: ['Fixes for every issue in your Security Check', 'Re-scan confirming the fixes'] },
  { ...base, id: 'fb-6', track: 'sme_security', name: 'Secure Care', price_label: '$249', price_suffix: '/mo', sort_order: 30,
    audience: 'Ongoing protection after launch',
    features: ['Monitoring and patching', 'Backups', 'Quarterly scan', 'Monthly summary'] },

  { ...base, id: 'fb-7', track: 'ai_startup', name: 'Essential', price_label: '$3,000', sort_order: 10,
    audience: 'One web app, tested manually',
    features: ['1 web app', 'Manual, OWASP-aligned testing', 'Report with remediation guidance', '1 free retest', 'About 1–2 weeks'] },
  { ...base, id: 'fb-8', track: 'ai_startup', name: 'Comprehensive', price_label: '$4,800', sort_order: 20,
    highlighted: true, highlight_label: 'Most chosen',
    audience: 'Web app and API, tested in depth',
    features: ['Web app and API', 'Authentication, business-logic and access-control depth', 'Report and walkthrough call', '1 free retest', 'About 2–3 weeks'] },
  { ...base, id: 'fb-9', track: 'ai_startup', name: 'Ongoing', price_label: 'Custom', sort_order: 30,
    audience: 'Several apps, tested on a schedule',
    features: ['Multiple apps, recurring', 'Quarterly tests', 'Reports and a live finding tracker', 'Retests included'] },
]
