'use server'

import { redirect } from 'next/navigation'
import { TRACKS, type Track } from '@/lib/types'
import { LEAD_STATUSES, type LeadStatus } from '@/lib/admin-types'
import { requireAdminAction, requireAllowlistedActionUser } from '@/lib/admin-auth'
import { createSupabaseActionClient } from '@/lib/supabase/server'

export type MfaEnrollmentState = {
  factorId?: string
  qrCode?: string
  secret?: string
  error?: string
}

export type MfaVerificationState = { error?: string }

function getText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function safeCtaHref(href: string) {
  return (href.startsWith('/') && !href.startsWith('//')) ||
    /^https:\/\/[^\s]+$/i.test(href) ||
    /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(href)
}

function isConnectionError(error: { message: string; name?: string }) {
  return (
    error.name === 'AuthRetryableFetchError' ||
    /fetch failed|network|timed? ?out|econn|enotfound|eai_again/i.test(error.message)
  )
}

export async function signInAction(formData: FormData) {
  const email = getText(formData, 'email')
  const password = formData.get('password')
  if (!email || typeof password !== 'string' || !password) redirect('/admin/login?error=credentials')

  const supabase = await createSupabaseActionClient()
  let result
  try {
    result = await supabase.auth.signInWithPassword({ email, password })
  } catch (error) {
    if (error instanceof Error && isConnectionError(error)) {
      console.error('Admin sign-in could not reach Supabase:', error.message)
      redirect('/admin/login?error=connection')
    }
    throw error
  }
  const { error } = result
  if (error) {
    console.error('Admin sign-in failed:', error.message)
    if (isConnectionError(error)) redirect('/admin/login?error=connection')
    redirect('/admin/login?error=credentials')
  }
  redirect('/admin')
}

export async function signOutAction() {
  const supabase = await createSupabaseActionClient()
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Admin sign-out failed:', error.message)
    throw new Error('Could not sign out.')
  }
  redirect('/admin/login')
}

export async function enrollMfaAction(
  previous: MfaEnrollmentState,
  formData: FormData,
): Promise<MfaEnrollmentState> {
  void previous
  void formData
  const { supabase } = await requireAllowlistedActionUser()
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: 'totp',
    friendlyName: 'Groviatech admin',
  })
  if (error) {
    console.error('Could not enroll an admin authenticator:', error.message)
    return { error: 'Could not set up your authenticator. Please try again.' }
  }
  return { factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret }
}

export async function verifyMfaAction(
  _previous: MfaVerificationState,
  formData: FormData,
): Promise<MfaVerificationState> {
  const { supabase } = await requireAllowlistedActionUser()
  const factorId = getText(formData, 'factorId')
  const code = getText(formData, 'code')
  if (!factorId || !/^\d{6,8}$/.test(code)) return { error: 'Enter the current code from your authenticator app.' }

  const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors()
  if (factorsError) {
    console.error('Could not list admin authenticator factors:', factorsError.message)
    return { error: 'Could not verify your authenticator. Please try again.' }
  }
  const factor = factors.totp.find(
    (item) => item.id === factorId && (item.status === 'verified' || item.status === 'unverified'),
  )
  if (!factor) return { error: 'That authenticator is no longer available. Reload and try again.' }

  const { error } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code })
  if (error) {
    console.error('Admin MFA verification failed:', error.message)
    return { error: 'That code was not accepted. Check your authenticator and try again.' }
  }
  redirect('/admin')
}

export async function updateLeadAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  const status = getText(formData, 'status')
  const notes = getText(formData, 'notes')
  if (!/^[0-9a-f-]{36}$/i.test(id) || !LEAD_STATUSES.includes(status as LeadStatus) || notes.length > 4000) {
    redirect('/admin/leads?error=invalid')
  }

  const { data, error } = await supabase
    .from('leads')
    .update({ status: status as LeadStatus, notes: notes || null })
    .eq('id', id)
    .is('deleted_at', null)
    .select('id')
    .maybeSingle()
  if (error) {
    console.error('Could not update lead:', error.message)
    redirect('/admin/leads?error=save')
  }
  if (!data) redirect('/admin/leads?error=missing')
  redirect('/admin/leads?updated=1')
}

export async function moveLeadToTrashAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin/leads?error=invalid')

  const { data, error } = await supabase
    .from('leads')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)
    .is('deleted_at', null)
    .select('id')
    .maybeSingle()
  if (error) {
    console.error('Could not move lead to trash:', error.message)
    redirect('/admin/leads?error=trash')
  }
  if (!data) redirect('/admin/leads?error=missing')
  redirect('/admin/leads?trashed=1')
}

export async function restoreLeadAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin/leads?view=trash&error=invalid')

  const { data, error } = await supabase
    .from('leads')
    .update({ deleted_at: null })
    .eq('id', id)
    .not('deleted_at', 'is', null)
    .select('id')
    .maybeSingle()
  if (error) {
    console.error('Could not restore lead:', error.message)
    redirect('/admin/leads?view=trash&error=restore')
  }
  if (!data) redirect('/admin/leads?view=trash&error=missing')
  redirect('/admin/leads?restored=1')
}

export async function permanentlyDeleteLeadAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin/leads?view=trash&error=invalid')

  const { data, error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id)
    .not('deleted_at', 'is', null)
    .select('id')
    .maybeSingle()
  if (error) {
    console.error('Could not permanently delete lead:', error.message)
    redirect('/admin/leads?view=trash&error=delete')
  }
  if (!data) redirect('/admin/leads?view=trash&error=missing')
  redirect('/admin/leads?view=trash&deleted=1')
}

export async function savePricingTierAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  const track = getText(formData, 'track')
  const name = getText(formData, 'name')
  const pricePrefix = getText(formData, 'price_prefix')
  const priceLabel = getText(formData, 'price_label')
  const priceSuffix = getText(formData, 'price_suffix')
  const audience = getText(formData, 'audience')
  const highlightLabel = getText(formData, 'highlight_label')
  const ctaLabel = getText(formData, 'cta_label')
  const ctaHref = getText(formData, 'cta_href')
  const sortOrderText = getText(formData, 'sort_order')
  const sortOrder = Number(sortOrderText)
  const features = getText(formData, 'features')
    .split(/\r?\n/)
    .map((feature) => feature.trim())
    .filter(Boolean)

  const validTrack = TRACKS.some((item) => item.id === track)
  const validId = !id || /^[0-9a-f-]{36}$/i.test(id)
  const validFeatures = features.length <= 30 && features.every((feature) => feature.length <= 500)
  if (
    !validId ||
    !validTrack ||
    !name ||
    name.length > 80 ||
    !priceLabel ||
    priceLabel.length > 40 ||
    pricePrefix.length > 20 ||
    priceSuffix.length > 30 ||
    audience.length > 200 ||
    highlightLabel.length > 40 ||
    !ctaLabel ||
    ctaLabel.length > 60 ||
    ctaHref.length > 300 ||
    !safeCtaHref(ctaHref) ||
    !sortOrderText ||
    !Number.isInteger(sortOrder) ||
    !validFeatures
  ) {
    redirect('/admin/pricing?error=invalid')
  }

  const values = {
    track: track as Track,
    name,
    price_prefix: pricePrefix || null,
    price_label: priceLabel,
    price_suffix: priceSuffix || null,
    audience: audience || null,
    features,
    highlighted: formData.get('highlighted') === 'on',
    highlight_label: highlightLabel || null,
    cta_label: ctaLabel,
    cta_href: ctaHref,
    sort_order: sortOrder,
    published: formData.get('published') === 'on',
  }

  const result = id
    ? await supabase.from('pricing_tiers').update(values).eq('id', id).select('id').maybeSingle()
    : await supabase.from('pricing_tiers').insert(values).select('id').maybeSingle()
  if (result.error) {
    console.error('Could not save pricing tier:', result.error.message)
    redirect('/admin/pricing?error=save')
  }
  if (!result.data) redirect('/admin/pricing?error=missing')
  redirect('/admin/pricing?saved=1')
}

export async function deletePricingTierAction(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = getText(formData, 'id')
  if (!/^[0-9a-f-]{36}$/i.test(id)) redirect('/admin/pricing?error=invalid')

  const { data, error } = await supabase.from('pricing_tiers').delete().eq('id', id).select('id').maybeSingle()
  if (error) {
    console.error('Could not delete pricing tier:', error.message)
    redirect('/admin/pricing?error=delete')
  }
  if (!data) redirect('/admin/pricing?error=missing')
  redirect('/admin/pricing?deleted=1')
}
