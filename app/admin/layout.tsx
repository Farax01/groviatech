import type { Metadata } from 'next'
import { Suspense } from 'react'
import './admin.css'

export const metadata: Metadata = {
  title: 'Groviatech admin',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="adm-root">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  )
}
