import type { Track } from '@/lib/types'

/* Words for the three service pages. Prices come from the admin, so they are not repeated here. */

export type Service = {
  slug: string
  track: Track
  name: string
  headline: string
  lede: string
  who: string
  gets: string[]
  steps: { title: string; body: string }[]
  faq: { q: string; a: string }[]
  notIncluded: string
}

export const SERVICES: Service[] = [
  {
    slug: 'web-development',
    track: 'web_dev',
    name: 'Web development',
    headline: 'A website that is safe to run.',
    lede: 'We design and build your site with security work in every tier, then support it after launch.',
    who: 'US small businesses that take payments, bookings or customer data, and want a site that someone has also tried to break.',
    gets: [
      'A hardened setup with SSL and security headers on every build',
      'A written security review before launch, on Secure Business and above',
      'An independent penetration test by our security team, on Platform',
      'A support period after launch: 14, 30 or 90 days depending on the tier',
    ],
    steps: [
      { title: 'Free audit', body: 'Tell us what the site needs to do and what data it will touch.' },
      { title: 'Written quote', body: 'A fixed price and timeline before any payment.' },
      { title: 'Build', body: 'We design and build the site, with the security work for your tier.' },
      { title: 'Review and launch', body: 'Higher tiers get a written security review or a penetration test before the site goes live.' },
      { title: 'Support', body: 'We fix issues during your support period. Secure Care can continue after it.' },
    ],
    faq: [
      {
        q: 'What does “security work in every build” mean?',
        a: 'Launch includes a hardened setup, SSL and security headers. Secure Business adds a written security review before launch. Platform adds an independent penetration test by our security team.',
      },
      {
        q: 'Can you secure a site I already have?',
        a: 'Yes. That is website security, and you do not need to rebuild with us.',
      },
      {
        q: 'What is not included?',
        a: 'Domain and hosting fees, and copywriting and photography unless we agree them in your quote.',
      },
    ],
    notIncluded: 'Domain and hosting fees. Copywriting and photography, unless agreed in your quote.',
  },
  {
    slug: 'website-security',
    track: 'sme_security',
    name: 'Website security',
    headline: 'Find out where your site is exposed.',
    lede: 'A plain-English audit of the site you already have, fixes for what we find, and protection that continues after.',
    who: 'Small businesses with a live site that takes payments, forms or customer data.',
    gets: [
      'An audit of misconfigurations, outdated software, exposed data, and payment and form risks',
      'A report in plain English with a risk rating',
      'Fixes for every issue in the Security Check, if you choose Fix & Harden',
      'A re-scan confirming the fixes held',
      'Monitoring, patching, backups and a quarterly scan with Secure Care',
    ],
    steps: [
      { title: 'Security Check', body: 'We audit your existing site and send a report with a risk rating.' },
      { title: 'Fix & Harden', body: 'If you want, we fix what the audit found and re-scan to confirm.' },
      { title: 'Secure Care', body: 'Monitoring and patching continue each month, with a quarterly scan.' },
    ],
    faq: [
      {
        q: 'Do I need to rebuild my site?',
        a: 'No. These services work on the site you already have.',
      },
      {
        q: 'Does the Security Check fix the problems?',
        a: 'No. It finds and explains them. Fixing them is Fix & Harden.',
      },
      {
        q: 'Do you provide compliance certification?',
        a: 'No. Formal certification such as PCI DSS or SOC 2 is not part of these services.',
      },
    ],
    notIncluded: 'Fixes inside a Security Check, which is its own tier. Formal compliance certification.',
  },
  {
    slug: 'ai-startup-security',
    track: 'ai_startup',
    name: 'AI startup security',
    headline: 'Penetration testing your engineers can act on.',
    lede: 'Manual, OWASP-aligned testing of your web app and API, with a report and a free retest.',
    who: 'AI startups shipping a web app and an API, who want it tested by a person and not just a scanner.',
    gets: [
      'Manual testing aligned with the OWASP standards',
      'Authentication, business-logic and access-control depth on Comprehensive',
      'A report with remediation guidance, and a walkthrough call on Comprehensive',
      'A free retest to confirm the fixes held',
      'Recurring quarterly tests and a live finding tracker on Ongoing',
    ],
    steps: [
      { title: 'Scope', body: 'We agree what is tested, on which dates, and what is off limits, in writing.' },
      { title: 'Test', body: 'We test your app and API by hand.' },
      { title: 'Report', body: 'You get findings with a risk rating and a fix for each one.' },
      { title: 'Retest', body: 'After you fix, we test again to confirm.' },
    ],
    faq: [
      {
        q: 'How long does a test take?',
        a: 'About 1–2 weeks for Essential and about 2–3 weeks for Comprehensive.',
      },
      {
        q: 'Do you test mobile apps or infrastructure?',
        a: 'Not unless we agree it. Anything outside the agreed scope is scoped and quoted separately.',
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes. Security work starts with an NDA and written rules of engagement. See how we handle your data.',
      },
    ],
    notIncluded: 'Anything outside the agreed scope, such as other apps, infrastructure or mobile builds.',
  },
]

export const bySlug = (slug: string) => SERVICES.find((s) => s.slug === slug)
