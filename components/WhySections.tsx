import Link from 'next/link'
import { RISKS, RISK_SOURCE, RISK_STATS, WHY_US } from '@/app/(site)/why-content'
import './why-sections.css'

/** "Why does a website need a security audit?": real figures, then the plain-English risks. */
export function RiskSection() {
  return (
    <section className="hm-act" data-reveal id="why-audit" aria-labelledby="why-audit-h">
      <div className="wrap">
        <h2 id="why-audit-h" className="hm-h2">
          Why does a website need a security audit?
        </h2>
        <p className="hm-lead hm-after-h">
          Attackers now get in through known software flaws more often than through stolen passwords. A flaw nobody has
          checked for is a flaw nobody has fixed.
        </p>

        <ul className="risk-stats">
          {RISK_STATS.map((stat) => (
            <li key={stat.value + stat.body}>
              <span className="risk-num">{stat.value}</span>
              <p>{stat.body}</p>
            </li>
          ))}
        </ul>
        <p className="risk-source">
          Source:{' '}
          <a href={RISK_SOURCE.href} target="_blank" rel="noopener noreferrer">
            {RISK_SOURCE.label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          , covering {RISK_SOURCE.scope}.
        </p>

        <h3 className="risk-sub">What a vulnerable site can cost you.</h3>
        <ul className="risk-grid">
          {RISKS.map((risk) => (
            <li key={risk.title}>
              <h4>{risk.title}</h4>
              <p>{risk.body}</p>
            </li>
          ))}
        </ul>

        <div className="risk-close">
          <p className="hm-lead">
            A security audit looks for these the way an attacker would, then tells you in plain English what to fix first.
          </p>
          <p className="risk-note">
            Not sure you need one? If your site takes payments, bookings, logins or customer details, you probably do. If it
            is a simple brochure page, we will tell you that instead.
          </p>
          <div className="hm-row">
            <Link href="/contact" className="btn btn-solid">
              Book a free audit
            </Link>
            <a href="/sample-security-report.pdf" className="btn btn-soft" download>
              See a sample report<span className="sr-only"> (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/** "Why work with Groviatech?": four points, each backed up elsewhere on the site. */
export function WhyUsSection() {
  return (
    <section className="hm-act" data-reveal id="why-us" aria-labelledby="why-us-h">
      <div className="wrap">
        <h2 id="why-us-h" className="hm-h2">
          Why work with Groviatech?
        </h2>
        <ul className="why-grid">
          {WHY_US.map((point) => (
            <li key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ul>
        <p className="why-link">
          <Link href="/security" className="btn btn-soft">
            How we handle your data
          </Link>
        </p>
      </div>
    </section>
  )
}
