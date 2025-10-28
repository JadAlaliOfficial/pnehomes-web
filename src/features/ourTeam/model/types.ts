export interface TeamMember {
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
  description?: string
  team: TeamMember[]
  contact?: Contact
}
