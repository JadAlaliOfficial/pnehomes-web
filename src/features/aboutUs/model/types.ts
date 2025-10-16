/**
 * Contact information interface for aboutUs section
 */
export interface ContactInfo {
  title: string;
  slug: string;
}

/**
 * Main aboutUs data interface
 */
export interface AboutUsData {
  slogan: string;
  title: string;
  description: string;
  contact: ContactInfo;
}

/**
 * API response wrapper for aboutUs data
 */
export interface AboutUsResponse {
  data: AboutUsData;
  success: boolean;
  message?: string;
}