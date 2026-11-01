import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

/**
 * Public endpoint for the contact and audit forms.
 * POST JSON: { name, email, company?, interest?, message?, source?, website? }
 * `website` is a honeypot: hide it in the form; bots fill it in, people don't.
 */
export async function POST(req: Request) {
  // Only accept posts from this site's own pages, and refuse oversized bodies before reading them.
  const origin = req.headers.get('origin')
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(req.url).host) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
    } catch {
      return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
    }
  }
  if (Number(req.headers.get('content-length') ?? 0) > 20_000)
    return NextResponse.json({ error: 'That message is too long.' }, { status: 413 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Send the form as JSON.' }, { status: 400 })
  }

  if (clean(body.website, 200)) return NextResponse.json({ ok: true }) // honeypot: pretend it worked

  const name = clean(body.name, 120)
  const email = clean(body.email, 254).toLowerCase()
  if (!name) return NextResponse.json({ error: 'Add your name.' }, { status: 400 })
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )

  // No .select() here: visitors can insert leads but are not allowed to read them back.
  const { error } = await supabase.from('leads').insert({
    name,
    email,
    company: clean(body.company, 160) || null,
    interest: clean(body.interest, 120) || null,
    message: clean(body.message, 4000) || null,
    source: clean(body.source, 60) || 'website',
  })

  if (error) {
    // supabase/hardening.sql makes the database refuse a flood of submissions.
    if (error.message.includes('too_many_leads'))
      return NextResponse.json(
        { error: 'We have received a few requests from you already. Please wait a few minutes, or email us directly.' },
        { status: 429 },
      )
    return NextResponse.json(
      { error: 'We couldn’t send your message. Please email us directly.' },
      { status: 500 },
    )
  }
  return NextResponse.json({ ok: true })
}
