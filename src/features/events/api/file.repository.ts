import { promises as fs } from 'fs';
import path from 'path';
import { EventsData, EventsResponse } from '../model/types';

/**
 * File repository class for managing events data
 */
export class FileRepository {
  private readonly filePath: string;

  constructor() {
    // Path to the events.json file
    this.filePath = path.join(process.cwd(), 'src', 'features', 'events', 'mock', 'events.json');
  }

  /**
   * Read events data from the JSON file
   * @returns Promise<EventsResponse>
   */
  async getEventsData(): Promise<EventsResponse> {
    try {
      const fileContent = await fs.readFile(this.filePath, 'utf-8');
      const data: EventsData = JSON.parse(fileContent);
      
      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error reading events data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get all events
   * @returns Promise<Event[]>
   */
  async getAllEvents() {
    const response = await this.getEventsData();
    if (response.success && response.data) {
      return response.data.events;
    }
    return [];
  }

  /**
   * Get event by title
   * @param title - Event title to search for
   * @returns Promise<Event | null>
   */
  async getEventByTitle(title: string) {
    const events = await this.getAllEvents();
    return events.find(event => event.title.toLowerCase() === title.toLowerCase()) || null;
  }

  /**
   * Get contact information
   * @returns Promise<Contact | null>
   */
  async getContactInfo() {
    const response = await this.getEventsData();
    if (response.success && response.data) {
      return response.data.contact;
    }
    return null;
  }

  /**
   * Get events slogan
   * @returns Promise<string>
   */
  async getSlogan() {
    const response = await this.getEventsData();
    if (response.success && response.data) {
      return response.data.slogan;
    }
    return '';
  }
}

// Export a singleton instance
export const fileRepository = new FileRepository();