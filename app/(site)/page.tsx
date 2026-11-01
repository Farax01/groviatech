import type { Metadata } from 'next'
import Link from 'next/link'
import { ArmTile } from '@/components/ArmTile'
import { LogoIntro } from '@/components/LogoIntro'
import { LiveFounderNote, LiveHeroStrip, LiveTeamGrid, LiveTestimonials, LiveWorkGrid } from '@/components/LiveSections'
import { ReportExcerpt } from '@/components/ReportExcerpt'
import { RiskSection, WhyUsSection } from '@/components/WhySections'
import {
  AuditSteps,
  ClosingCta,
  Credentials,
  DataHandling,
  Faq,
  Research,
  WhereWeAre,
} from '@/components/Sections'
import { OFFERS, PRINCIPLES } from './home-content'
import { AVAILABILITY, NDA_NOTE } from './shared-content'
import './home.css'

export const metadata: Metadata = {
  title: { absolute: 'Groviatech: secure websites and security testing' },
  description:
    'Groviatech builds websites for small businesses and startups with security in every build, and tests the sites you already run.',
}

export default function HomePage() {
  return (
    <>
      <LogoIntro />
      <section className="hm-hero">
        <div className="wrap">
          {AVAILABILITY.show && (
            <p className="hm-avail">
              <span aria-hidden="true" />
              {AVAILABILITY.text}
            </p>
          )}
          <h1>
            Websites built to be <span className="hm-blue">safe to run.</span>
          </h1>
          <p className="hm-lede">
            Groviatech Solutions Ltd builds sites for small businesses and startups, with security work in every build. The same team
            also tests the sites you already run.
          </p>
          <div className="hm-actions">
            <Link href="/contact" className="btn btn-solid">
              Book a free audit
            </Link>
            <Link href="/pricing" className="btn">
              See pricing
            </Link>
          </div>
          <WhereWeAre />
        </div>
        <LiveHeroStrip />
      </section>

      <RiskSection />
      <WhyUsSection />

      <section className="hm-act" data-reveal aria-labelledby="report-h">
        <div className="wrap">
          <div className="hm-stage">
            <div>
              <h2 id="report-h">Reports you can read.</h2>
              <p className="hm-lead">
                Findings come in plain English, with a risk rating and what to do about each one. Not a scanner dump.
              </p>
              <p className="hm-nda">{NDA_NOTE}</p>
              <div className="hm-row">
                <a href="/sample-security-report.pdf" className="btn btn-solid" download>
                  Download the sample report<span className="sr-only"> (PDF)</span>
                </a>
                <Link href="/services/website-security" className="btn btn-soft">
                  See the Security Check
                </Link>
              </div>
            </div>
            <ReportExcerpt />
          </div>
        </div>
      </section>

      <section className="hm-act" data-reveal aria-labelledby="offers-h">
        <div className="wrap">
          <h2 id="offers-h" className="hm-h2">
            Three ways to work with us.
          </h2>
          <p className="hm-lead hm-after-h">
            Starting a site, protecting one you already have, or shipping an AI product? Pick where you are.
          </p>
          <ul className="hm-cards">
            {OFFERS.map((o) => (
              <li key={o.track} className="hm-card">
                <ArmTile arm={o.arm} />
                <h3>{o.title}</h3>
                <p className="hm-who">{o.who}</p>
                <p>{o.body}</p>
                <ol className="hm-path" aria-label="How it goes">
                  {o.path.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <Link href={o.href} className="btn btn-soft">
                  Learn more
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <AuditSteps />

      <section className="hm-act" data-reveal aria-labelledby="how-h">
        <div className="wrap">
          <h2 id="how-h" className="hm-h2">
            How we work.
          </h2>
          <div className="hm-principles">
            {PRINCIPLES.map((p) => (
              <div key={p.title}>
                <h3>{p.title}</h3>
                <p className="hm-lead">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-act" data-reveal id="work" aria-labelledby="work-h">
        <div className="wrap">
          <h2 id="work-h" className="hm-h2">
            Recent work.
          </h2>
          <p className="hm-lead hm-after-h">Sites we have built for clients.</p>
          <LiveWorkGrid limit={3} />
          <p className="hm-more">
            <Link href="/work" className="btn btn-soft">
              See all work
            </Link>
          </p>
        </div>
      </section>

      <LiveTestimonials />

      <section className="hm-act" data-reveal id="team" aria-labelledby="team-h">
        <div className="wrap">
          <h2 id="team-h" className="hm-h2">
            Who you will work with.
          </h2>
          <LiveFounderNote />
          <LiveTeamGrid />
          <Credentials />
          <Research />
        </div>
      </section>

      <DataHandling />
      <Faq />
      <ClosingCta />
    </>
  )
}
