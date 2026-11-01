import type { MetadataRoute } from 'next'
import { INSIGHTS_LIVE, POSTS } from './(site)/insights/insights-content'
import { SERVICES } from './(site)/services/services-content'
import { CASE_STUDY, TERMS_PUBLISHED } from './(site)/shared-content'
import { CASE_STUDIES } from './(site)/work/case-studies'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://groviatech.vercel.app'

// Only pages that are live are listed: a page that returns a 404 (Terms, the case study and Insights, until you publish them) is left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/work',
    '/pricing',
    '/contact',
    '/security',
    '/privacy-policy',
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...(CASE_STUDY.published ? [`/work/${CASE_STUDY.slug}`] : []),
    ...CASE_STUDIES.filter((c) => c.published).map((c) => `/work/${c.slug}`),
    ...(TERMS_PUBLISHED ? ['/terms'] : []),
    ...(INSIGHTS_LIVE ? ['/insights', ...POSTS.filter((p) => p.published).map((p) => `/insights/${p.slug}`)] : []),
  ]
  return paths.map((path) => ({ url: `${BASE}${path === '/' ? '' : path}` }))
}
