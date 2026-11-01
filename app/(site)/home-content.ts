import type { Track } from '@/lib/types'
import type { Arm } from '@/components/ArmTile'

/* Words on the home page itself. Facts shared with other pages live in shared-content.ts. */

export const OFFERS: { track: Track; arm: Arm; title: string; who: string; body: string; href: string; path: string[] }[] = [
  {
    track: 'web_dev',
    arm: 'top',
    title: 'Web development.',
    who: 'For small and medium-sized businesses that take payments, bookings or customer data.',
    body: 'We design and build the site, with security work in every build. Higher tiers add a written review before launch, or an independent penetration test.',
    href: '/services/web-development',
    path: ['Free audit', 'Written quote', 'Build, with security work in it', 'Launch'],
  },
  {
    track: 'sme_security',
    arm: 'left',
    title: 'Website security.',
    who: 'For small and medium-sized businesses with a site that is already live.',
    body: 'A plain-English audit of what is exposed, fixes for what we find, and ongoing monitoring and patching if you want it. You do not need to rebuild with us.',
    href: '/services/website-security',
    path: ['Free audit', 'Security Check', 'Fix & Harden', 'Secure Care, if you want it'],
  },
  {
    track: 'ai_startup',
    arm: 'right',
    title: 'AI startup security.',
    who: 'For AI startups shipping a web app and an API.',
    body: 'Manual, OWASP-aligned penetration testing, a report your engineers can act on, and a free retest to confirm the fixes.',
    href: '/services/ai-startup-security',
    path: ['Free audit', 'Penetration test', 'A report your engineers can act on', 'Free retest'],
  },
]

export const PRINCIPLES = [
  {
    title: 'Security is part of the build.',
    body: 'Every web build starts with a hardened setup. Higher tiers add a written security review before launch.',
  },
  {
    title: 'We check our own fixes.',
    body: 'Penetration tests include a free retest. Fix & Harden ends with a re-scan that confirms the fixes held.',
  },
]
