/*
 * The words for the two home-page sections "Why does a website need a security audit?" and "Why work with Groviatech?".
 * Every number below comes from Verizon's 2026 Data Breach Investigations Report. Check it against the report before
 * changing, and update the year when a new edition comes out.
 */

export const RISK_SOURCE = {
  label: 'Verizon, 2026 Data Breach Investigations Report',
  href: 'https://www.verizon.com/business/resources/reports/dbir/',
  scope: 'more than 31,000 security incidents and 22,000 confirmed breaches in 145 countries',
}

export const RISK_STATS = [
  {
    value: '31%',
    body: 'of breaches began with an exploited software vulnerability. It is now the most common way in, ahead of stolen passwords for the first time in the report’s 19 years.',
  },
  {
    value: '48%',
    body: 'of breaches involved ransomware, where criminals lock or steal data and demand payment.',
  },
  {
    value: '48%',
    body: 'of breaches involved a third party, such as a supplier or a software provider the business relies on.',
  },
]

export const RISKS = [
  {
    title: 'Customer data exposed.',
    body: 'A page or API that sends more than it shows can hand out names, emails or orders to anyone who looks. Depending on where your customers live, you may have to tell them, and regulators, that it happened.',
  },
  {
    title: 'Accounts taken over.',
    body: 'A login with no limit on password guesses, or an admin area with weak protection, lets someone walk in as you. From there they can read orders, change prices or lock you out.',
  },
  {
    title: 'Your pages used against your visitors.',
    body: 'Injected code can quietly send visitors to scam sites or copy card details at checkout. Your customers see your brand on the problem.',
  },
  {
    title: 'Downtime and a damaged reputation.',
    body: 'A hacked site can go offline or get flagged by browsers and search engines, and spam sent from it can push your real email into junk folders. Fixing it takes time. Winning trust back takes longer.',
  },
]

export const WHY_US = [
  {
    title: 'One team builds and tests.',
    body: 'The people who build your site work alongside the application security engineer who tries to break it, so weaknesses are found while they are still cheap to fix.',
  },
  {
    title: 'A price before any work.',
    body: 'Our pricing is public, and every project starts with a written quote and timeline. You pay half to start and half on delivery.',
  },
  {
    title: 'Reports you can read.',
    body: 'Findings come in plain English, each with a risk rating and a fix. Penetration tests include a free retest to confirm the fixes held.',
  },
  {
    title: 'Clear rules before we test.',
    body: 'We sign an agreement and agree written rules before any security testing, and we never publish your findings, or your name as a client, without your permission.',
  },
]
