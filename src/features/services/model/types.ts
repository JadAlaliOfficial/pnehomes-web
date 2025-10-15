/**
 * Content item interface for service sections
 */
export interface ServiceContentItem {
  img: string;
  sub_title: string;
  description: string;
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
}

/**
 * Array of services type
 */
export type Services = Service[];

/**
 * Service repository interface for data operations
 */
export interface ServiceRepository {
  getAll(): Promise<Services>;
  getById(id: number): Promise<Service | null>;
  getBySlug(slug: string): Promise<Service | null>;
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