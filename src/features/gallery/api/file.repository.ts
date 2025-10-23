import {
  GalleryData,
  GalleryAlbum,
  GalleryAlbums,
  GalleryFilterOptions,
  GallerySearchResult,
  ContactInfo,
} from '../model/types'
import galleryData from '../mock/gallery.json'

/**
 * Gallery File Repository
 * Handles data access operations for gallery data
 */
export class GalleryFileRepository {
  private data: GalleryData

  constructor() {
    this.data = galleryData as GalleryData
  }

  /**
   * Get complete gallery data including cover and contact info
   * @returns Promise<GalleryData>
   */
  async getGalleryData(): Promise<GalleryData> {
    return Promise.resolve(this.data)
  }

  /**
   * Get gallery cover image
   * @returns Promise<string>
   */
  async getCoverImage(): Promise<string> {
    return Promise.resolve(this.data.cover)
  }

  /**
   * Get contact information
   * @returns Promise<ContactInfo>
   */
  async getContactInfo(): Promise<ContactInfo> {
    return Promise.resolve(this.data.contact)
  }

  /**
   * Get all gallery albums
   * @returns Promise<GalleryAlbums>
   */
  async getAllAlbums(): Promise<GalleryAlbums> {
    return Promise.resolve(this.data.gallery)
  }

  /**
   * Get album by ID
   * @param id - Album ID
   * @returns Promise<GalleryAlbum | null>
   */
  async getAlbumById(id: number): Promise<GalleryAlbum | null> {
    const album = this.data.gallery.find(album => album.id === id)
    return Promise.resolve(album || null)
  }

  /**
   * Get album by slug
   * @param slug - Album slug
   * @returns Promise<GalleryAlbum | null>
   */
  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    const album = this.data.gallery.find(album => album.slug === slug)
    return Promise.resolve(album || null)
  }

  /**
   * Get sub-album by album slug and sub-album slug
   * @param albumSlug - Parent album slug
   * @param subAlbumSlug - Sub-album slug
   * @returns Promise<GallerySearchResult>
   */
  async getSubAlbum(albumSlug: string, subAlbumSlug: string): Promise<GallerySearchResult> {
    const album = this.data.gallery.find(album => album.slug === albumSlug)

    if (!album || !album.sub_albums) {
      return Promise.resolve({ found: false })
    }

    const subAlbum = album.sub_albums.find(sub => sub.slug === subAlbumSlug)

    if (!subAlbum) {
      return Promise.resolve({ found: false, album })
    }

    return Promise.resolve({ found: true, album, subAlbum })
  }

  /**
   * Filter albums based on criteria
   * @param options - Filter options
   * @returns Promise<GalleryAlbums>
   */
  async filterAlbums(options: GalleryFilterOptions): Promise<GalleryAlbums> {
    let filteredData = [...this.data.gallery]

    if (options.id !== undefined) {
      filteredData = filteredData.filter(album => album.id === options.id)
    }

    if (options.slug) {
      filteredData = filteredData.filter(album => album.slug === options.slug)
    }

    if (options.hasSubAlbums !== undefined) {
      filteredData = filteredData.filter(album => {
        const hasSubAlbums = album.sub_albums && album.sub_albums.length > 0
        return options.hasSubAlbums ? hasSubAlbums : !hasSubAlbums
      })
    }

    return Promise.resolve(filteredData)
  }

  /**
   * Get albums with sub-albums only
   * @returns Promise<GalleryAlbums>
   */
  async getAlbumsWithSubAlbums(): Promise<GalleryAlbums> {
    return this.filterAlbums({ hasSubAlbums: true })
  }

  /**
   * Get albums with direct galleries only (no sub-albums)
   * @returns Promise<GalleryAlbums>
   */
  async getAlbumsWithDirectGalleries(): Promise<GalleryAlbums> {
    return this.filterAlbums({ hasSubAlbums: false })
  }

  /**
   * Search for albums by title (case-insensitive)
   * @param searchTerm - Search term
   * @returns Promise<GalleryAlbums>
   */
  async searchAlbumsByTitle(searchTerm: string): Promise<GalleryAlbums> {
    const lowerSearchTerm = searchTerm.toLowerCase()
    const results = this.data.gallery.filter(album =>
      album.title.toLowerCase().includes(lowerSearchTerm)
    )
    return Promise.resolve(results)
  }

  /**
   * Get total count of albums
   * @returns Promise<number>
   */
  async getAlbumsCount(): Promise<number> {
    return Promise.resolve(this.data.gallery.length)
  }

  /**
   * Get total count of sub-albums across all albums
   * @returns Promise<number>
   */
  async getSubAlbumsCount(): Promise<number> {
    const count = this.data.gallery.reduce((total, album) => {
      return total + (album.sub_albums?.length || 0)
    }, 0)
    return Promise.resolve(count)
  }
}
