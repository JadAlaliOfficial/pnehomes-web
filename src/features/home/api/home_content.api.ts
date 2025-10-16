import { HomeContentRepository } from './home_content.repository';
import { HomeContent, Hero, Services, Links, Testimonial, Contact, ButtonLink } from '../model/home_content.types';

// Initialize repository instance
const homeContentRepo = HomeContentRepository.getInstance();

/**
 * Home Content API - Main entry point for all home page content operations
 */
export const homeContentApi = {
  /**
   * Get complete home content configuration
   */
  getContent: (): HomeContent => {
    return homeContentRepo.getHomeContent();
  },

  /**
   * Get hero section data
   */
  getHero: (): Hero => {
    return homeContentRepo.getHero();
  },

  /**
   * Get services section data
   */
  getServices: (): Services => {
    return homeContentRepo.getServices();
  },

  /**
   * Get links section data
   */
  getLinks: (): Links => {
    return homeContentRepo.getLinks();
  },

  /**
   * Get testimonials data
   */
  getTestimonials: (): Testimonial[] => {
    return homeContentRepo.getTestimonials();
  },

  /**
   * Get contact section data
   */
  getContact: (): Contact => {
    return homeContentRepo.getContact();
  },

  /**
   * Get main video URL
   */
  getMainVideo: (): string => {
    return homeContentRepo.getMainVideo();
  },

  /**
   * Get logo URL
   */
  getLogo: (): string => {
    return homeContentRepo.getLogo();
  },

  /**
   * Get main title and subtitle
   */
  getMainTitle: () => {
    return homeContentRepo.getMainTitle();
  },

  /**
   * Get book button data
   */
  getBookButton: (): ButtonLink => {
    return homeContentRepo.getBookButton();
  },

  /**
   * Update content configuration (for future use)
   */
  updateContent: (updates: Partial<HomeContent>): void => {
    homeContentRepo.updateHomeContent(updates);
  }
};

// Export types for external use
export type { 
  HomeContent, 
  Hero, 
  Services, 
  Links, 
  Testimonial, 
  Contact, 
  ButtonLink,
  HeroSection,
  ServiceLink,
  LinkItem
} from '../model/home_content.types';

// Export repository for advanced use cases
export { HomeContentRepository } from './home_content.repository';

// Default export
export default homeContentApi;