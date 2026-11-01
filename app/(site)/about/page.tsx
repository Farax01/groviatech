import type { Metadata } from 'next'
import { LiveFounderNote, LiveTeamGrid } from '@/components/LiveSections'
import { ClosingCta, Credentials, Research, WhereWeAre } from '@/components/Sections'
import { SITE } from '../shared-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE.legalName} is a web development and security team based in ${SITE.location}.`,
}

const REASONS = [
  {
    title: 'One team builds and tests.',
    body: 'The people who build your site sit next to the people who try to find what is wrong with it. Nothing is handed over a wall.',
  },
  {
    title: 'Plain English, fixed prices.',
    body: 'You get a written quote before any work starts, and reports you can read without a security background.',
  },
  {
    title: 'Open about who we are.',
    body: `We are based in ${SITE.location} and work with clients in the United States. We say that up front, and we back it with a signed agreement and clear payment terms.`,
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>
            A small team that <span className="hm-blue">builds and tests.</span>
          </h1>
          <p className="hm-lede">
            {SITE.legalName} builds websites for small businesses and startups, and tests the sites they already run.
          </p>
          <WhereWeAre />
        </div>
      </section>

      <section className="hm-act" aria-labelledby="why-h">
        <div className="wrap">
          <h2 id="why-h" className="hm-h2">Why Groviatech.</h2>
          <div className="hm-principles hm-principles-3">
            {REASONS.map((r) => (
              <div key={r.title}>
                <h3>{r.title}</h3>
                <p className="hm-lead">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-act" aria-labelledby="team-h">
        <div className="wrap">
          <h2 id="team-h" className="hm-h2">The team.</h2>
          <LiveFounderNote />
          <LiveTeamGrid />
          <Credentials />
          <Research />
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
