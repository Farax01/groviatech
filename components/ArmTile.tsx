/* A 30%-radius squircle tile holding the Groviatech mark with one arm picked out in ink.
   The same three arms are the track selector on the pricing page. */
const ARMS = {
  top: 'M113.06 255.91L113.06 209.12M125.23 209.12L100.89 209.12',
  left: 'M114.49 252.79L68.39 292.52M60.44 283.30L76.34 301.74',
  right: 'M111.63 252.79L158.81 293.39M150.87 302.61L166.75 284.17',
} as const

export type Arm = keyof typeof ARMS

export function ArmTile({ arm, size = 64 }: { arm: Arm; size?: number }) {
  return (
    <span className="sq" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="50 201 127 111" width={size * 0.62} height={size * 0.62 * (111 / 127)}>
        {(Object.keys(ARMS) as Arm[])
          .filter((a) => a !== arm)
          .map((a) => (
            <path key={a} d={ARMS[a]} fill="none" strokeWidth={6} style={{ stroke: '#c3cfdc' }} />
          ))}
        <path d={ARMS[arm]} className="arm-ink" pathLength={1} fill="none" strokeWidth={6} style={{ stroke: 'var(--ink)' }} />
      </svg>
    </span>
  )
}
