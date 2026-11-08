import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

async function notifyTeam({
  name,
  email,
  company,
  interest,
  message,
}: {
  name: string
  email: string
  company: string
  interest: string
  message: string
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('leads: RESEND_API_KEY is not set; the lead was saved without an email notification')
    return false
  }

  const notificationEmail = process.env.LEAD_NOTIFICATION_EMAIL ?? 'groviatechh@gmail.com'
  const fromEmail = process.env.LEADS_FROM_EMAIL ?? 'onboarding@resend.dev'
  const subjectName = name.replace(/[\r\n]+/g, ' ')
  const text = [
    `New website enquiry from ${name}`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'Not provided'}`,
    `Interest: ${interest || 'Not provided'}`,
    '',
    'Message:',
    message || 'Not provided',
  ].join('\n')

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: ['Bearer', apiKey].join(' '),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [notificationEmail],
        reply_to: email,
        subject: `New website enquiry: ${subjectName}`,
        text,
      }),
    })
    if (!response.ok) {
      console.error('leads: Resend email notification failed with status:', response.status)
      return false
    }
    return true
  } catch (error) {
    console.error('leads: could not reach Resend:', error instanceof Error ? error.message : 'unknown error')
    return false
  }
}

/**
 * Public endpoint for the contact and audit forms.
 * POST JSON: { name, email, company?, interest?, message?, source?, website? }
 * `website` is a honeypot: hide it in the form; bots fill it in, people don't.
 */
export async function POST(req: Request) {
  // Behind a proxy, the request URL's host may differ from the host the visitor used.
  const origin = req.headers.get('origin')
  if (origin) {
    const lower = (value: string | null | undefined) => (value ?? '').split(',')[0].trim().toLowerCase()
    let originHost = ''
    try {
      originHost = new URL(origin).host.toLowerCase()
    } catch {}
    const allowed = new Set([
      lower(req.headers.get('x-forwarded-host')),
      lower(req.headers.get('host')),
      new URL(req.url).host.toLowerCase(),
    ])
    try {
      if (process.env.NEXT_PUBLIC_SITE_URL) allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).host.toLowerCase())
    } catch {}
    if (!originHost || !allowed.has(originHost)) {
      console.warn('leads: blocked a post from another origin:', originHost || '(none)')
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('leads: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set on the server')
    return NextResponse.json({ error: 'We couldn’t send your message. Please email us directly.' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })

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
    // Log the provider error, but never any lead details.
    console.error('leads: insert failed:', error.code, error.message)
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

  const notificationSent = await notifyTeam({
    name,
    email,
    company: clean(body.company, 160),
    interest: clean(body.interest, 120),
    message: clean(body.message, 4000),
  })
  return NextResponse.json({ ok: true, notificationSent })
}
