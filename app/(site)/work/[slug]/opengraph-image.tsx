import { renderOg } from '@/lib/og'
import { CASE_STUDIES, caseStudy } from '../case-studies'

export const alt = 'A Groviatech case study'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const c = caseStudy((await params).slug)
  return renderOg(c?.title ?? 'Case study', 'Case study')
}
