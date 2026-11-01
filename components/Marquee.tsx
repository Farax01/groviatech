const ITEMS = [
  'Web development',
  'Website security',
  'Penetration testing',
  'Free retest',
  'Plain-English reports',
  'Written quotes',
]

/** A slow strip of what we do. It pauses on hover and stands still for visitors who ask for reduced motion. */
export function Marquee() {
  return (
    <div className="mq" role="group" aria-label="What we do">
      <div className="mq-run">
        <ul className="mq-list">
          {ITEMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ul className="mq-list" aria-hidden="true">
          {ITEMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
