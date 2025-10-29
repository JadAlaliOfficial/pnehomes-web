import {
  GalleryData,
  GalleryAlbum,
  GalleryAlbums,
  GalleryFilterOptions,
  GallerySearchResult,
  ContactInfo,
} from '../model/types'
import { httpGetJson } from '../data/http'

// If you prefer env config, replace with process.env.NEXT_PUBLIC_CMS_BASE_URL, etc.
const CMS_GALLERY_URL =
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_CMS_GALLERY_URL) ||
  'https://cms.pnehomes.com/api/gallery'

type ApiEnvelope<T> = {
  success: boolean
  data: T
}

// --- Raw CMS shapes (all fields optional/unknown) ---
type RawImage = {
  virtual_img?: unknown
  real_img?: unknown
}

type RawSubAlbum = {
  slug?: unknown
  title?: unknown
  cover_img?: unknown
  gallery?: unknown
}

type RawAlbum = {
  id?: unknown
  slug?: unknown
  title?: unknown
  cover_img?: unknown
  sub_albums?: unknown
  gallery?: unknown
}

type RawGalleryData = {
  title?: unknown
  cover?: unknown
  contact?: unknown
  gallery?: unknown
}

// Normalize the server payload into our existing GalleryData shape.
// This keeps the rest of your app unchanged.
async function fetchGalleryData(): Promise<GalleryData> {
  const res = await httpGetJson<ApiEnvelope<RawGalleryData>>(CMS_GALLERY_URL)
  if (!res?.success || !res?.data) {
    throw new Error('Invalid gallery response')
  }

  const raw = res.data

  const normalized: GalleryData = {
    title: String(raw.title ?? ''),
    cover: String(raw.cover ?? ''),
    contact: raw.contact as ContactInfo, // keep as-is if your app expects this exact shape
    gallery: Array.isArray(raw.gallery)
      ? (raw.gallery as RawAlbum[]).map((album: RawAlbum) => ({
          id: Number(album.id),
          slug: String(album.slug ?? ''),
          title: String(album.title ?? ''),
          cover_img: String(album.cover_img ?? ''),
          sub_albums: Array.isArray(album.sub_albums)
            ? (album.sub_albums as RawSubAlbum[]).map((sub: RawSubAlbum) => ({
                slug: String(sub.slug ?? ''),
                title: String(sub.title ?? ''),
                cover_img: String(sub.cover_img ?? ''),
                gallery: Array.isArray(sub.gallery)
                  ? (sub.gallery as RawImage[]).map((g: RawImage) => ({
                      virtual_img: String(g.virtual_img ?? ''),
                      real_img: String(g.real_img ?? ''),
                    }))
                  : [],
              }))
            : [],
          gallery: Array.isArray(album.gallery)
            ? (album.gallery as RawImage[]).map((g: RawImage) => ({
                virtual_img: String(g.virtual_img ?? ''),
                real_img: String(g.real_img ?? ''),
              }))
            : [],
        }))
      : [],
  }

  return normalized
}

/**
 * Gallery API Repository
 * Mirrors the file.repository API but sources from the CMS.
 */
export class GalleryApiRepository {
  // simple in-memory cache to avoid repeated network calls within a session
  private cache: GalleryData | null = null

  private async ensureData(): Promise<GalleryData> {
    if (this.cache) return this.cache
    this.cache = await fetchGalleryData()
    return this.cache
  }

  async getGalleryData(): Promise<GalleryData> {
    return this.ensureData()
  }

  async getCoverImage(): Promise<string> {
    const data = await this.ensureData()
    return data.cover
  }

  async getGalleryTitle(): Promise<string> {
    const data = await this.ensureData()
    return data.title
  }

  async getContactInfo(): Promise<ContactInfo> {
    const data = await this.ensureData()
    return data.contact
  }

  async getAllAlbums(): Promise<GalleryAlbums> {
    const data = await this.ensureData()
    return data.gallery
  }

  async getAlbumById(id: number): Promise<GalleryAlbum | null> {
    const data = await this.ensureData()
    return data.gallery.find(a => a.id === id) ?? null
  }

  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    const data = await this.ensureData()
    return data.gallery.find(a => a.slug === slug) ?? null
  }

  async getSubAlbum(albumSlug: string, subAlbumSlug: string): Promise<GallerySearchResult> {
    const album = await this.getAlbumBySlug(albumSlug)
    if (!album || !album.sub_albums || album.sub_albums.length === 0) {
      return { found: false }
    }
    const subAlbum = album.sub_albums.find(s => s.slug === subAlbumSlug)
    if (!subAlbum) return { found: false, album }
    return { found: true, album, subAlbum }
  }

  async filterAlbums(options: GalleryFilterOptions): Promise<GalleryAlbums> {
    const data = await this.ensureData()
    let filtered = [...data.gallery]

    if (options.id !== undefined) {
      filtered = filtered.filter(a => a.id === options.id)
    }
    if (options.slug) {
      filtered = filtered.filter(a => a.slug === options.slug)
    }
    if (options.hasSubAlbums !== undefined) {
      filtered = filtered.filter(a => {
        const has = !!(a.sub_albums && a.sub_albums.length > 0)
        return options.hasSubAlbums ? has : !has
      })
    }
    return filtered
  }

  async getAlbumsWithSubAlbums(): Promise<GalleryAlbums> {
    return this.filterAlbums({ hasSubAlbums: true })
  }

  async getAlbumsWithDirectGalleries(): Promise<GalleryAlbums> {
    return this.filterAlbums({ hasSubAlbums: false })
  }

  async searchAlbumsByTitle(searchTerm: string): Promise<GalleryAlbums> {
    const data = await this.ensureData()
    const q = searchTerm.toLowerCase()
    return data.gallery.filter(a => a.title.toLowerCase().includes(q))
  }

  async getAlbumsCount(): Promise<number> {
    const data = await this.ensureData()
    return data.gallery.length
  }

  async getSubAlbumsCount(): Promise<number> {
    const data = await this.ensureData()
    return data.gallery.reduce((sum, a) => sum + (a.sub_albums?.length || 0), 0)
  }

  // If you need to invalidate the cache (e.g., after a CMS update)
  invalidateCache(): void {
    this.cache = null
  }
}
