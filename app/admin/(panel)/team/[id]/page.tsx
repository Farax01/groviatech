import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { MemberEditor, type Member } from './MemberEditor'


export default async function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin()
  const { id } = await params

  let member: Member
  if (id === 'new') {
    member = { id: '', name: '', role: '', note: null, photo_url: null, link_label: null, link_href: null, sort_order: 100, published: true }
  } else {
    const { data } = await supabase.from('team_members').select('*').eq('id', id).maybeSingle()
    if (!data) notFound()
    member = data as Member
  }
  return <MemberEditor member={member} />
}
