import { httpRepository } from '../data'
import type { Event, Contact, EventsData, EventsResponse } from '../model/types'

/**
 * Events API - Main entry point for events-related operations
 * (same surface as before; now backed by HTTP instead of the file system)
 */
export class EventsAPI {
  /**
   * Get all events data including slogan, events array, and contact info
   * @returns Promise<EventsResponse>
   */
  static async getEventsData(forceRefresh = false): Promise<EventsResponse> {
    return await httpRepository.getEventsData(forceRefresh)
  }

  /**
   * Get all events
   * @returns Promise<Event[]>
   */
  static async getAllEvents(): Promise<Event[]> {
    return await httpRepository.getAllEvents()
  }

  /**
   * Get a specific event by title
   * @param title - Event title to search for
   * @returns Promise<Event | null>
   */
  static async getEventByTitle(title: string): Promise<Event | null> {
    return await httpRepository.getEventByTitle(title)
  }

  /**
   * Get contact information
   * @returns Promise<Contact | null>
   */
  static async getContactInfo(): Promise<Contact | null> {
    return await httpRepository.getContactInfo()
  }

  /**
   * Get events page slogan
   * @returns Promise<string>
   */
  static async getSlogan(): Promise<string> {
    return await httpRepository.getSlogan()
  }

  /**
   * Get events page title
   * @returns Promise<string>
   */
  static async getTitle(): Promise<string> {
    return await httpRepository.getTitle()
  }

  /**
   * Get cover image path
   * @returns Promise<string>
   */
  static async getCover(): Promise<string> {
    return await httpRepository.getCover()
  }

  /**
   * Search events by keyword in title or description
   * @param keyword - Keyword to search for
   * @returns Promise<Event[]>
   */
  static async searchEvents(keyword: string): Promise<Event[]> {
    const events = await httpRepository.getAllEvents()
    const searchTerm = keyword.toLowerCase()

    return events.filter(
      event =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
    )
  }

  /**
   * Get events count
   * @returns Promise<number>
   */
  static async getEventsCount(): Promise<number> {
    const events = await httpRepository.getAllEvents()
    return events.length
  }
}

// Export types for external use
export type { Event, Contact, EventsData, EventsResponse }

// Export repository for advanced use cases
export { httpRepository as repository }

// Default export
export default EventsAPI
