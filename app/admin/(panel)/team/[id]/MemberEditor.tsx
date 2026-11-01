'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { ConfirmButton } from '../../../_components/ConfirmButton'
import { deleteMember, saveMember, type SaveState } from '../actions'

export type Member = {
  id: string
  name: string
  role: string
  note: string | null
  photo_url: string | null
  link_label: string | null
  link_href: string | null
  sort_order: number
  published: boolean
}

export function MemberEditor({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveMember, {})
  const [name, setName] = useState(member.name)
  const [role, setRole] = useState(member.role)
  const [note, setNote] = useState(member.note ?? '')
  const [linkLabel, setLinkLabel] = useState(member.link_label ?? '')
  const [linkHref, setLinkHref] = useState(member.link_href ?? '')
  const isNew = !member.id

  return (
    <>
      <header className="adm-head">
        <p className="adm-crumb">
          <Link href="/admin/team">Team</Link>
        </p>
        <h1>{isNew ? 'Add a person' : `Edit ${member.name}`}</h1>
      </header>

      <form action={formAction} className="adm-card adm-form adm-narrow">
        <input type="hidden" name="id" value={member.id} />
        <input type="hidden" name="existing_photo" value={member.photo_url ?? ''} />

        <label>
          Name
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={120} required />
        </label>
        <label>
          Role
          <input name="role" value={role} onChange={(e) => setRole(e.target.value)} maxLength={160} required />
          <span className="adm-hint">For example “Application security engineer”.</span>
        </label>
        <label>
          Short note (optional)
          <input name="note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} />
          <span className="adm-hint">A line under the role, such as a certification. Only list what you hold.</span>
        </label>

        <div className="adm-grid2">
          <label>
            Link text (optional)
            <input name="link_label" value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)} maxLength={60} />
          </label>
          <label>
            Link address
            <input name="link_href" value={linkHref} onChange={(e) => setLinkHref(e.target.value)} maxLength={300} placeholder="https://" />
          </label>
        </div>

        <div>
          <label>
            Photo (optional)
            <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" />
            <span className="adm-hint">JPG, PNG or WebP, 5 MB or smaller. It shows in black and white, cropped to a square.</span>
          </label>
          {member.photo_url && (
            <div className="adm-photo-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="adm-thumb" src={member.photo_url} alt={`Current photo of ${member.name}`} />
              <label className="adm-check">
                <input type="checkbox" name="remove_photo" /> Remove this photo
              </label>
            </div>
          )}
        </div>

        <div className="adm-grid2">
          <label>
            Order on the page
            <input name="sort_order" type="number" defaultValue={member.sort_order} />
            <span className="adm-hint">Lower numbers come first. The first person is the founder note.</span>
          </label>
          <label className="adm-check">
            <input type="checkbox" name="published" defaultChecked={member.published} />
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
          <Link className="adm-btn adm-btn-quiet" href="/admin/team">
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <form action={deleteMember} className="adm-delete">
          <input type="hidden" name="id" value={member.id} />
          <ConfirmButton className="adm-link adm-danger" message={`Delete ${member.name}? This cannot be undone.`}>
            Delete this person
          </ConfirmButton>
        </form>
      )}
    </>
  )
}
