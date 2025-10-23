import { OurTeamData } from '../model/types'
import ourTeamData from '../mock/ourTeam.json'

/**
 * Repository class for handling ourTeam data operations
 */
export class OurTeamRepository {
  /**
   * Get all ourTeam data
   * @returns Promise<OurTeamData> - The complete ourTeam data
   */
  static async getOurTeamData(): Promise<OurTeamData> {
    // In a real application, this might fetch from an API
    // For now, we return the mock data
    return Promise.resolve(ourTeamData as OurTeamData)
  }

  /**
   * Get team members only
   * @returns Promise<TeamMember[]> - Array of team members
   */
  static async getTeamMembers() {
    const data = await this.getOurTeamData()
    return data.team
  }

  /**
   * Get a specific team member by name
   * @param name - The name of the team member
   * @returns Promise<TeamMember | undefined> - The team member or undefined if not found
   */
  static async getTeamMemberByName(name: string) {
    const data = await this.getOurTeamData()
    return data.team.find(member => member.name.toLowerCase() === name.toLowerCase())
  }

  /**
   * Get team member by position
   * @param position - The position to search for
   * @returns Promise<TeamMember | undefined> - The team member or undefined if not found
   */
  static async getTeamMemberByPosition(position: string) {
    const data = await this.getOurTeamData()
    return data.team.find(member => member.position.toLowerCase().includes(position.toLowerCase()))
  }

  /**
   * Get contact information
   * @returns Promise<Contact | undefined> - The contact information or undefined if not available
   */
  static async getContactInfo() {
    const data = await this.getOurTeamData()
    return data.contact
  }

  /**
   * Get page header information (slogan, title, subtitle, description, cover)
   * @returns Promise<Omit<OurTeamData, 'team' | 'contact'>> - Header information
   */
  static async getHeaderInfo() {
    const data = await this.getOurTeamData()
    return {
      cover: data.cover,
      slogan: data.slogan,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
    }
  }
}
