import { createClient } from '@supabase/supabase-js'
import { cache } from 'react'
import { connection } from 'next/server'
import { TEAM, TESTIMONIALS, WORK, type Person } from '@/app/(site)/shared-content'
import { SHOW_PLACEHOLDERS } from '@/lib/placeholders'
import type { Project, Testimonial } from './content-types'

/*
 * Team, projects and testimonials are edited in the admin (/admin/team, /admin/projects, /admin/testimonials) and stored in Supabase.
 * If Supabase cannot be reached, or the content tables have not been created yet, the site falls back to the built-in lists in
 * shared-content.ts. An empty table is not an error: it means "show none", so unpublishing everything really does hide it.
 * Testimonials are the exception on the fallback: the built-in quotes only show while you build (dev), never in production,
 * because their permission is recorded in the admin.
 */
function anonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && key ? createClient(url, key) : null
}

type TeamRow = {
  name: string
  role: string
  note: string | null
  photo_url: string | null
  link_label: string | null
  link_href: string | null
}
type ProjectRow = {
  domain: string
  category: string | null
  description: string | null
  tags: string[]
  image_url: string | null
  ps_performance?: number | null
  ps_accessibility?: number | null
  ps_best_practices?: number | null
  ps_seo?: number | null
  ps_device?: 'mobile' | 'desktop' | null
  ps_measured_on?: string | null
}
type TestimonialRow = { quote: string; name: string; role: string | null }

export const getTeam = cache(async (): Promise<Person[]> => {
  await connection()
  const sb = anonClient()
  if (!sb) return TEAM
  const { data, error } = await sb.from('team_members').select('*').eq('published', true).order('sort_order').returns<TeamRow[]>()
  if (error || !data) {
    console.error('Could not load team members:', error?.message)
    return TEAM
  }
  return data.map((r) => ({
    name: r.name,
    role: r.role,
    note: r.note ?? TEAM.find((person) => person.name === r.name)?.note,
    photo: r.photo_url ?? undefined,
    link: r.link_label && r.link_href ? { label: r.link_label, href: r.link_href } : undefined,
  }))
})

function toSpeed(r: ProjectRow): Project['speed'] {
  const scores = [r.ps_performance, r.ps_accessibility, r.ps_best_practices, r.ps_seo]
  if (!r.ps_device || !r.ps_measured_on || scores.every((s) => s == null)) return undefined
  return {
    performance: r.ps_performance ?? undefined,
    accessibility: r.ps_accessibility ?? undefined,
    bestPractices: r.ps_best_practices ?? undefined,
    seo: r.ps_seo ?? undefined,
    device: r.ps_device,
    measuredOn: r.ps_measured_on,
  }
}

export const getProjects = cache(async (): Promise<Project[]> => {
  await connection()
  const sb = anonClient()
  if (!sb) return WORK
  const { data, error } = await sb.from('projects').select('*').eq('published', true).order('sort_order').returns<ProjectRow[]>()
  if (error || !data) {
    console.error('Could not load projects:', error?.message)
    return WORK
  }
  return data.map((r) => ({
    domain: r.domain,
    category: r.category ?? undefined,
    description: r.description ?? undefined,
    tags: r.tags?.length ? r.tags : undefined,
    image: r.image_url ?? undefined,
    speed: toSpeed(r),
  }))
})

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  await connection()
  const devSample = SHOW_PLACEHOLDERS ? TESTIMONIALS : []
  const sb = anonClient()
  if (!sb) return devSample
  const { data, error } = await sb.from('testimonials').select('*').eq('published', true).order('sort_order').returns<TestimonialRow[]>()
  if (error || !data) {
    console.error('Could not load testimonials:', error?.message)
    return devSample
  }
  return data.map((r) => ({ quote: r.quote, name: r.name, role: r.role ?? '' }))
})
