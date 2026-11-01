import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'

/**
 * A screenshot in a plain browser frame, with a slow scroll-through on hover.
 * Add screenshots in the admin (Projects), or put a file in /public and set its path. Use a tall, full-page capture about
 * 1600 pixels wide: the page inside the frame scrolls from the top to the bottom while the pointer is over it. An image no
 * taller than the frame (such as 1600 x 1000) just stays still. On touch screens it stays at the top.
 * With no image, an empty frame shows while you build and disappears in production.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  label = 'Screenshot',
}: {
  src?: string
  alt: string
  url: string
  label?: string
}) {
  if (!src && !SHOW_PLACEHOLDERS) return null
  return (
    <figure className="bf">
      <div className="bf-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{url}</span>
      </div>
      <div className="bf-view">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="bf-img" src={src} alt={alt} loading="lazy" decoding="async" />
        ) : (
          <span className="bf-empty">
            {label} goes here <span className="ph-tag">Placeholder</span>
          </span>
        )}
      </div>
    </figure>
  )
}
