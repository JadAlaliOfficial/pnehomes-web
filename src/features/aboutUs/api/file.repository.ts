import { AboutUsData, AboutUsResponse, ContactInfo } from '../model/types'
import aboutUsData from '../mock/aboutUs.json'

/**
 * Repository class for handling aboutUs data operations
 */
export class AboutUsFileRepository {
  /**
   * Get aboutUs data from the JSON file
   * @returns Promise<AboutUsResponse> - The aboutUs data wrapped in a response object
   */
  static async getAboutUsData(): Promise<AboutUsResponse> {
    try {
      // Simulate async operation (in real scenario, this might be a file read or API call)
      await new Promise(resolve => setTimeout(resolve, 100))

      return {
        data: aboutUsData as AboutUsData,
        success: true,
        message: 'AboutUs data retrieved successfully',
      }
    } catch (error) {
      return {
        data: {} as AboutUsData,
        success: false,
        message: `Failed to retrieve aboutUs data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }
    }
  }

  /**
   * Get contact information from aboutUs data
   * @returns Promise<ContactInfo | null> - The contact information or null if not found
   */
  static async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const response = await this.getAboutUsData()
      if (response.success && response.data.contact) {
        return response.data.contact
      }
      return null
    } catch (error) {
      console.error('Error retrieving contact info:', error)
      return null
    }
  }

  /**
   * Get the main title from aboutUs data
   * @returns Promise<string | null> - The title or null if not found
   */
  static async getTitle(): Promise<string | null> {
    try {
      const response = await this.getAboutUsData()
      if (response.success && response.data.title) {
        return response.data.title
      }
      return null
    } catch (error) {
      console.error('Error retrieving title:', error)
      return null
    }
  }

  /**
   * Get the slogan from aboutUs data
   * @returns Promise<string | null> - The slogan or null if not found
   */
  static async getSlogan(): Promise<string | null> {
    try {
      const response = await this.getAboutUsData()
      if (response.success && response.data.slogan) {
        return response.data.slogan
      }
      return null
    } catch (error) {
      console.error('Error retrieving slogan:', error)
      return null
    }
  }

  /**
   * Get the description from aboutUs data
   * @returns Promise<string | null> - The description or null if not found
   */
  static async getDescription(): Promise<string | null> {
    try {
      const response = await this.getAboutUsData()
      if (response.success && response.data.description) {
        return response.data.description
      }
      return null
    } catch (error) {
      console.error('Error retrieving description:', error)
      return null
    }
  }

  /**
   * Get the cover image from aboutUs data
   * @returns Promise<string | null> - The cover image path or null if not found
   */
  static async getCover(): Promise<string | null> {
    try {
      const response = await this.getAboutUsData()
      if (response.success && response.data.cover) {
        return response.data.cover
      }
      return null
    } catch (error) {
      console.error('Error retrieving cover:', error)
      return null
    }
  }
}
