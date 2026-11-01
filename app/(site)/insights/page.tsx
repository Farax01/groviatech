import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ClosingCta } from '@/components/Sections'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import { INSIGHTS_LIVE, formatDate, visiblePosts } from './insights-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Plain-English articles on website security and secure web development from the Groviatech team.',
}

export default function InsightsPage() {
  if (!INSIGHTS_LIVE && !SHOW_PLACEHOLDERS) notFound()
  const posts = visiblePosts()
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>Insights.</h1>
          <p className="hm-lede">Plain-English notes on website security and building sites that hold up.</p>
        </div>
      </section>
      <section className="hm-act">
        <div className="wrap">
          <ul className="hm-posts">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="hm-post">
                  <span className="hm-who">
                    {formatDate(p.date)} · {p.readMinutes} min read
                    {!p.published && <span className="ph-tag">Draft</span>}
                  </span>
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
