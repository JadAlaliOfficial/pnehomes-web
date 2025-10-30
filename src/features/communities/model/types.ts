export interface FloorPlan {
  slug: string
  title: string
  community: string
  cover: string
  status?: string | null
  price: string
  beds: string
  baths: string
  garages: string
  sqft: string
}

export interface Community {
  id: number
  slug: string
  title: string
  city: string
  address: string
  latitude: number
  longitude: number
  card_image: string
  gallery: string[]
  video?: string | null
  'community-features'?: string | null
  'floor-plans'?: FloorPlan[] | null
  'starting-price': string
}


export interface CommunityFilter {
  name?: string
  city?: string
}

export interface PropertyFilter {
  minBedrooms?: number
  maxBedrooms?: number
  minBaths?: number
  maxBaths?: number
  minPrice?: number
  maxPrice?: number
}

export interface SearchFilters {
  community?: CommunityFilter
  property?: PropertyFilter
}

export interface CommunitiesPageData {
  title: string
  cover: string
  zillowLink: string
  contact: {
    title?: string
    message?: string
  }
}
