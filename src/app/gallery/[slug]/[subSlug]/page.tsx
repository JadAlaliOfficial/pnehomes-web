import { getGallerySubAlbum } from "@/features/gallery/api"
import Link from "next/link"
import { notFound } from "next/navigation"
import GalleryContent from "@/features/gallery/components/GalleryContent"

interface SubAlbumPageProps {
  params: Promise<{ slug: string; subSlug: string }>
}

export default async function SubAlbumPage({ params }: SubAlbumPageProps) {
  const { slug, subSlug } = await params
  const result = await getGallerySubAlbum(slug, subSlug)

  if (!result.found || !result.subAlbum) {
    return notFound()
  }

  const { album, subAlbum } = result

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/gallery" className="hover:text-foreground">
            Gallery
          </Link>
          <span>→</span>
          <Link href={`/gallery/${slug}`} className="hover:text-foreground">
            {album?.title}
          </Link>
          <span>→</span>
          <span className="text-foreground">{subAlbum.title}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{subAlbum.title}</h1>
      </div>

      <GalleryContent images={subAlbum.gallery} />
    </main>
  )
}