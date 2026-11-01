export const TRACKS = [
  { id: 'web_dev' },
  { id: 'sme_security' },
  { id: 'ai_startup' },
] as const

export type Track = (typeof TRACKS)[number]['id']

export type Tier = {
  id: string
  track: Track
  name: string
  price_prefix: string | null
  price_label: string
  price_suffix: string | null
  audience: string | null
  features: string[]
  highlighted: boolean
  highlight_label: string | null
  cta_label: string
  cta_href: string
  sort_order: number
  published: boolean
  updated_at: string
}
