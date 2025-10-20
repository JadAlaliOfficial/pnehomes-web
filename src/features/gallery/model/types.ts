/**
 * Gallery Image Interface
 * Represents a single image with virtual and real versions
 */
export interface GalleryImage {
  virtual_img: string;
  real_img: string;
}

/**
 * Cover Image Interface
 * Represents a cover image for albums and sub-albums
 */
export interface CoverImage {
  virtual_img: string;
  real_img: string;
}

/**
 * Sub Album Interface
 * Represents a sub-album within a main gallery album
 */
export interface SubAlbum {
  slug: string;
  title: string;
  cover_img: CoverImage;
  gallery: GalleryImage[];
}

/**
 * Gallery Album Interface
 * Represents a main gallery album that can contain either sub-albums or direct gallery images
 */
export interface GalleryAlbum {
  id: number;
  slug: string;
  title: string;
  cover_img: CoverImage;
  sub_albums?: SubAlbum[];
  gallery?: GalleryImage[];
}

/**
 * Contact Information Interface
 * Represents contact information for gallery inquiries
 */
export interface ContactInfo {
  title: string;
  message: string;
}

/**
 * Gallery Data Interface
 * Represents the complete gallery data structure with cover and albums
 */
export interface GalleryData {
  cover: string;
  gallery: GalleryAlbum[];
  contact: ContactInfo;
}

/**
 * Gallery Albums Type
 * Array of gallery albums (for backward compatibility)
 */
export type GalleryAlbums = GalleryAlbum[];

/**
 * Gallery Filter Options
 * Options for filtering gallery data
 */
export interface GalleryFilterOptions {
  slug?: string;
  id?: number;
  hasSubAlbums?: boolean;
}

/**
 * Gallery Search Result
 * Result type for gallery search operations
 */
export interface GallerySearchResult {
  album?: GalleryAlbum;
  subAlbum?: SubAlbum;
  found: boolean;
}