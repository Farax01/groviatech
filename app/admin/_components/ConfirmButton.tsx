'use client'

import type { ReactNode } from 'react'

export function ConfirmButton({
  children,
  className,
  message,
}: {
  children: ReactNode
  className?: string
  message: string
}) {
  return (
    <button
      className={className}
      type="submit"
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
