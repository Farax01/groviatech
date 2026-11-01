import { renderOg } from '@/lib/og'

export const alt = 'Book a free audit with Groviatech'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg('Book a free audit.', 'Contact')
}
