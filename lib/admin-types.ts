export const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'won', 'lost'] as const
export type LeadStatus = (typeof LEAD_STATUSES)[number]

export type AdminLead = {
  id: string
  created_at: string
  name: string
  email: string
  company: string | null
  interest: string | null
  message: string | null
  source: string
  status: LeadStatus
  notes: string | null
}
