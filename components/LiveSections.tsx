import { Suspense } from 'react'
import { Marquee } from '@/components/Marquee'
import { FounderNote, TeamGrid, Testimonials } from '@/components/Sections'
import { WorkGrid } from '@/components/WorkGrid'
import { WorkStrip } from '@/components/WorkStrip'
import { getProjects, getTeam, getTestimonials } from '@/lib/content'

/*
 * These read what you edit in the admin. Each streams in after the page shell, so the rest of the page is never held up.
 * The fallback is empty on purpose: the admin is the source of truth, so the page never flashes a stale list first.
 */
async function Team() {
  return <TeamGrid people={await getTeam()} />
}
async function Founder() {
  const [first] = await getTeam()
  return <FounderNote person={first} />
}
async function Work({ limit }: { limit?: number }) {
  return <WorkGrid limit={limit} projects={await getProjects()} />
}
async function Quotes() {
  return <Testimonials items={await getTestimonials()} />
}
async function Strip() {
  const withImages = (await getProjects()).filter((p) => p.image)
  return withImages.length >= 3 ? <WorkStrip projects={withImages} /> : <Marquee />
}

export const LiveTeamGrid = () => (
  <Suspense fallback={null}>
    <Team />
  </Suspense>
)
export const LiveFounderNote = () => (
  <Suspense fallback={null}>
    <Founder />
  </Suspense>
)
export const LiveWorkGrid = ({ limit }: { limit?: number }) => (
  <Suspense fallback={null}>
    <Work limit={limit} />
  </Suspense>
)
export const LiveTestimonials = () => (
  <Suspense fallback={null}>
    <Quotes />
  </Suspense>
)
export const LiveHeroStrip = () => (
  <Suspense fallback={<Marquee />}>
    <Strip />
  </Suspense>
)
