import { GalleryFileRepository } from './file.repository';
import { 
  GalleryData, 
  GalleryAlbum, 
  GalleryAlbums,
  GalleryFilterOptions, 
  GallerySearchResult,
  ContactInfo,
} from '../model/types';

// Create a singleton instance of the repository
const galleryRepository = new GalleryFileRepository();

/**
 * Gallery API Functions
 * Provides a clean interface for accessing gallery data
 */

/**
 * Get complete gallery data including cover and contact info
 * @returns Promise<GalleryData>
 */
export const getGalleryData = async (): Promise<GalleryData> => {
  return galleryRepository.getGalleryData();
};

/**
 * Get gallery cover image
 * @returns Promise<string>
 */
export const getGalleryCover = async (): Promise<string> => {
  return galleryRepository.getCoverImage();
};

/**
 * Get contact information
 * @returns Promise<ContactInfo>
 */
export const getGalleryContactInfo = async (): Promise<ContactInfo> => {
  return galleryRepository.getContactInfo();
};

/**
 * Get all gallery albums
 * @returns Promise<GalleryAlbums>
 */
export const getAllGalleryAlbums = async (): Promise<GalleryAlbums> => {
  return galleryRepository.getAllAlbums();
};

/**
 * Get gallery album by ID
 * @param id - Album ID
 * @returns Promise<GalleryAlbum | null>
 */
export const getGalleryAlbumById = async (id: number): Promise<GalleryAlbum | null> => {
  return galleryRepository.getAlbumById(id);
};

/**
 * Get gallery album by slug
 * @param slug - Album slug
 * @returns Promise<GalleryAlbum | null>
 */
export const getGalleryAlbumBySlug = async (slug: string): Promise<GalleryAlbum | null> => {
  return galleryRepository.getAlbumBySlug(slug);
};

/**
 * Get sub-album by album slug and sub-album slug
 * @param albumSlug - Parent album slug
 * @param subAlbumSlug - Sub-album slug
 * @returns Promise<GallerySearchResult>
 */
export const getGallerySubAlbum = async (
  albumSlug: string, 
  subAlbumSlug: string
): Promise<GallerySearchResult> => {
  return galleryRepository.getSubAlbum(albumSlug, subAlbumSlug);
};

/**
 * Filter gallery albums based on criteria
 * @param options - Filter options
 * @returns Promise<GalleryAlbums>
 */
export const filterGalleryAlbums = async (options: GalleryFilterOptions): Promise<GalleryAlbums> => {
  return galleryRepository.filterAlbums(options);
};

/**
 * Get albums that have sub-albums
 * @returns Promise<GalleryAlbums>
 */
export const getAlbumsWithSubAlbums = async (): Promise<GalleryAlbums> => {
  return galleryRepository.getAlbumsWithSubAlbums();
};

/**
 * Get albums that have direct galleries (no sub-albums)
 * @returns Promise<GalleryAlbums>
 */
export const getAlbumsWithDirectGalleries = async (): Promise<GalleryAlbums> => {
  return galleryRepository.getAlbumsWithDirectGalleries();
};

/**
 * Search albums by title
 * @param searchTerm - Search term
 * @returns Promise<GalleryAlbums>
 */
export const searchGalleryAlbumsByTitle = async (searchTerm: string): Promise<GalleryAlbums> => {
  return galleryRepository.searchAlbumsByTitle(searchTerm);
};

/**
 * Get total count of albums
 * @returns Promise<number>
 */
export const getGalleryAlbumsCount = async (): Promise<number> => {
  return galleryRepository.getAlbumsCount();
};

/**
 * Get total count of sub-albums
 * @returns Promise<number>
 */
export const getGallerySubAlbumsCount = async (): Promise<number> => {
  return galleryRepository.getSubAlbumsCount();
};

// Export types for external use
export type {
  GalleryData,
  GalleryAlbum,
  GalleryAlbums,
  SubAlbum,
  GalleryFilterOptions,
  GallerySearchResult,
  GalleryImage,
  CoverImage,
  ContactInfo
} from '../model/types';

// Export repository class for advanced use cases
export { GalleryFileRepository } from './file.repository';