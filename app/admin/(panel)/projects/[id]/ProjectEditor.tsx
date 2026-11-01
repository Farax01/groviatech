'use client'

import Link from 'next/link'
import { useActionState, useState } from 'react'
import { ConfirmButton } from '../../../_components/ConfirmButton'
import { deleteProject, saveProject, type SaveState } from '../actions'

export type Project = {
  id: string
  domain: string
  category: string | null
  description: string | null
  tags: string[]
  image_url: string | null
  sort_order: number
  published: boolean
  ps_performance: number | null
  ps_accessibility: number | null
  ps_best_practices: number | null
  ps_seo: number | null
  ps_device: 'mobile' | 'desktop' | null
  ps_measured_on: string | null
}

export function ProjectEditor({ project }: { project: Project }) {
  const [state, formAction, pending] = useActionState<SaveState, FormData>(saveProject, {})
  const [domain, setDomain] = useState(project.domain)
  const [category, setCategory] = useState(project.category ?? '')
  const [description, setDescription] = useState(project.description ?? '')
  const [tags, setTags] = useState(project.tags.join(', '))
  const [ps, setPs] = useState({
    performance: project.ps_performance?.toString() ?? '',
    accessibility: project.ps_accessibility?.toString() ?? '',
    bestPractices: project.ps_best_practices?.toString() ?? '',
    seo: project.ps_seo?.toString() ?? '',
    device: project.ps_device ?? 'mobile',
    measuredOn: project.ps_measured_on ?? '',
  })
  const setScore = (key: keyof typeof ps) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setPs((p) => ({ ...p, [key]: e.target.value }))
  const isNew = !project.id

  return (
    <>
      <header className="adm-head">
        <p className="adm-crumb">
          <Link href="/admin/projects">Projects</Link>
        </p>
        <h1>{isNew ? 'Add a project' : `Edit ${project.domain}`}</h1>
      </header>

      <form action={formAction} className="adm-card adm-form adm-narrow">
        <input type="hidden" name="id" value={project.id} />
        <input type="hidden" name="existing_image" value={project.image_url ?? ''} />

        <label>
          Website domain
          <input name="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" required />
          <span className="adm-hint">Just the domain, for example example.com. It links to the live site.</span>
        </label>
        <label>
          Type of project
          <input name="category" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={60} />
          <span className="adm-hint">For example “Local business” or “Web3, meme coin”. Only what you are sure of.</span>
        </label>
        <label>
          What you built
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} maxLength={500} />
          <span className="adm-hint">Two sentences at most. Describe what it does, not how good it is. Never name a client who has not agreed.</span>
        </label>
        <label>
          Built with
          <input name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Next.js, React, SEO" />
          <span className="adm-hint">Separate with commas. Up to 6 tags.</span>
        </label>

        <fieldset className="adm-fieldset">
          <legend>Google PageSpeed scores (optional)</legend>
          <p className="adm-hint">
            Run the site at pagespeed.web.dev, then copy the four scores from the same run. They show on the project card with the
            device and the date, so only enter real results.
          </p>
          <div className="adm-grid4">
            <label>
              Performance
              <input name="ps_performance" type="number" inputMode="numeric" min={0} max={100} value={ps.performance} onChange={setScore('performance')} />
            </label>
            <label>
              Accessibility
              <input name="ps_accessibility" type="number" inputMode="numeric" min={0} max={100} value={ps.accessibility} onChange={setScore('accessibility')} />
            </label>
            <label>
              Best practices
              <input name="ps_best_practices" type="number" inputMode="numeric" min={0} max={100} value={ps.bestPractices} onChange={setScore('bestPractices')} />
            </label>
            <label>
              SEO
              <input name="ps_seo" type="number" inputMode="numeric" min={0} max={100} value={ps.seo} onChange={setScore('seo')} />
            </label>
          </div>
          <div className="adm-grid2">
            <label>
              Device tested
              <select name="ps_device" value={ps.device} onChange={setScore('device')}>
                <option value="mobile">Mobile</option>
                <option value="desktop">Desktop</option>
              </select>
            </label>
            <label>
              Date you ran it
              <input name="ps_measured_on" type="date" value={ps.measuredOn} onChange={setScore('measuredOn')} />
            </label>
          </div>
        </fieldset>

        <div>
          <label>
            Screenshot
            <input type="file" name="image" accept="image/jpeg,image/png,image/webp" />
            <span className="adm-hint">Shot at 1600 × 1000 (16:10). JPG, PNG or WebP, 5 MB or smaller.</span>
          </label>
          {project.image_url && (
            <div className="adm-photo-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="adm-thumb adm-thumb-wide" src={project.image_url} alt={`Current screenshot of ${project.domain}`} />
              <label className="adm-check">
                <input type="checkbox" name="remove_image" /> Remove this screenshot
              </label>
            </div>
          )}
        </div>

        <div className="adm-grid2">
          <label>
            Order on the page
            <input name="sort_order" type="number" defaultValue={project.sort_order} />
            <span className="adm-hint">Lower numbers come first. The first three show on the home page.</span>
          </label>
          <label className="adm-check">
            <input type="checkbox" name="published" defaultChecked={project.published} />
            Show on the website
          </label>
        </div>

        {state.error && (
          <p className="adm-error" role="alert">
            {state.error}
          </p>
        )}
        <div className="adm-actions">
          <button className="adm-btn" disabled={pending}>
            {pending ? 'Saving…' : 'Save'}
          </button>
          <Link className="adm-btn adm-btn-quiet" href="/admin/projects">
            Cancel
          </Link>
        </div>
      </form>

      {!isNew && (
        <form action={deleteProject} className="adm-delete">
          <input type="hidden" name="id" value={project.id} />
          <ConfirmButton className="adm-link adm-danger" message={`Delete ${project.domain}? This cannot be undone.`}>
            Delete this project
          </ConfirmButton>
        </form>
      )}
    </>
  )
}
