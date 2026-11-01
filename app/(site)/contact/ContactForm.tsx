'use client'

import { useEffect, useState } from 'react'
import { SITE } from '../shared-content'

export function ContactForm() {
  const [interest, setInterest] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('interest')
    if (!q) return

    const frame = window.requestAnimationFrame(() => setInterest(q.slice(0, 120)))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    const f = new FormData(e.currentTarget)
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: f.get('name'),
        email: f.get('email'),
        company: f.get('company'),
        interest: f.get('interest'),
        message: f.get('message'),
        source: 'contact page',
        website: f.get('website'),
      }),
    }).catch(() => null)

    if (res?.ok) return setStatus('done')
    const data = await res?.json().catch(() => null)
    setError(data?.error ?? `We couldn’t send your request. Check your connection and try again, or email ${SITE.email}.`)
    setStatus('idle')
  }

  if (status === 'done') {
    return (
      <div className="ct-done" role="status">
        <h2>We have your request</h2>
        <p>We will reply by email with next steps.</p>
      </div>
    )
  }

  return (
    <form className="ct-form" onSubmit={onSubmit}>
      <label>
        Your name
        <input name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        Email
        <input name="email" type="email" autoComplete="email" required maxLength={254} />
      </label>
      <label>
        Company
        <input name="company" autoComplete="organization" maxLength={160} />
      </label>
      <label>
        What are you interested in?
        <input name="interest" value={interest} onChange={(e) => setInterest(e.target.value)} maxLength={120} placeholder="For example: Secure Business, or not sure yet" />
      </label>
      <label>
        What should we know?
        <textarea name="message" rows={5} maxLength={4000} placeholder="Your site or app, and what worries you about it" />
      </label>
      {/* honeypot: real visitors never see or fill this in */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {error && (
        <p className="ct-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-solid" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send request'}
      </button>
    </form>
  )
}
