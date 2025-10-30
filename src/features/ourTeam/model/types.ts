// src/model/types.ts

export interface TeamMember {
  id?: number            // API provides an id (optional in case future data omits it)
  cover: string
  name: string
  position: string
  description: string
}

export interface Contact {
  title: string
  message: string
}

export interface OurTeamData {
  cover: string
  slogan: string
  title: string
  subtitle?: string       // API includes this; keep optional so existing UI won’t break
  description?: string
  team: TeamMember[]
  contact?: Contact
}

/**
 * Raw shapes returned by the API.
 * Wrapping this separately keeps the rest of the app stable if
 * the server adds fields later.
 */
export interface OurTeamApiEnvelope {
  success: boolean
  data: OurTeamApiData
}

export interface OurTeamApiData {
  cover: string
  slogan: string
  title: string
  subtitle?: string
  description?: string
  team: Array<{
    id?: number
    cover: string
    name: string
    position: string
    description: string
  }>
  contact?: Contact
}
