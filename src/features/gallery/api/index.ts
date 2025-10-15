import { GalleryFileRepository } from './file.repository';
import { 
  GalleryData, 
  GalleryAlbum, 
  SubAlbum, 
  GalleryFilterOptions, 
  GallerySearchResult 
} from '../model/types';

// Create a singleton instance of the repository
const galleryRepository = new GalleryFileRepository();

/**
 * Gallery API Functions
 * Provides a clean interface for accessing gallery data
 */

/**
 * Get all gallery albums
 * @returns Promise<GalleryData>
 */
export const getAllGalleryAlbums = async (): Promise<GalleryData> => {
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
 * @returns Promise<GalleryData>
 */
export const filterGalleryAlbums = async (options: GalleryFilterOptions): Promise<GalleryData> => {
  return galleryRepository.filterAlbums(options);
};

/**
 * Get albums that have sub-albums
 * @returns Promise<GalleryData>
 */
export const getAlbumsWithSubAlbums = async (): Promise<GalleryData> => {
  return galleryRepository.getAlbumsWithSubAlbums();
};

/**
 * Get albums that have direct galleries (no sub-albums)
 * @returns Promise<GalleryData>
 */
export const getAlbumsWithDirectGalleries = async (): Promise<GalleryData> => {
  return galleryRepository.getAlbumsWithDirectGalleries();
};

/**
 * Search albums by title
 * @param searchTerm - Search term
 * @returns Promise<GalleryData>
 */
export const searchGalleryAlbumsByTitle = async (searchTerm: string): Promise<GalleryData> => {
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
  SubAlbum,
  GalleryFilterOptions,
  GallerySearchResult,
  GalleryImage,
  CoverImage
} from '../model/types';

// Export repository class for advanced use cases
export { GalleryFileRepository } from './file.repository';