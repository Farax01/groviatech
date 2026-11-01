import { renderOg } from '@/lib/og'

export const alt = 'Groviatech: websites built to be safe to run'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return renderOg('Websites built to be safe to run.', 'Web development and security testing')
}
