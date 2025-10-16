import { HomeLayoutRepository } from './folder.repository';
import { HomeLayout, NavigationItem, SocialMediaItem } from '../model/types';

// Initialize repository instance
const homeLayoutRepo = HomeLayoutRepository.getInstance();

/**
 * Home Layout API - Main entry point for all home layout operations
 */
export const homeLayoutApi = {
  /**
   * Get complete home layout configuration
   */
  getLayout: (): HomeLayout => {
    return homeLayoutRepo.getHomeLayout();
  },

  /**
   * Get header configuration including logo, navigation, button, and phone
   */
  getHeader: () => {
    return homeLayoutRepo.getHeaderConfig();
  },

  /**
   * Get footer configuration including navigation, phone, and social links
   */
  getFooter: () => {
    return homeLayoutRepo.getFooterConfig();
  },

  /**
   * Get header navigation items
   */
  getHeaderNav: (): NavigationItem[] => {
    return homeLayoutRepo.getHeaderNavigation();
  },

  /**
   * Get footer navigation items
   */
  getFooterNav: (): NavigationItem[] => {
    return homeLayoutRepo.getFooterNavigation();
  },

  /**
   * Get social media links
   */
  getSocialLinks: (): SocialMediaItem[] => {
    return homeLayoutRepo.getSocialMediaLinks();
  },

  /**
   * Get contact phone number
   */
  getPhone: (): number => {
    return homeLayoutRepo.getContactPhone();
  },

  /**
   * Update layout configuration (for future use)
   */
  updateLayout: (updates: Partial<HomeLayout>): void => {
    homeLayoutRepo.updateHomeLayout(updates);
  }
};

// Export types for external use
export type { HomeLayout, NavigationItem, SocialMediaItem } from '../model/types';

// Export repository for advanced use cases
export { HomeLayoutRepository } from './folder.repository';

// Default export
export default homeLayoutApi;