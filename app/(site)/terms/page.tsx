import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Placeholder } from '@/components/Sections'
import { SHOW_PLACEHOLDERS, visible } from '@/lib/placeholders'
import { SITE, TERMS_PUBLISHED } from '../shared-content'
import '../home.css'

export const metadata: Metadata = {
  title: 'Terms of service',
  description: 'How Groviatech quotes, charges for and delivers its work.',
}

/*
 * A plain-language draft that follows the business decisions made so far: written quotes, 50% to start and 50% on delivery,
 * US dollars, and written rules before any security testing.
 * It returns a 404 until TERMS_PUBLISHED is true in shared-content.ts. Have a lawyer read it first, and settle the
 * liability and governing-law section, which is a placeholder because those choices are not yours to guess.
 */
const SECTIONS: { h: string; p: string; placeholder?: boolean }[] = [
  {
    h: 'What these terms cover.',
    p: `These terms cover how ${SITE.legalName} quotes, charges for and delivers its work. Once you sign an agreement with us, that agreement comes first for the work it covers.`,
  },
  {
    h: 'Quotes.',
    p: 'After a free audit we send a written quote with a price and a timeline. Nothing starts until you accept it. A price marked “from” on the pricing page is where that tier starts, and your quote is the price that applies.',
  },
  {
    h: 'Payment.',
    p: 'We ask for half to start and half on delivery. Prices are in US dollars unless your quote says otherwise.',
  },
  {
    h: 'Security testing.',
    p: 'We only test systems that you own or are allowed to have tested. Before any testing we agree written rules with you: what is in scope, what is not, and when we will test. We stay inside them.',
  },
  {
    h: 'Reports and confidentiality.',
    p: 'Reports go to the people you name. We do not publish or share your findings, or your name as a client, without your written permission.',
  },
  {
    h: 'What you need to do.',
    p: 'Give us accurate information and the access we agree on, and tell us about changes to your site or systems that could affect the work.',
  },
  {
    h: 'What testing can and cannot tell you.',
    p: 'A security test shows what we found at the time we tested. It cannot promise that a site has no weaknesses. A retest confirms that the fixes we checked now work.',
  },
  {
    h: 'Liability and governing law.',
    p: 'To be written with a lawyer: how far our responsibility goes, and which country’s law applies.',
    placeholder: true,
  },
  {
    h: 'Changes.',
    p: 'We will update this page if our terms change. Last updated: October 2026.',
  },
]

export default function TermsPage() {
  if (!TERMS_PUBLISHED && !SHOW_PLACEHOLDERS) notFound()
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>Terms of service.</h1>
          <p className="hm-lede">How we quote, charge for and deliver our work.</p>
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
        </div>
      </section>
    </>
  )
}
