import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'

export type CaseStudy = {
  slug: string
  domain: string
  published: boolean
  client: string
  sector: string
  title: string
  summary: string
  stack: string[]
  built: string[]
  brief?: string
  approach?: string
  outcome?: string
  quote?: { text: string; name: string; role: string }
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
      'We built the website for PMV Meme, a Solana meme coin: live price statistics, a meme generator that runs in the browser, a mini-game, wallet connection and a tokenomics page.',
    stack: ['Solana', 'Web3', 'DexScreener API', 'Canvas'],
    built: [
      'Live price statistics pulled from the DexScreener API',
      'A canvas-based meme generator that runs in the browser',
      'A mini-game that runs in the browser',
      'Wallet integration',
      'A tokenomics display',
    ],
  },
]

export const caseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)
export const caseStudyForDomain = (domain: string) => CASE_STUDIES.find((c) => c.domain === domain)
export const caseStudyLive = (c: { published: boolean }) => c.published || SHOW_PLACEHOLDERS
