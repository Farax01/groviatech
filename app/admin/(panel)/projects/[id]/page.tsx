import { notFound } from 'next/navigation'
import { requireAdmin } from '@/lib/admin-auth'
import { ProjectEditor, type Project } from './ProjectEditor'


export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { supabase } = await requireAdmin()
  const { id } = await params

  let project: Project
  if (id === 'new') {
    project = {
      id: '',
      domain: '',
      category: null,
      description: null,
      tags: [],
      image_url: null,
      sort_order: 100,
      published: false,
      ps_performance: null,
      ps_accessibility: null,
      ps_best_practices: null,
      ps_seo: null,
      ps_device: null,
      ps_measured_on: null,
    }
  } else {
    const { data } = await supabase.from('projects').select('*').eq('id', id).maybeSingle()
    if (!data) notFound()
    project = data as Project
  }
  return <ProjectEditor project={project} />
}
