import type { Metadata } from 'next'
import { SITE } from '../shared-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'What personal information Groviatech collects through this website and how it is used.',
}

/*
 * A plain-language draft based on how this site actually works today.
 * Have it reviewed by someone qualified before you rely on it, and update it when you add analytics or other tools.
 */
const SECTIONS = [
  {
    h: 'Who we are.',
    p: `This website is run by ${SITE.legalName}, based in ${SITE.location}. You can reach us at ${SITE.email}.`,
  },
  {
    h: 'What we collect.',
    p: 'When you send us the contact form, we collect your name, email address, company, what you are interested in, and your message. Our hosting provider also keeps standard technical logs, such as your IP address and browser type, to keep the site running and secure.',
  },
  {
    h: 'How we use it.',
    p: 'We use what you send us to reply to you, to prepare a quote, and to keep a record of our conversations. We do not sell your information.',
  },
  {
    h: 'Where it is kept.',
    p: 'Form submissions are stored in a database run by our provider, Supabase. The site is hosted by Vercel. Both act as service providers for us.',
  },
  {
    h: 'Cookies and tracking.',
    p: 'This site does not use advertising cookies, and it does not currently run analytics. If we add analytics, we will say so here.',
  },
  {
    h: 'Your choices.',
    p: `You can ask us to show you, correct or delete what we hold about you by emailing ${SITE.email}.`,
  },
  {
    h: 'Changes.',
    p: 'We will update this page if the way we handle information changes. Last updated: October 2026.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>Privacy.</h1>
          <p className="hm-lede">What we collect through this website, and what we do with it.</p>
        </div>
      </section>
      <section className="hm-act">
        <div className="wrap hm-prose">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="hm-h2">{s.h}</h2>
              <p className="hm-lead">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
