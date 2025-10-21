/**
 * Contact information interface for aboutUs section
 */
export interface ContactInfo {
  title: string;
  message: string;
}

/**
 * Main aboutUs data interface
 */
export interface AboutUsData {
  cover: string;
  slogan: string;
  title: string;
  description: string;
  contact?: ContactInfo;
}

/**
 * API response wrapper for aboutUs data
 */
export interface AboutUsResponse {
  data: AboutUsData;
  success: boolean;
  message?: string;
}