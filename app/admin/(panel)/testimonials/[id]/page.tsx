import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { TestimonialEditor, type Testimonial } from './TestimonialEditor'


export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin()
  const { id } = await params

  let t: Testimonial
  if (id === 'new') {
    t = { id: '', quote: '', name: '', role: null, permission_confirmed: false, sort_order: 100, published: false }
  } else {
    const { data } = await supabase.from('testimonials').select('*').eq('id', id).maybeSingle()
    if (!data) notFound()
    t = data as Testimonial
  }
  return <TestimonialEditor t={t} />
}
