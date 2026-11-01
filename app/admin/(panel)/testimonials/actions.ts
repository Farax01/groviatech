'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAction } from '@/lib/admin-auth'

export type SaveState = { error?: string }

const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? '').trim().slice(0, max)

function refresh() {
  revalidatePath('/')
  revalidatePath('/admin/testimonials')
}

export async function saveTestimonial(_prev: SaveState, fd: FormData): Promise<SaveState> {
  const { supabase } = await requireAdminAction()

  const id = text(fd, 'id', 60)
  const quote = text(fd, 'quote', 600)
  const name = text(fd, 'name', 120)
  if (!quote) return { error: 'Add the quote.' }
  if (!name) return { error: 'Add who said it.' }

  const permission_confirmed = fd.get('permission_confirmed') === 'on'
  const published = fd.get('published') === 'on'
  if (published && !permission_confirmed)
    return { error: 'Tick the box to confirm this person has agreed to be quoted before you show it on the website.' }

  const sort = Number.parseInt(text(fd, 'sort_order', 6), 10)
  const row = {
    quote,
    name,
    role: text(fd, 'role', 160) || null,
    permission_confirmed,
    published,
    sort_order: Number.isFinite(sort) ? sort : 0,
  }

  const { error } = id
    ? await supabase.from('testimonials').update(row).eq('id', id)
    : await supabase.from('testimonials').insert(row)
  if (error) return { error: `Couldn’t save this testimonial: ${error.message}` }

  refresh()
  redirect('/admin/testimonials')
}

export async function deleteTestimonial(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = text(formData, 'id', 60)
  if (id) await supabase.from('testimonials').delete().eq('id', id)
  refresh()
  redirect('/admin/testimonials')
}
