import type { Metadata } from 'next'
import { ClosingCta } from '@/components/Sections'
import { Placeholder } from '@/components/Sections'
import { visible } from '@/lib/placeholders'
import { NDA_NOTE, SITE } from '../shared-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'How we handle your data',
  description: 'How Groviatech handles client access, findings and data during security work, and how to report a problem with our own site.',
}

/* CONFIRM every statement on this page matches what you will actually do and put in your contracts. */
const SECTIONS: { h: string; p: string; placeholder?: boolean }[] = [
  {
    h: 'Agreement first.',
    p: 'Every engagement starts with a signed agreement. For security testing, that includes an NDA, written rules of engagement and data processing terms. The rules of engagement fix the scope, the dates and anything that is off limits.',
  },
  {
    h: 'Only what is in scope.',
    p: 'We test the systems named in the rules of engagement, on the dates we agree, and nothing else. If we think something outside the scope needs attention, we ask you before touching it.',
  },
  {
    h: 'The access we ask for.',
    p: 'We ask for the least access we need. Where possible we use test accounts rather than real customer accounts, and we ask you to remove our access when the work ends.',
  },
  {
    h: 'Credentials.',
    p: 'We ask you for test accounts instead of real customer logins, and we only use a credential for the work you hired us to do. Share them with us the way we agree in the rules of engagement, never in a plain email, and remove or change them when the work ends.',
  },
  {
    h: 'Findings go to you.',
    p: 'Reports go to the contacts you name. We do not publish or share your findings, or your name, without your written permission.',
  },
  {
    h: 'Why we do not show real reports.',
    p: `${NDA_NOTE} The sample report on our home page is written the same way as a real one.`,
  },
  {
    h: 'How long we keep your files.',
    p: 'To be decided: how long we keep your reports and test data after the work ends, and how we delete them. Write the real policy here before launch.',
    placeholder: true,
  },
  {
    h: 'If we find something serious.',
    p: 'If we find a critical issue, we tell you straight away instead of waiting for the final report.',
  },
]

export default function SecurityPage() {
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>How we handle your data.</h1>
          <p className="hm-lede">What we do, and what we ask, when we work on your site or your app.</p>
        </div>
      </section>

      <section className="hm-act">
        <div className="wrap hm-prose">
          {visible(SECTIONS).map((s) => (
            <div key={s.h} className={s.placeholder ? 'is-ph' : undefined}>
              <h2 className="hm-h2">{s.h}</h2>
              <p className="hm-lead">
                {s.p} {s.placeholder && <Placeholder />}
              </p>
            </div>
          ))}
          <div>
            <h2 className="hm-h2">Report a problem with our site.</h2>
            <p className="hm-lead">
              If you find a security problem on this website, email{' '}
              <a href={`mailto:${SITE.email}?subject=Security%20report`}>{SITE.email}</a> with the subject “Security
              report”. We read every report and reply by email.
            </p>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  )
}
