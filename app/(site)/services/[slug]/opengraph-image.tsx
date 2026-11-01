import { renderOg } from '@/lib/og'
import { SERVICES, bySlug } from '../services-content'

export const alt = 'A Groviatech service'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const s = bySlug((await params).slug)
  return renderOg(s?.name ?? 'Services', 'Services')
}
