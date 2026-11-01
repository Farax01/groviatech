import type { Metadata } from 'next'
import { SITE } from '../shared-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What personal information Groviatech collects through this website and how it is used.',
}

/*
 * A plain-language draft based on how this site actually works today.
 * Checked against the contact form, the leads API, the database rules and the home page intro. Have it reviewed by someone
 * qualified before you rely on it, and update it when you add analytics or other tools.
 */
const SECTIONS = [
  {
    h: 'Who we are.',
    p: `This website is run by ${SITE.legalName}, based in ${SITE.location}. You can reach us at ${SITE.email}.`,
  },
  {
    h: 'What we collect.',
    p: 'When you send us the contact form, we collect your name, email address, company, what you are interested in, your message, and which page you sent it from. Our hosting provider also keeps standard technical logs, such as your IP address and browser type, to keep the site running and secure.',
  },
  {
    h: 'How we use it.',
    p: 'We use what you send us to reply to you, to prepare a quote, and to keep a record of our conversations. We do not sell your information.',
  },
  {
    h: 'Who can see it.',
    p: 'Form submissions are stored in a database run by our provider, Supabase. Only our team’s admin accounts can read them, and those accounts are protected by two-step verification. We reply to you by email, using Google’s Gmail service.',
  },
  {
    h: 'Where it is kept.',
    p: 'The site is hosted by Vercel. Supabase, Vercel and Google act as service providers for us. Their servers may be outside Nigeria, so your information can be processed in other countries.',
  },
  {
    h: 'How long we keep it.',
    p: 'We keep an enquiry for as long as we need it to answer you and to keep a record of our work together. If you ask us to delete it, we do.',
  },
  {
    h: 'Cookies and tracking.',
    p: 'This site does not use advertising cookies, and it does not currently run analytics. The home page uses your browser’s session storage to remember that you have already seen its opening animation. That note stays in your browser and is not sent to us. If we add analytics, we will say so here.',
  },
  {
    h: 'Your rights.',
    p: `As a company based in Nigeria, we handle personal data under the Nigeria Data Protection Act 2023. You can ask us to show you, correct or delete what we hold about you by emailing ${SITE.email}. If you are unhappy with how we handle it, you can also contact the Nigeria Data Protection Commission.`,
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
          <h1>Privacy policy.</h1>
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
