'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAction } from '@/lib/admin-auth'
import { uploadImage } from '../../_lib/upload'

export type SaveState = { error?: string }

const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? '').trim().slice(0, max)

function refresh() {
  revalidatePath('/')
  revalidatePath('/work')
  revalidatePath('/admin/projects')
}

export async function saveProject(_prev: SaveState, fd: FormData): Promise<SaveState> {
  const { supabase } = await requireAdminAction()

  const id = text(fd, 'id', 60)
  // Accept a pasted address and keep just the domain.
  const domain = text(fd, 'domain', 200).toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/[/?#].*$/, '')
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain) || domain.length > 120)
    return { error: 'Enter just the domain, for example tc-janitorial.com.' }

  const tags = text(fd, 'tags', 300)
    .split(',')
    .map((t) => t.trim().slice(0, 24))
    .filter(Boolean)
    .slice(0, 6)

  const upload = await uploadImage(supabase, fd.get('image'), 'projects')
  if (upload.error) return { error: upload.error }
  const existing = text(fd, 'existing_image', 500)
  const image_url = upload.url ?? (fd.get('remove_image') === 'on' ? null : existing || null)

  const score = (key: string) => {
    const raw = text(fd, key, 4)
    if (raw === '') return null
    const n = Number(raw)
    return Number.isInteger(n) && n >= 0 && n <= 100 ? n : Number.NaN
  }
  const scores = {
    ps_performance: score('ps_performance'),
    ps_accessibility: score('ps_accessibility'),
    ps_best_practices: score('ps_best_practices'),
    ps_seo: score('ps_seo'),
  }
  const values = Object.values(scores)
  if (values.some((v) => Number.isNaN(v))) return { error: 'PageSpeed scores must be whole numbers from 0 to 100.' }
  const hasScores = values.some((v) => v !== null)
  const measured = text(fd, 'ps_measured_on', 10)
  const device = text(fd, 'ps_device', 10)
  if (hasScores) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(measured)) return { error: 'Add the date you ran the PageSpeed test.' }
    if (measured > new Date().toISOString().slice(0, 10)) return { error: 'The PageSpeed date cannot be in the future.' }
    if (device !== 'mobile' && device !== 'desktop') return { error: 'Choose the device you tested.' }
  }

  const sort = Number.parseInt(text(fd, 'sort_order', 6), 10)
  const row = {
    ...scores,
    ps_device: hasScores ? device : null,
    ps_measured_on: hasScores ? measured : null,
    domain,
    category: text(fd, 'category', 60) || null,
    description: text(fd, 'description', 500) || null,
    tags,
    image_url,
    sort_order: Number.isFinite(sort) ? sort : 0,
    published: fd.get('published') === 'on',
  }

  const { error } = id
    ? await supabase.from('projects').update(row).eq('id', id)
    : await supabase.from('projects').insert(row)
  if (error)
    return {
      error: error.message.includes('duplicate')
        ? 'A project with this domain already exists.'
        : error.message.includes('ps_')
          ? 'The database is missing the PageSpeed columns. Run supabase/pagespeed.sql in the Supabase SQL Editor, then save again.'
        : `Couldn’t save this project: ${error.message}`,
    }

  refresh()
  redirect('/admin/projects')
}

export async function deleteProject(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = text(formData, 'id', 60)
  if (id) await supabase.from('projects').delete().eq('id', id)
  refresh()
  redirect('/admin/projects')
}
