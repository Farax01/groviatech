/**
 * Runs Google PageSpeed Insights and returns the four scores.
 * The tests run concurrently; the median score reduces run-to-run variation.
 */
export type Scores = { performance: number; accessibility: number; bestPractices: number; seo: number }

export type AuditResult =
  | { ok: true; scores: Scores; runs: number; measuredOn: string }
  | { ok: false; error: string }

const DEFAULT_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'] as const

export const isDomain = (domain: string) => /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain) && domain.length <= 120

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as Record<string, unknown> : null
}

export function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2)
}

export function parseScores(json: unknown): Scores {
  const lighthouse = asRecord(asRecord(json)?.lighthouseResult)
  const runtimeError = asRecord(lighthouse?.runtimeError)
  if (typeof runtimeError?.message === 'string') {
    throw new Error(`Google could not load the page (${runtimeError.message}).`)
  }

  const categories = asRecord(lighthouse?.categories)
  const percentage = (key: string) => {
    const score = asRecord(categories?.[key])?.score
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 1) {
      throw new Error('Google’s reply was missing a valid score.')
    }
    return Math.round(score * 100)
  }

  return {
    performance: percentage('performance'),
    accessibility: percentage('accessibility'),
    bestPractices: percentage('best-practices'),
    seo: percentage('seo'),
  }
}

export async function auditSite(
  domain: string,
  device: 'mobile' | 'desktop',
  opts: { apiKey: string; endpoint?: string; fetchImpl?: typeof fetch; runs?: number },
): Promise<AuditResult> {
  if (!isDomain(domain)) return { ok: false, error: 'Enter the website domain first, for example example.com.' }
  if (device !== 'mobile' && device !== 'desktop') return { ok: false, error: 'Choose mobile or desktop for the test.' }

  const url = new URL(opts.endpoint ?? DEFAULT_ENDPOINT)
  url.searchParams.set('url', `https://${domain}/`)
  url.searchParams.set('strategy', device)
  url.searchParams.set('key', opts.apiKey)
  for (const category of CATEGORIES) url.searchParams.append('category', category)

  const doFetch = opts.fetchImpl ?? fetch
  const run = async (): Promise<Scores> => {
    const response = await doFetch(url, { signal: AbortSignal.timeout(55_000), cache: 'no-store' })
    if (response.status === 429) throw new Error('QUOTA')
    if (!response.ok) {
      let detail = ''
      try {
        const errorBody = asRecord(await response.json())
        const error = asRecord(errorBody?.error)
        detail = typeof error?.message === 'string' ? error.message : ''
      } catch {
        // The status code below still provides an actionable failure if the response is not JSON.
      }
      if (response.status === 400 || response.status === 403) {
        throw new Error(`Google refused the request: ${detail || response.status}`)
      }
      throw new Error(`Google returned an error (${response.status}).`)
    }
    return parseScores(await response.json())
  }

  const runCount = opts.runs ?? 3
  const settled = await Promise.allSettled(Array.from({ length: runCount }, run))
  const successful = settled
    .filter((result): result is PromiseFulfilledResult<Scores> => result.status === 'fulfilled')
    .map((result) => result.value)

  if (successful.length === 0) {
    const firstError = settled.find((result): result is PromiseRejectedResult => result.status === 'rejected')
    const message = firstError?.reason instanceof Error ? firstError.reason.message : 'Unknown error.'
    if (message === 'QUOTA') {
      return { ok: false, error: 'Google’s free test limit has been reached for now. Wait a few minutes and try again.' }
    }
    if (firstError?.reason instanceof Error && firstError.reason.name === 'TimeoutError') {
      return { ok: false, error: 'Google took too long to test the site. Try again.' }
    }
    return { ok: false, error: message }
  }

  return {
    ok: true,
    runs: successful.length,
    measuredOn: new Date().toISOString().slice(0, 10),
    scores: {
      performance: median(successful.map((score) => score.performance)),
      accessibility: median(successful.map((score) => score.accessibility)),
      bestPractices: median(successful.map((score) => score.bestPractices)),
      seo: median(successful.map((score) => score.seo)),
    },
  }
}
