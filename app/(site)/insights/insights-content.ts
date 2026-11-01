import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'

/*
 * Articles for /insights. To add one, add an entry to POSTS and set published: true.
 * Until at least one post is published, /insights returns a 404 in production and its footer link stays hidden.
 * Unpublished posts show with a "Draft" tag while you build and never go live by accident.
 *
 * Write about things you have actually done or checked. Never include a real client's name or findings: they are covered by NDAs.
 */
export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'code'; text: string }

export type Post = {
  slug: string
  title: string
  description: string
  date: string // YYYY-MM-DD
  readMinutes: number
  published: boolean
  blocks: Block[]
}

export const POSTS: Post[] = [
  {
    slug: 'security-headers-small-business-sites',
    title: 'Six security headers every small-business website should send',
    description:
      'What each of six standard HTTP security headers does, a safe starting value for each, and how to set them on a Next.js site.',
    date: '2026-10-25',
    readMinutes: 5,
    published: false, // a draft written for you to review: read it, correct it, then set this to true
    blocks: [
      {
        type: 'p',
        text: 'When your browser loads a website, the server sends back the page and also a set of instructions called headers. A handful of them tell the browser how carefully to treat the page. They cost nothing to add, they close off whole categories of attack, and plenty of small-business sites still do not send them.',
      },
      {
        type: 'p',
        text: 'These are six worth having. Treat the values below as a safe starting point, then test your own site, because a header that is too strict can break a page that worked.',
      },
      { type: 'h2', text: '1. Strict-Transport-Security' },
      {
        type: 'p',
        text: 'This tells the browser to use HTTPS for your site and never fall back to plain HTTP. It stops someone on the same coffee-shop network from quietly downgrading a visitor’s connection.',
      },
      { type: 'code', text: 'Strict-Transport-Security: max-age=63072000; includeSubDomains' },
      {
        type: 'p',
        text: 'Only add includeSubDomains if every subdomain you own works over HTTPS, because the browser will refuse the others.',
      },
      { type: 'h2', text: '2. Content-Security-Policy' },
      {
        type: 'p',
        text: 'This lists where the page is allowed to load scripts, styles and images from. If an attacker manages to inject a script into your page, a good policy stops the browser from running it. It is the most powerful header on this list and the easiest to get wrong, so build it up in report-only mode first.',
      },
      {
        type: 'code',
        text: "Content-Security-Policy-Report-Only: default-src 'self'; img-src 'self' data:",
      },
      { type: 'h2', text: '3. X-Content-Type-Options' },
      {
        type: 'p',
        text: 'Browsers sometimes guess what kind of file they have been sent, and attackers use that guessing to get a harmless-looking upload treated as a script. This header turns the guessing off.',
      },
      { type: 'code', text: 'X-Content-Type-Options: nosniff' },
      { type: 'h2', text: '4. Referrer-Policy' },
      {
        type: 'p',
        text: 'When a visitor clicks a link, the browser can tell the next site which page they came from, including parts of the address. Addresses sometimes contain things that should stay private, such as a reset token. This limits what is shared.',
      },
      { type: 'code', text: 'Referrer-Policy: strict-origin-when-cross-origin' },
      { type: 'h2', text: '5. Permissions-Policy' },
      {
        type: 'p',
        text: 'This switches off browser features your site does not use, such as the camera, microphone and location, so a compromised script cannot ask for them.',
      },
      { type: 'code', text: 'Permissions-Policy: camera=(), microphone=(), geolocation=()' },
      { type: 'h2', text: '6. Clickjacking protection' },
      {
        type: 'p',
        text: 'Clickjacking is when another site loads yours in an invisible frame and tricks visitors into clicking buttons they cannot see. The modern fix is the frame-ancestors rule, which you add to the enforced Content-Security-Policy (browsers ignore it in report-only mode). The older X-Frame-Options header does the same job and is simple to set today, and it is fine to send both.',
      },
      { type: 'code', text: 'X-Frame-Options: DENY' },
      { type: 'h2', text: 'Setting them on a Next.js site' },
      {
        type: 'p',
        text: 'In Next.js you can send headers for every page from next.config.ts:',
      },
      {
        type: 'code',
        text: "const securityHeaders = [\n  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },\n  { key: 'X-Content-Type-Options', value: 'nosniff' },\n  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },\n  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },\n  { key: 'X-Frame-Options', value: 'DENY' },\n]\n\nconst nextConfig = {\n  async headers() {\n    return [{ source: '/:path*', headers: securityHeaders }]\n  },\n}\n\nexport default nextConfig",
      },
      {
        type: 'p',
        text: 'Add the Content-Security-Policy separately once you have tested it in report-only mode. After deploying, load your site and check the response headers in your browser’s developer tools to confirm they arrived.',
      },
      { type: 'h2', text: 'What headers do not do' },
      {
        type: 'p',
        text: 'Headers are a cheap layer of defence. They do not fix a login page that allows unlimited password guesses, or a page that shows one customer’s data to another. Those are found by testing the site, which is what a security review is for.',
      },
    ],
  },
]

export const visiblePosts = () =>
  POSTS.filter((p) => p.published || SHOW_PLACEHOLDERS).sort((a, b) => b.date.localeCompare(a.date))

/** True once at least one post is public. Controls the footer link and whether /insights exists. */
export const INSIGHTS_LIVE = POSTS.some((p) => p.published)

export const bySlug = (slug: string) => POSTS.find((p) => p.slug === slug)

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
