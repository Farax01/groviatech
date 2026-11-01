import { createClient } from '@supabase/supabase-js'
import { connection } from 'next/server'
import type { Tier, Track } from './types'

export async function getPublishedTiers(track?: Track): Promise<Tier[]> {
  await connection()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.error('Cannot load published pricing tiers: Supabase URL or anon key is not configured.')
    return []
  }

  const supabase = createClient(url, key)
  let query = supabase.from('pricing_tiers').select('*').eq('published', true).order('sort_order')
  if (track) query = query.eq('track', track)

  const { data, error } = await query.returns<Tier[]>()
  if (error) {
    console.error('Could not load published pricing tiers:', error.message)
    return []
  }

  const seen = new Set<string>()
  return (data ?? []).filter((tier) => {
    const key = JSON.stringify([
      tier.track,
      tier.name,
      tier.price_prefix,
      tier.price_label,
      tier.price_suffix,
      tier.audience,
      tier.features,
      tier.highlighted,
      tier.highlight_label,
      tier.cta_label,
      tier.cta_href,
      tier.sort_order,
      tier.published,
    ])
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
