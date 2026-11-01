import type { Metadata } from 'next'
import { SITE } from '../shared-content'
import { ContactForm } from './ContactForm'
import './contact.css'

export const metadata: Metadata = {
  title: 'Book a free audit',
  description: 'Tell us about your site or app and we will tell you which tier fits.',
}

export default function ContactPage() {
  return (
    <section className="ct">
      <div className="wrap ct-grid">
        <div>
          <h1>Book a free audit</h1>
          <p>
            Tell us about your site or app and what worries you about it. We will reply by email with next steps, and
            a written quote before any work or payment.
          </p>
          <p className="ct-meta">
            Prefer email? <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <br />
            Based in {SITE.location}.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
