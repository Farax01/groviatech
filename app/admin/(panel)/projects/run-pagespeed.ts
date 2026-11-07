'use server'

import { requireAdmin } from '@/lib/admin-auth'
import { auditSite, type AuditResult } from '@/lib/pagespeed'

/** Runs a PageSpeed test for a project. Results are only saved when the form is submitted. */
export async function runPageSpeed(domainInput: string, device: 'mobile' | 'desktop'): Promise<AuditResult> {
  await requireAdmin()

  if (typeof domainInput !== 'string') {
    return { ok: false, error: 'Enter the website domain first, for example example.com.' }
  }
  if (device !== 'mobile' && device !== 'desktop') {
    return { ok: false, error: 'Choose mobile or desktop for the test.' }
  }

  const domain = domainInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[/?#].*$/, '')
  const apiKey = process.env.PAGESPEED_API_KEY?.trim()
  if (!apiKey) {
    return {
      ok: false,
      error: 'The PageSpeed API key is not configured. Set PAGESPEED_API_KEY in your environment and redeploy.',
    }
  }

  return auditSite(domain, device, { apiKey })
}
