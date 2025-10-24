import { HomeContentRepository } from './new.home_content.repository'
import {
  HomeContent,
  Hero,
  Services,
  GridSection,
  FirstSection,
  Testimonial,
} from '../model/home_content.types'

// Initialize repository instance
const homeContentRepo = HomeContentRepository.getInstance()

/**
 * Home Content API - Main entry point for all home page content operations
 * NOTE: now async to support fetching from CMS.
 */
export const homeContentApi = {
  getContent: async (): Promise<HomeContent> => {
    return homeContentRepo.getHomeContent()
  },

  getFirstSection: async (): Promise<FirstSection> => {
    return homeContentRepo.getFirstSection()
  },

  getHero: async (): Promise<Hero> => {
    return homeContentRepo.getHero()
  },

  getServices: async (): Promise<Services> => {
    return homeContentRepo.getServices()
  },

  getGridSection: async (): Promise<GridSection> => {
    return homeContentRepo.getGridSection()
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    return homeContentRepo.getTestimonials()
  },

  getContact: async (): Promise<string> => {
    return homeContentRepo.getContact()
  },

  getMainVideo: async (): Promise<string> => {
    return homeContentRepo.getMainVideo()
  },

  getLogo: async (): Promise<string> => {
    return homeContentRepo.getLogo()
  },

  getMainTitle: async () => {
    return homeContentRepo.getMainTitle()
  },

  getBookButton: async (): Promise<string | null> => {
    return homeContentRepo.getBookButton()
  },

  hasBookButton: async (): Promise<boolean> => {
    return homeContentRepo.hasBookButton()
  },

  hasFirstSectionSubtitle: async (): Promise<boolean> => {
    return homeContentRepo.hasFirstSectionSubtitle()
  },

  hasHeroSubtitle: async (): Promise<boolean> => {
    return homeContentRepo.hasHeroSubtitle()
  },

  hasServicesDescription: async (): Promise<boolean> => {
    return homeContentRepo.hasServicesDescription()
  },

  getCoverForMobile: async (): Promise<string> => {
    return homeContentRepo.getCoverForMobile()
  },

  getServicesCover: async (): Promise<string> => {
    return homeContentRepo.getServicesCover()
  },

  updateContent: (updates: Partial<HomeContent>): void => {
    homeContentRepo.updateHomeContent(updates)
  },
}

// Export types for external use
export type {
  HomeContent,
  Hero,
  Services,
  GridSection,
  FirstSection,
  Testimonial,
  HeroSection,
  ServiceLink,
  LinkItem,
} from '../model/home_content.types'

// Export repository for advanced use cases
export { HomeContentRepository } from '../mock/home_content.repository'

// Default export
export default homeContentApi
