import { FileRepository } from './file.repository'
import { Community, CommunityFilter, PropertyFilter, SearchFilters } from '../model/types'
import { CommunitySelector } from '../model/selector'

export class CommunitiesAPI {
  private repository: FileRepository
  private selector: CommunitySelector

  constructor() {
    this.repository = new FileRepository()
    this.selector = new CommunitySelector()
  }

  /**
   * Get all communities
   */
  async getAllCommunities(): Promise<Community[]> {
    return this.repository.getAllCommunities()
  }

  /**
   * Get community by slug
   */
  async getCommunityBySlug(slug: string): Promise<Community | null> {
    return this.repository.getCommunityBySlug(slug)
  }

  /**
   * Get community by ID
   */
  async getCommunityById(id: number): Promise<Community | null> {
    return this.repository.getCommunityById(id)
  }

  /**
   * Filter communities by name and/or city
   */
  async filterCommunities(filters: CommunityFilter): Promise<Community[]> {
    const allCommunities = await this.repository.getAllCommunities()
    return this.selector.filterCommunities(allCommunities, filters)
  }

  /**
   * Search properties within communities based on bedrooms, baths, and price
   */
  async searchProperties(
    communitySlug: string,
    filters: PropertyFilter
  ): Promise<Community | null> {
    const community = await this.repository.getCommunityBySlug(communitySlug)
    if (!community) return null

    return this.selector.filterProperties(community, filters)
  }

  /**
   * Advanced search with both community and property filters
   */
  async advancedSearch(filters: SearchFilters): Promise<Community[]> {
    let communities = await this.repository.getAllCommunities()

    // Filter communities first
    if (filters.community) {
      communities = this.selector.filterCommunities(communities, filters.community)
    }

    // Then filter properties within each community
    if (filters.property) {
      communities = communities
        .map(community => this.selector.filterProperties(community, filters.property!))
        .filter(community => (community['floor-plans'] || []).length > 0)
    }

    return communities
  }

  /**
   * Get all unique cities
   */
  async getAllCities(): Promise<string[]> {
    return this.repository.getAllCities()
  }

  /**
   * Get Zillow URL
   */
  async getZillowUrl(): Promise<string> {
    return this.repository.getZillowUrl()
  }

  /**
   * Get contact message template
   */
  async getContactMessage(): Promise<string> {
    return this.repository.getContactMessage()
  }

  /**
   * Get cover image
   */
  async getCoverImage(): Promise<string> {
    return this.repository.getCoverImage()
  }
}

// Export singleton instance
export const communitiesAPI = new CommunitiesAPI()

// Export types for convenience
export * from '../model/types'
