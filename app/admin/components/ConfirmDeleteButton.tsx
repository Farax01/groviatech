'use client'

import { deletePricingTierAction } from '../actions'

export function ConfirmDeleteButton({ id }: Readonly<{ id: string }>) {
  return (
    <form
      action={deletePricingTierAction}
      onSubmit={(event) => {
        if (!window.confirm('Delete this pricing tier? This cannot be undone.')) event.preventDefault()
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="adm-link adm-danger adm-delete" type="submit">Delete tier</button>
    </form>
  )
}
