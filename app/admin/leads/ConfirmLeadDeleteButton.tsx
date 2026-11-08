'use client'

import { permanentlyDeleteLeadAction } from '../actions'

export function ConfirmLeadDeleteButton({ id }: Readonly<{ id: string }>) {
  return (
    <form
      action={permanentlyDeleteLeadAction}
      onSubmit={(event) => {
        if (!window.confirm('Permanently delete this lead? This cannot be undone.')) event.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="adm-link adm-danger" type="submit">Delete permanently</button>
    </form>
  )
}
