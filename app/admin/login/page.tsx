import type { Metadata } from 'next'
import Link from 'next/link'
import { signInAction } from '../actions'

export const metadata: Metadata = { title: 'Admin sign in | Groviatech' }
export const instant = false

export default async function AdminLoginPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ error?: string }> }>) {
  const { error } = await searchParams

  return (
    <main className="adm-center">
      <section className="adm-card adm-auth">
        <p className="adm-auth-mark">Groviatech Admin</p>
        <h1>Sign in</h1>
        <p className="adm-muted">Use your allow-listed admin account to continue.</p>
        <form className="adm-form" action={signInAction}>
          <label>
            Email
            <input name="email" type="email" autoComplete="username" required maxLength={254} />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          {error === 'connection' ? (
            <p className="adm-error" role="alert">
              We couldn’t connect to Supabase. Check your internet connection and confirm the Supabase project URL and project status.
            </p>
          ) : error === 'credentials' ? (
            <p className="adm-error" role="alert">Sign-in failed. Check your email and password and try again.</p>
          ) : null}
          <button className="adm-btn" type="submit">Sign in</button>
        </form>
        <Link className="adm-muted" href="/">Return to the website</Link>
      </section>
    </main>
  )
}
