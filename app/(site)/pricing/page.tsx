import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPublishedTiers } from '@/lib/pricing'
import { FALLBACK_TIERS } from '@/lib/pricing-fallback'
import { TRACKS } from '@/lib/types'
import { PricingExplorer } from './PricingExplorer'
import { Faq, FinalCta, QuoteTerms, Steps } from './sections'
import './pricing.css'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Fixed-price secure websites, website security for small businesses, and penetration testing for AI startups.',
}

async function LivePricingExplorer({
  searchParams,
}: {
  searchParams: Promise<{ track?: string }>
}) {
  const { track: requestedTrack } = await searchParams
  const initialTrack = TRACKS.find((item) => item.id === requestedTrack)?.id ?? 'web_dev'
  const live = await getPublishedTiers()
  const tiers = live.length > 0 ? live : FALLBACK_TIERS
  return <PricingExplorer tiers={tiers} initialTrack={initialTrack} />
}

export default function PricingPage({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  return (
    <>
      <Suspense fallback={<PricingExplorer tiers={FALLBACK_TIERS} />}>
        <LivePricingExplorer searchParams={searchParams} />
      </Suspense>
      <QuoteTerms />
      <Steps />
      <Faq />
      <FinalCta />
    </>
  )
}
