import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'

/*
 * Case studies. To add one, add an entry below and set published: true when it is ready.
 * A case study returns a 404, and its "Read the case study" button stays hidden, until it is published.
 * While you build, anything marked "Placeholder" on the page is a gap to fill: say only what you can stand behind.
 * The screenshot and the PageSpeed scores come from the project in the admin (Admin → Projects), matched by domain.
 */
export type CaseStudy = {
  slug: string
  domain: string
  published: boolean
  client: string
  sector: string
  title: string
  summary: string
  stack: string[]
  duration?: string
  builtBy?: string
  built: string[]
  brief?: string // what the client needed
  approach?: string // what was hard, and how you handled it
  outcome?: string // real outcomes other than PageSpeed: launch results, traffic, anything measurable
  quote?: { text: string; name: string; role: string } // only with the client's permission
  disclaimer?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'pmvmeme',
    domain: 'pmvmeme.com',
    published: false,
    client: 'PMV Meme',
    sector: 'Web3, meme coin',
    title: 'A Solana meme coin site with live prices, a meme generator and a game.',
    summary:
      'PMV Meme needed a website to showcase its crypto project, and something to keep visitors engaged once they arrived. We built it from scratch in under a week, including a browser game that fits the project’s lore.',
    stack: ['Solana', 'Web3', 'DexScreener API', 'Canvas'],
    duration: 'Under a week',
    builtBy: 'Fouad Aransi',
    built: [
      'Live price statistics pulled from the DexScreener API',
      'A canvas-based meme generator that runs in the browser',
      'A “kill the infection” browser game, built around the project’s lore',
      'Wallet integration',
      'A tokenomics display',
    ],
    brief:
      'PMV Meme needed a website to showcase its crypto project, and something to keep visitors engaged once they arrived. There was nothing to build on except the original Patient 0 meme, so everything was designed and built from scratch. There was no deadline, but the site was finished in under a week.',
    approach:
      'The hardest part was the interactive game. We chose a “kill the infection” game because it matches the lore behind the project. One developer, Fouad, built the whole site in a week.',
    outcome: 'The site went live in under a week, and visitors started arriving straight after launch.',
    disclaimer: 'We built the website. Nothing on this page is financial advice.',
    // quote: { text: '...', name: '...', role: '...' }, // only once PMV Meme has agreed to it
  },
]

export const caseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)
export const caseStudyForDomain = (domain: string) => CASE_STUDIES.find((c) => c.domain === domain)
export const caseStudyLive = (c: { published: boolean }) => c.published || SHOW_PLACEHOLDERS
