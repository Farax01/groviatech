import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function createSupabaseClient(writeCookies: boolean) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error('Supabase URL and anon key must be configured to use the admin area.')
  }

  const cookieStore = await cookies()
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (values) => {
        if (writeCookies) {
          values.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        }
      },
    },
  })
}

export function createSupabaseServerClient() {
  return createSupabaseClient(false)
}

export function createSupabaseActionClient() {
  return createSupabaseClient(true)
}
