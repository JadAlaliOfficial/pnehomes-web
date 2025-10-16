import { PrivacyPolicy, PrivacyPolicyResponse } from '../model/types';
import privacyPolicyData from '../mock/privacyPolicy.json';

/**
 * Repository class for handling privacy policy data operations
 */
export class PrivacyPolicyFileRepository {
  /**
   * Get privacy policy data from the JSON file
   * @returns Promise<PrivacyPolicyResponse>
   */
  static async getPrivacyPolicy(): Promise<PrivacyPolicyResponse> {
    try {
      // Simulate async operation (in case of future API integration)
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const data: PrivacyPolicy = privacyPolicyData as PrivacyPolicy;
      
      return {
        data,
        success: true,
        message: 'Privacy policy data retrieved successfully'
      };
    } catch (error) {
      return {
        data: {} as PrivacyPolicy,
        success: false,
        message: `Failed to retrieve privacy policy data: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Get privacy policy slogan
   * @returns Promise<string>
   */
  static async getSlogan(): Promise<string> {
    try {
      const response = await this.getPrivacyPolicy();
      return response.success ? response.data.slogan : '';
    } catch (error) {
      console.error('Error getting privacy policy slogan:', error);
      return '';
    }
  }

  /**
   * Get privacy policy title
   * @returns Promise<string>
   */
  static async getTitle(): Promise<string> {
    try {
      const response = await this.getPrivacyPolicy();
      return response.success ? response.data.title : '';
    } catch (error) {
      console.error('Error getting privacy policy title:', error);
      return '';
    }
  }

  /**
   * Get privacy policy description
   * @returns Promise<string>
   */
  static async getDescription(): Promise<string> {
    try {
      const response = await this.getPrivacyPolicy();
      return response.success ? response.data.description : '';
    } catch (error) {
      console.error('Error getting privacy policy description:', error);
      return '';
    }
  }

  /**
   * Get contact information
   * @returns Promise<{title: string, slug: string}>
   */
  static async getContact(): Promise<{title: string, slug: string}> {
    try {
      const response = await this.getPrivacyPolicy();
      return response.success ? response.data.contact : { title: '', slug: '' };
    } catch (error) {
      console.error('Error getting privacy policy contact:', error);
      return { title: '', slug: '' };
    }
  }
}