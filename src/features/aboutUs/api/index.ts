/**
 * AboutUs API - Main entry point
 * 
 * This module provides a centralized API for accessing aboutUs data
 * and serves as the main interface for the aboutUs feature.
 */

// Export types
export type { AboutUsData, ContactInfo, AboutUsResponse } from '../model/types';

// Export repository functions
export { AboutUsFileRepository } from './file.repository';

// Re-export commonly used functions for convenience
import { AboutUsFileRepository } from './file.repository';

/**
 * Convenience function to get all aboutUs data
 * @returns Promise<AboutUsResponse> - Complete aboutUs data
 */
export const getAboutUsData = () => AboutUsFileRepository.getAboutUsData();

/**
 * Convenience function to get contact information
 * @returns Promise<ContactInfo | null> - Contact information
 */
export const getContactInfo = () => AboutUsFileRepository.getContactInfo();

/**
 * Convenience function to get the main title
 * @returns Promise<string | null> - The title
 */
export const getTitle = () => AboutUsFileRepository.getTitle();

/**
 * Convenience function to get the slogan
 * @returns Promise<string | null> - The slogan
 */
export const getSlogan = () => AboutUsFileRepository.getSlogan();

/**
 * Convenience function to get the description
 * @returns Promise<string | null> - The description
 */
export const getDescription = () => AboutUsFileRepository.getDescription();

/**
 * Default export - AboutUs API object with all methods
 */
const AboutUsAPI = {
  getAboutUsData,
  getContactInfo,
  getTitle,
  getSlogan,
  getDescription,
  Repository: AboutUsFileRepository
};

export default AboutUsAPI;