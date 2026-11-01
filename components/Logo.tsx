/* The Groviatech Solutions Limited logo, as vector files in /public/logo.
   variant "header": icon + GROVIATECH wordmark (used in the navbar).
   variant "full": adds "Solutions Limited" and the tagline (used in the footer).
   tone "white": all-white version for dark backgrounds. */
const RATIO = { header: 352 / 100, full: 382 / 100 } as const

export function Logo({
  variant = 'full',
  tone = 'color',
  height = 48,
  className = '',
}: {
  variant?: 'header' | 'full'
  tone?: 'color' | 'white'
  height?: number
  className?: string
}) {
  const file = `/logo/groviatech-logo-${variant}${tone === 'white' ? '-white' : ''}.svg`
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file}
      alt="Groviatech Solutions Limited"
      width={Math.round(height * RATIO[variant])}
      height={height}
      className={className}
    />
  )
}
