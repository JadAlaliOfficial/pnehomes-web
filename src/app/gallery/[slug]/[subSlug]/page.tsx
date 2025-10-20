import { getGallerySubAlbum, getGalleryContactInfo } from "@/features/gallery/api"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import GalleryContent from "@/features/gallery/components/GalleryContent"

interface SubAlbumPageProps {
  params: Promise<{ slug: string; subSlug: string }>
}

export default async function SubAlbumPage({ params }: SubAlbumPageProps) {
  const { slug, subSlug } = await params
  const result = await getGallerySubAlbum(slug, subSlug)
  const contactInfo = await getGalleryContactInfo()

  if (!result.found || !result.subAlbum) {
    return notFound()
  }

  const { album, subAlbum } = result
  const contactMessage = contactInfo.message.replace('{title}', subAlbum.title)
  const contactUrl = `/contact?message=${encodeURIComponent(contactMessage)}`

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{subAlbum.title}</h1>
          <Link href={contactUrl}>
            <Button variant="outline" size="sm">
              {contactInfo.title}
            </Button>
          </Link>
        </div>
      </div>

      <GalleryContent images={subAlbum.gallery} albumTitle={subAlbum.title} />
    </main>
  )
}