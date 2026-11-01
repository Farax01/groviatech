import type { Track } from '@/lib/types'

/*
 * Words on the pricing page that are not stored in the admin.
 * Everything here is a business statement: read it once and change anything that isn't true for you.
 */

export const TRACK_COPY: Record<
  Track,
  { name: string; blurb: string; heading: string; who: string; notIncluded: string }
> = {
  web_dev: {
    name: 'Web development',
    blurb: 'Sites built to be safe to run',
    heading: 'Web development for US small businesses',
    who: 'A site that is safe to run, whether it is five pages or a customer portal. Security work is part of every tier, not an add-on.',
    notIncluded:
      'Domain and hosting fees. Copywriting and photography, unless we agree them in your quote. Care after your support period ends: Secure Care, under website security, covers that.',
  },
  sme_security: {
    name: 'Website security',
    blurb: 'Check, fix and protect a site you already have',
    heading: 'Website security for small businesses',
    who: 'Already have a site? Find out where it is exposed, get it fixed and keep it protected. You do not need to rebuild with us.',
    notIncluded:
      'A Security Check reports problems but does not fix them; fixing is its own tier. Formal compliance certification, such as PCI DSS or SOC 2, is not part of these tiers.',
  },
  ai_startup: {
    name: 'AI startup security',
    blurb: 'Manual testing of web apps and APIs',
    heading: 'Security testing for AI startups',
    who: 'Manual, OWASP-aligned testing of your web app and API, with a report your engineers can act on and a retest to confirm the fixes.',
    notIncluded:
      'Anything outside the agreed scope, such as other apps, infrastructure or mobile builds, is scoped and quoted separately.',
  },
}

export const QUOTE_NOTES = [
  {
    title: 'What “from” means',
    body: 'A price marked “from” is where that tier starts. After a short call about what you need, you get a written fixed price before any work begins.',
  },
  {
    title: 'How you pay',
    body: 'You pay 50% to start the work and 50% on delivery. Prices are in US dollars.',
  },
  {
    title: 'Between tiers',
    body: 'Need something in between, or more than one app? Book a free audit and we will scope it with you.',
  },
]

export const STEPS = [
  { title: 'Book a free audit', body: 'Tell us about your site or app and what worries you about it.' },
  { title: 'Get a written quote', body: 'A fixed price and timeline, before any payment.' },
  { title: 'We do the work', body: 'We build, test or fix, depending on your track. 50% is due to start.' },
  { title: 'Delivery and support', body: 'You get the site or report, plus the support or retest your tier includes.' },
]

export const FAQ = [
  {
    q: 'What’s the difference between a Security Check and a penetration test?',
    a: 'A Security Check is a standard audit of an existing business website, with a plain-English report. A penetration test is deeper, manual testing of a web app and its API, built for AI startups and other software teams.',
  },
  {
    q: 'Can I buy security without a new website?',
    a: 'Yes. Security Check, Fix & Harden and Secure Care are all sold on their own, and you can start with any of them.',
  },
  {
    q: 'Do the AI startup tiers include a retest?',
    a: 'Essential and Comprehensive each include one free retest, and Ongoing includes retests as part of the schedule.',
  },
  {
    q: 'How do payments work?',
    a: 'You pay 50% to start and 50% on delivery, in US dollars. You get the written quote before you pay anything.',
  },
  {
    q: 'What happens after I book a free audit?',
    a: 'We look at what you have and what you need, and tell you which tier fits. If you want to go ahead, you get a written quote before any work or payment.',
  },
]
