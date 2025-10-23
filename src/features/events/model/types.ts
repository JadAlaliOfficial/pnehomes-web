/**
 * Event interface representing a single event
 */
export interface Event {
  title: string
  description: string
  gallery: string[]
}

/**
 * Contact interface for contact information
 */
export interface Contact {
  title: string
  message: string
}

/**
 * Main events data structure interface
 */
export interface EventsData {
  cover: string
  slogan: string
  events: Event[]
  contact?: Contact
}

/**
 * API response wrapper for events data
 */
export interface EventsResponse {
  success: boolean
  data?: EventsData
  error?: string
}
