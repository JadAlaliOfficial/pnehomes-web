// Privacy Policy API - Main Entry Point
export { PrivacyPolicyFileRepository } from './file.repository'
export type { PrivacyPolicy, Contact, PrivacyPolicyResponse } from '../model/types'

// Re-export commonly used functions for easier access
import { PrivacyPolicyFileRepository } from './file.repository'

/**
 * Main Privacy Policy API functions
 */
export const PrivacyPolicyAPI = {
  /**
   * Get complete privacy policy data
   */
  getPrivacyPolicy: () => PrivacyPolicyFileRepository.getPrivacyPolicy(),

  /**
   * Get privacy policy slogan
   */
  getSlogan: () => PrivacyPolicyFileRepository.getSlogan(),

  /**
   * Get privacy policy title
   */
  getTitle: () => PrivacyPolicyFileRepository.getTitle(),

  /**
   * Get privacy policy description
   */
  getDescription: () => PrivacyPolicyFileRepository.getDescription(),

  /**
   * Get privacy policy cover
   */
  getCover: () => PrivacyPolicyFileRepository.getCover(),

  /**
   * Get contact information
   */
  getContact: () => PrivacyPolicyFileRepository.getContact(),
}

// Default export for convenience
export default PrivacyPolicyAPI
