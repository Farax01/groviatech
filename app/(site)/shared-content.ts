/*
 * Facts and words used on several pages. Read once and correct anything that isn't true.
 * Items marked `placeholder: true` are dummy content: visible while you build,
 * hidden automatically in production (see lib/placeholders.ts).
 */

export const SITE = {
  legalName: 'Groviatech Solutions Limited',
  email: 'groviatechh@gmail.com',
  location: 'Nigeria',
}

export type Person = {
  name: string
  role: string
  note?: string
  photo?: string
  link?: { href: string; label: string }
}

// Add `photo: '/team/name.jpg'` when you have one: it is shown in black and white.
export const TEAM: Person[] = [
  { name: 'Fouad Aransi', role: 'Founder and CEO', note: 'ISC2 Certified in Cybersecurity (CC)' },
  {
    name: 'Abdulmalik Adebayo',
    role: 'Application security engineer',
    link: { href: 'https://medium.com/@abdulmalikadebayo', label: 'Read his write-ups' },
  },
  { name: 'Feranmi Akinsanya', role: 'Head of Software', note: 'Fullstack Developer with over 2+ years in the industry' },
]

// Abdulmalik's credentials: four slots. Replace each placeholder with the real certificate and its verification link.
export const CREDENTIALS: { title: string; issuer: string; href: string; placeholder?: boolean }[] = [
  { title: 'ISC²® CC', issuer: 'ISC²®', href: '#', placeholder: false },
  { title: 'Google Cybersecurity Certified', issuer: 'Google', href: '#', placeholder: false },
  { title: 'ASCP', issuer: 'APIsec University', href: '#', placeholder: false },
  // { title: 'Certificate name', issuer: 'Issuing body', href: '#', placeholder: true },
]

// The Medium profile link is real. Add 2 or 3 article titles and links to list them under it.
export const RESEARCH = {
  profile: 'https://medium.com/@abdulmalikadebayo',
  articles: [
    { title: 'GraphQL Security Assessment from Exposed API Keys to SQL Injection', href: 'https://medium.com/@abdulmalikadebayo/graphql-security-assessment-from-exposed-api-keys-to-sql-injection-54e3bc785ca5?source=user_profile_page---------1-------------88df2e5ffa94------------------------', placeholder: false },
    { title: 'ShopLite CTF Full Web Penetration Test Writeup', href: 'https://medium.com/@abdulmalikadebayo/shoplite-ctf-full-web-penetration-test-writeup-820e3f0f5a8a?source=user_profile_page---------2-------------88df2e5ffa94------------------------', placeholder: false },
    { title: 'VulnBank Penetration Test Report', href: 'https://medium.com/@abdulmalikadebayo/vulnbank-penetration-test-report-39584c92069c?source=user_profile_page---------5-------------88df2e5ffa94------------------------', placeholder: false },
  ] as { title: string; href: string; placeholder?: boolean }[],
}

/* ---------- case study: set `published: true` once every placeholder below is replaced with the real thing ---------- */
export const CASE_STUDY = {
  published: false,
  slug: 'tc-janitorial',
  client: 'TC Janitorial',
  domain: 'tc-janitorial.com',
  title: 'TC Janitorial: a faster WordPress site.',
  intro: 'A WordPress site we optimized for speed, on Hostinger’s LiteSpeed hosting.',
  facts: [
    { label: 'Platform', value: 'WordPress' },
    { label: 'Hosting', value: 'Hostinger, LiteSpeed' },
    { label: 'Scope', value: 'Full speed optimization' },
  ],
  sections: [
    { heading: 'The problem.', body: 'Placeholder: describe in two sentences what was slow or wrong before you started.', placeholder: true },
    { heading: 'What we did.', body: 'Placeholder: list the three or four changes you made, in plain English.', placeholder: true },
    { heading: 'What the client got.', body: 'Placeholder: one or two sentences on the difference it made for the business.', placeholder: true },
  ],
  metrics: [
    { label: 'Mobile PageSpeed score', before: '00', after: '00', placeholder: true },
    { label: 'Load time', before: '0.0 s', after: '0.0 s', placeholder: true },
    { label: 'Largest Contentful Paint', before: '0.0 s', after: '0.0 s', placeholder: true },
  ],
  proofImage: undefined as string | undefined,
  proofNote: 'Placeholder: run the site through PageSpeed Insights before and after, and link or screenshot the results here.',
}

export const WORK: { domain: string; description?: string; category?: string; tags?: string[]; image?: string }[] = [
  {
    domain: 'tc-janitorial.com',
    description: 'A WordPress site, fully optimized for speed.',
    category: 'Local business',
    tags: ['WordPress', 'Local SEO', 'LiteSpeed', 'CRO'],
  },
  {
    domain: 'pmvmeme.com',
    description:
      'A full-featured Solana meme coin site with live DexScreener price stats, a canvas-based meme generator, a browser mini-game, wallet integration and a tokenomics display.',
    category: 'Web3, meme coin',
    tags: ['Solana', 'Web3', 'DexScreener API', 'Canvas'],
  },
  {
    domain: 'tedxosogbo.com.ng',
    description:
      'Major contributor to the official TEDxOsogbo event platform, built to handle event information, speaker showcases and community engagement at scale.',
    category: 'Event platform',
    tags: ['Web development', 'Event platform', 'Community', 'Performance'],
  },
  {
    domain: 'margimarketing.com',
    description:
      'A full agency website for a marketing firm, built to show the agency’s own design credibility while converting leads effectively.',
    category: 'Marketing agency',
    tags: ['Next.js', 'React', 'Lead gen', 'SEO'],
  },
  {
    domain: 'elan.crelivio.com',
    description:
      'A polished web platform for Crelivio’s flagship product line, focused on clean UX, a conversion-optimized layout and performance across all devices.',
    category: 'Web platform',
    tags: ['Next.js', 'React', 'Performance', 'CRO'],
  },
]

export const TESTIMONIALS = [
  { quote: 'Brooo. Your work on the website is looking niiiice! thank you for helping.', name: 'PMV Owner', role: 'PMV Meme, Web3 project' },
  { quote: 'Fouad i did check very good job!!!! Start Looks good.', name: 'Amit Margi', role: 'Top Cleaning' },
  {
    quote: 'Just heard from the leaders and they’re genuinely impressed with what we pulled off. That’s a big win guys! Honestly, thank you!',
    name: 'Obanijesu',
    role: 'TEDxOsogbo, event platform',
  },
  {
    quote: 'They were fast, strategic, and technical without the usual agency fluff. The end result was clean, clear, and conversion-focused.',
    name: 'Adebayo',
    role: 'Software delivery',
  },
]

export const NDA_NOTE =
  'We can’t show you real reports. Our clients’ security results are covered by signed NDAs, so the example here is invented.'

export const AVAILABILITY = { show: true, text: 'Booking security tests for December' }

export const TERMS_PUBLISHED = true

export const AUDIT_STEPS = [
  { title: 'Tell us about your site', body: 'Send us the form: your site or app, and what worries you about it.' },
  { title: 'We reply by email', body: 'We look at what you have and tell you which tier fits, or that you do not need one.' },
  { title: 'You get a written quote', body: 'A fixed price and timeline. Nothing starts before you have it.' },
  { title: 'Work begins', body: 'You sign the agreement and pay 50% to start. The other 50% is due on delivery.' },
]

export const DATA_POINTS = [
  {
    title: 'Agreement first.',
    body: 'Every engagement starts with a signed agreement. For security testing that includes an NDA, written rules of engagement and data processing terms.',
  },
  {
    title: 'Only what is in scope.',
    body: 'We test the systems named in the rules of engagement, on the dates we agree, and nothing else.',
  },
  {
    title: 'Findings go to you.',
    body: 'Reports go to the contacts you name. We do not publish or share your findings, or your name, without your written permission.',
  },
]

export const FAQ = [
  {
    q: 'Why work with a team based in Nigeria?',
    a: 'We are based in Nigeria, and we work with clients globally. You get a written quote and a signed agreement before any work starts, you pay 50% to begin, and the other 50% is due on delivery.',
  },
  {
    q: 'Do I need a new website to get security help?',
    a: 'No. Security Check, Fix & Harden and Secure Care are sold on their own, for sites you already have.',
  },
  {
    q: 'What do I get at the end of a security test?',
    a: 'A report in plain English with a risk rating and a fix for each finding. Penetration tests also include a free retest to confirm the fixes held.',
  },
  {
    q: 'Can I see a real report?',
    a: 'Not a client’s. Our security work is covered by signed NDAs, so we never share real findings or client names. What we can show you is a sample report, written the same way as a real one with everything in it invented, so you can see exactly what you would get.',
  },
  {
    q: 'Will you sign an NDA?',
    a: 'Yes. Security work starts with an NDA and written rules of engagement. You can read how we handle your data on the security page.',
  },
  {
    q: 'How do payments work?',
    a: 'You pay 50% to start and 50% on delivery, after you have the written quote.',
  },
  {
    q: 'What happens after I book a free audit?',
    a: 'We reply by email, tell you which tier fits, and send a written quote if you want to go ahead. There are no payments before that.',
  },
]

// A draft in Fouad's voice. Rewrite it so it sounds like you, and keep only what is true.
export const FOUNDER_NOTE = {
  heading: 'A note from Fouad.',
  paragraphs: [
    'I run Groviatech. My background is website development and defensive security: I am ISC2 Certified in Cybersecurity, and I interned in offensive security at HiiT PLC.',
    'We build your site, and we also look for what is wrong with it before someone else does. That is the whole idea.',
  ],
}
