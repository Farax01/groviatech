import type { Metadata } from 'next'
import { LiveWorkGrid } from '@/components/LiveSections'
import { ClosingCta } from '@/components/Sections'
import '../home.css'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Websites Groviatech has built for clients.',
}

export default function WorkPage() {
  return (
    <>
      <section className="hm-hero">
        <div className="wrap">
          <h1>Work.</h1>
          <p className="hm-lede">Sites we have built for clients.</p>
        </div>
      </section>
      <section className="hm-act">
        <div className="wrap">
          <h2 className="sr-only">Projects</h2>
          <LiveWorkGrid />
        </div>
      </section>
      <ClosingCta />
    </>
  )
}
