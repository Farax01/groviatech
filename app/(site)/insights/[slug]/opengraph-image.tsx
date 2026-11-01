import { renderOg } from '@/lib/og'
import { POSTS, bySlug } from '../insights-content'

export const alt = 'A Groviatech article'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug)
  return renderOg(p?.title ?? 'Insights', 'Insights')
}
