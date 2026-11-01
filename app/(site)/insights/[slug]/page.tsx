import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ReadingProgress } from '@/components/ReadingProgress'
import { ClosingCta } from '@/components/Sections'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import { SITE } from '../../shared-content'
import { POSTS, bySlug, formatDate } from '../insights-content'
import '../../home.css'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = bySlug((await params).slug)
  if (!p || (!p.published && !SHOW_PLACEHOLDERS)) return {}
  return {
    title: p.title,
    description: p.description,
    openGraph: { type: 'article', publishedTime: p.date },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = bySlug((await params).slug)
  if (!p || (!p.published && !SHOW_PLACEHOLDERS)) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    author: { '@type': 'Organization', name: SITE.legalName },
    publisher: { '@type': 'Organization', name: SITE.legalName },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <ReadingProgress />
      <article>
        <section className="hm-hero">
          <div className="wrap">
            <p className="hm-who">
              <Link href="/insights">Insights</Link> · {formatDate(p.date)} · {p.readMinutes} min read
              {!p.published && <span className="ph-tag">Draft</span>}
            </p>
            <h1 className="hm-post-h1">{p.title}</h1>
            <p className="hm-lede">{p.description}</p>
          </div>
        </section>
        <section className="hm-act">
          <div className="wrap hm-article">
            {p.blocks.map((b, i) => {
              if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>
              if (b.type === 'p') return <p key={i}>{b.text}</p>
              if (b.type === 'ul')
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                )
              return (
                <pre key={i} tabIndex={0}>
                  <code>{b.text}</code>
                </pre>
              )
            })}
          </div>
        </section>
      </article>
      <ClosingCta heading="Want us to look at your site?" />
    </>
  )
}
