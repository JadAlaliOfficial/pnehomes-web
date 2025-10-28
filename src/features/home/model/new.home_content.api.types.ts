// API DTOs - mirror the CMS response exactly (snake_case etc.)
export interface ApiHomeResponse {
  success: boolean
  data: ApiHomeData
}

export interface ApiHomeData {
  first_section: ApiFirstSection
  hero_sections: ApiHeroSection[]
  hero: ApiHero
  services: ApiServices
  grid_section: ApiGridSection
  testimonials: ApiTestimonial[]
  contact: { title: string }
}

export interface ApiFirstSection {
  video?: string | null
  mobile_cover: string
  logo: string
  title: string
  subtitle: string | null
  book_button_text: string | null
}

export interface ApiHeroSection {
  icon: string
  title: string
  description: string | null
}

export interface ApiHero {
  title: string
  subtitle: string | null
}

export interface ApiServiceLink {
  title: string
  slug: string
}

export interface ApiServices {
  title: string
  cover: string
  description: string | null
  links: ApiServiceLink[]
}

export interface ApiGridLink {
  title: string
  cover: string
}

export interface ApiGridSection {
  video?: string | null
  logo: string
  links: ApiGridLink[]
}

export interface ApiTestimonial {
  description: string
  by: string
}
