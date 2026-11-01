import { redirect } from 'next/navigation'
import { createSupabaseActionClient, createSupabaseServerClient } from './supabase/server'

async function findAllowlistedAdmin(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string,
) {
  const { data, error } = await supabase.from('admin_users').select('role').eq('user_id', userId).maybeSingle()
  if (error) {
    console.error('Could not verify admin access:', error.message)
    throw new Error('Could not verify admin access.')
  }
  return data
}

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) {
    console.error('Could not read the admin session:', userError.message)
    throw new Error('Could not read the admin session.')
  }
  if (!user) redirect('/admin/login')

  const { data: assurance, error: assuranceError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (assuranceError) {
    console.error('Could not verify admin MFA:', assuranceError.message)
    throw new Error('Could not verify admin MFA.')
  }
  if (assurance.currentLevel !== 'aal2') redirect('/admin/mfa')

  const admin = await findAllowlistedAdmin(supabase, user.id)
  if (!admin) redirect('/admin/access-denied')
  return { supabase, user, role: admin.role }
}

export async function requireAllowlistedActionUser() {
  const supabase = await createSupabaseActionClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Could not read the admin session:', error.message)
    throw new Error('Could not read the admin session.')
  }
  if (!user) redirect('/admin/login')

  const admin = await findAllowlistedAdmin(supabase, user.id)
  if (!admin) redirect('/admin/access-denied')
  return { supabase, user, role: admin.role }
}

export async function requireAdminAction() {
  const context = await requireAllowlistedActionUser()
  const { data, error } = await context.supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  if (error) {
    console.error('Could not verify admin MFA:', error.message)
    throw new Error('Could not verify admin MFA.')
  }
  if (data.currentLevel !== 'aal2') redirect('/admin/mfa')
  return context
}

export async function requireAllowlistedUser() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Could not read the admin session:', error.message)
    throw new Error('Could not read the admin session.')
  }
  if (!user) redirect('/admin/login')

  const admin = await findAllowlistedAdmin(supabase, user.id)
  if (!admin) redirect('/admin/access-denied')
  return { supabase, user, role: admin.role }
}
