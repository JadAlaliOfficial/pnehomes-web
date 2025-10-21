/**
 * Content item interface for service sections
 */
export interface ServiceContentItem {
  img: string;
  sub_title: string;
  description: string;
}

/**
 * Contact information interface for services
 */
export interface ServiceContact {
  title: string;
  message: string;
}

/**
 * Main service interface
 */
export interface Service {
  id: number;
  slug: string;
  title: string;
  sub_title?: string;
  description?: string;
  content: ServiceContentItem[];
  contact: ServiceContact;
}

/**
 * Array of services type
 */
export type Services = Service[];

/**
 * Main services data structure with cover and services array
 */
export interface ServicesData {
  cover: string;
  services: Services;
}

/**
 * Service repository interface for data operations
 */
export interface ServiceRepository {
  getAll(): Promise<Services>;
  getById(id: number): Promise<Service | null>;
  getBySlug(slug: string): Promise<Service | null>;
  getCover(): Promise<string>;
}

/**
 * Service API response types
 */
export interface ServiceApiResponse {
  data: Services;
  success: boolean;
  message?: string;
}

export interface SingleServiceApiResponse {
  data: Service | null;
  success: boolean;
  message?: string;
}

export interface CoverApiResponse {
  data: string;
  success: boolean;
  message?: string;
}