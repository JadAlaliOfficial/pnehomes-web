// src/privacy-policy/index.ts

// Privacy Policy API - Main Entry Point
export { PrivacyPolicyHttpRepository } from './http.repository'
export type { PrivacyPolicy, Contact, PrivacyPolicyResponse } from '../model/types'

// Re-export commonly used functions for easier access
import { PrivacyPolicyHttpRepository } from './http.repository'

/**
 * Main Privacy Policy API functions
 */
export const PrivacyPolicyAPI = {
  /**
   * Get complete privacy policy data
   */
  getPrivacyPolicy: () => PrivacyPolicyHttpRepository.getPrivacyPolicy(),

  /**
   * Get privacy policy slogan
   */
  getSlogan: () => PrivacyPolicyHttpRepository.getSlogan(),

  /**
   * Get privacy policy title
   */
  getTitle: () => PrivacyPolicyHttpRepository.getTitle(),

  /**
   * Get privacy policy description (HTML string)
   */
  getDescription: () => PrivacyPolicyHttpRepository.getDescription(),

  /**
   * Get privacy policy cover
   */
  getCover: () => PrivacyPolicyHttpRepository.getCover(),

  /**
   * Get contact information
   */
  getContact: () => PrivacyPolicyHttpRepository.getContact(),
}

// Default export for convenience
export default PrivacyPolicyAPI
