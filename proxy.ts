import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Keeps /admin closed to anyone who is not logged in and past the MFA step.
// Next.js 16 calls this file proxy.ts. On Next.js 15 or earlier, rename it to middleware.ts and the function to `middleware`.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    },
  )

  const redirectTo = (path: string) => {
    const res = NextResponse.redirect(new URL(path, request.url))
    response.cookies.getAll().forEach((c) => res.cookies.set(c))
    return res
  }

  const path = request.nextUrl.pathname
  const isLogin = path === '/admin/login'
  const isMfa = path === '/admin/mfa'
  const isAccessDenied = path === '/admin/access-denied'

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return isLogin ? response : redirectTo('/admin/login')

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
  const verified = aal?.currentLevel === 'aal2'

  if (!verified && !isLogin && !isMfa && !isAccessDenied) return redirectTo('/admin/mfa')
  if (verified && (isLogin || isMfa)) return redirectTo('/admin')

  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config = { matcher: ['/admin/:path*'] }
