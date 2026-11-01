'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { ConfirmButton } from '../../../_components/ConfirmButton'
import { deleteTestimonial, saveTestimonial, type SaveState } from '../actions'

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string | null
  permission_confirmed: boolean
  sort_order: number
  published: boolean
}

export function TestimonialEditor({ t }: { t: Testimonial }) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveTestimonial, {})
  const [quote, setQuote] = useState(t.quote)
  const [name, setName] = useState(t.name)
  const [role, setRole] = useState(t.role ?? '')
  const [permission, setPermission] = useState(t.permission_confirmed)
  const [published, setPublished] = useState(t.published)
  const isNew = !t.id

  return (
    <>
      <header className="adm-head">
        <p className="adm-crumb">
          <Link href="/admin/testimonials">Testimonials</Link>
        </p>
        <h1>{isNew ? 'Add a testimonial' : `Edit quote from ${t.name}`}</h1>
      </header>

      <div className="adm-editor">
        <form action={formAction} className="adm-card adm-form">
          <input type="hidden" name="id" value={t.id} />

          <label>
            Quote
            <textarea name="quote" value={quote} onChange={(e) => setQuote(e.target.value)} rows={5} maxLength={600} required />
            <span className="adm-hint">Their words, exactly as they said them. Do not edit a quote to make it sound better.</span>
          </label>
          <div className="adm-grid2">
            <label>
              Name
              <input name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
            </label>
            <label>
              Role or project
              <input name="role" value={role} onChange={(e) => setRole(e.target.value)} maxLength={160} />
            </label>
          </div>

          <label className="adm-check">
            <input
              type="checkbox"
              name="permission_confirmed"
              checked={permission}
              onChange={(e) => {
                setPermission(e.target.checked)
                if (!e.target.checked) setPublished(false)
              }}
            />
            This person has agreed to be quoted on the website
          </label>

          <div className="adm-grid2">
            <label>
              Order on the page
              <input name="sort_order" type="number" defaultValue={t.sort_order} />
              <span className="adm-hint">Lower numbers come first.</span>
            </label>
            <label className="adm-check">
              <input
                type="checkbox"
                name="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                disabled={!permission}
              />
              Show on the website
            </label>
          </div>

          {state.error && (
            <p className="adm-error" role="alert">
              {state.error}
            </p>
          )}
          <div className="adm-actions">
            <button className="adm-btn" disabled={pending}>
              {pending ? 'Saving…' : 'Save'}
            </button>
            <Link className="adm-btn adm-btn-quiet" href="/admin/testimonials">
              Cancel
            </Link>
          </div>
        </form>

        <aside className="adm-preview">
          <p className="adm-muted">Preview, close to how it reads on the site</p>
          <figure className="adm-quote">
            <blockquote>
              <p>{quote || 'The quote appears here.'}</p>
            </blockquote>
            <figcaption>
              <strong>{name || 'Name'}</strong>
              <span>{role}</span>
            </figcaption>
          </figure>
          {!isNew && (
            <form action={deleteTestimonial} className="adm-delete">
              <input type="hidden" name="id" value={t.id} />
              <ConfirmButton className="adm-link adm-danger" message="Delete this testimonial? This cannot be undone.">
                Delete this testimonial
              </ConfirmButton>
            </form>
          )}
        </aside>
      </div>
    </>
  )
}
