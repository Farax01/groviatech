import Link from 'next/link'
import { FAQ, QUOTE_NOTES, STEPS } from './content'

export function QuoteTerms() {
  return (
    <section className="pr-section" data-reveal aria-labelledby="quote-h">
      <div className="wrap">
        <h2 id="quote-h">How quotes and payment work</h2>
        <dl className="pr-terms">
          {QUOTE_NOTES.map((n) => (
            <div key={n.title}>
              <dt>{n.title}</dt>
              <dd>{n.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function Steps() {
  return (
    <section className="pr-section" data-reveal aria-labelledby="steps-h">
      <div className="wrap">
        <h2 id="steps-h">How an engagement runs</h2>
        <ol className="pr-steps">
          {STEPS.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section className="pr-section" data-reveal aria-labelledby="faq-h">
      <div className="wrap pr-faq">
        <h2 id="faq-h">Questions we get asked</h2>
        <div>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FinalCta() {
  return (
    <section className="pr-final" data-reveal>
      <div className="wrap">
        <h2>Not sure which tier fits?</h2>
        <p>Book a free audit. We will tell you which one fits, or that you don’t need one.</p>
        <Link href="/contact" className="btn btn-light">
          Book a free audit
        </Link>
      </div>
    </section>
  )
}
