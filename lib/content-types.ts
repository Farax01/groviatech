export type Project = {
  domain: string
  description?: string
  category?: string
  tags?: string[]
  image?: string
  speed?: PageSpeed
}

export type PageSpeed = {
  performance?: number
  accessibility?: number
  bestPractices?: number
  seo?: number
  device: 'mobile' | 'desktop'
  measuredOn: string
}

export type Testimonial = { quote: string; name: string; role: string }
