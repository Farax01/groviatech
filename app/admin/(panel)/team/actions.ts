'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdminAction } from '@/lib/admin-auth'
import { uploadImage } from '../../_lib/upload'

export type SaveState = { error?: string }

const text = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? '').trim().slice(0, max)

export async function saveMember(_prev: SaveState, fd: FormData): Promise<SaveState> {
  const { supabase } = await requireAdminAction()

  const id = text(fd, 'id', 60)
  const name = text(fd, 'name', 120)
  const role = text(fd, 'role', 160)
  if (!name) return { error: 'Add a name.' }
  if (!role) return { error: 'Add a role.' }

  const link_label = text(fd, 'link_label', 60)
  const link_href = text(fd, 'link_href', 300)
  if (Boolean(link_label) !== Boolean(link_href))
    return { error: 'Fill in both the link text and the link address, or leave both empty.' }
  if (link_href && !link_href.startsWith('https://')) return { error: 'The link address must start with https://.' }

  const upload = await uploadImage(supabase, fd.get('photo'), 'team')
  if (upload.error) return { error: upload.error }
  const existing = text(fd, 'existing_photo', 500)
  const photo_url = upload.url ?? (fd.get('remove_photo') === 'on' ? null : existing || null)

  const sort = Number.parseInt(text(fd, 'sort_order', 6), 10)
  const row = {
    name,
    role,
    note: text(fd, 'note', 200) || null,
    photo_url,
    link_label: link_label || null,
    link_href: link_href || null,
    sort_order: Number.isFinite(sort) ? sort : 0,
    published: fd.get('published') === 'on',
  }

  const { error } = id
    ? await supabase.from('team_members').update(row).eq('id', id)
    : await supabase.from('team_members').insert(row)
  if (error) return { error: `Couldn’t save this person: ${error.message}` }

  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/team')
  redirect('/admin/team')
}

export async function deleteMember(formData: FormData) {
  const { supabase } = await requireAdminAction()
  const id = text(formData, 'id', 60)
  if (id) await supabase.from('team_members').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/admin/team')
  redirect('/admin/team')
}
