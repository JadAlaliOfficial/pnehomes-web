import { getGalleryAlbumBySlug, getGalleryContactInfo } from '@/features/gallery/api'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GalleryContent from '@/features/gallery/components/GalleryContent'

interface AlbumPageProps {
  params: Promise<{ slug: string }>
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { slug } = await params
  const album = await getGalleryAlbumBySlug(slug)
  const contactInfo = await getGalleryContactInfo()

  if (!album) {
    return notFound()
  }

  const contactMessage = contactInfo.message.replace('{title}', album.title)
  const contactUrl = `/contact?message=${encodeURIComponent(contactMessage)}`

  return (
    <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/gallery"
          className="text-muted-foreground hover:text-foreground mb-2 inline-block text-sm"
        >
          ← Back to Gallery
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{album.title}</h1>
          <Link href={contactUrl}>
            <Button variant="outline" size="sm">
              {contactInfo.title}
            </Button>
          </Link>
        </div>
      </div>

      {/* Case A: Album has sub-albums */}
      {album.sub_albums && album.sub_albums.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {album.sub_albums.map(subAlbum => (
            <Link key={subAlbum.slug} href={`/gallery/${album.slug}/${subAlbum.slug}`}>
              <Card className="group cursor-pointer overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={subAlbum.cover_img.virtual_img}
                      alt={subAlbum.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute right-0 bottom-0 left-0 p-6">
                      <h2 className="text-xl font-semibold text-white">{subAlbum.title}</h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        /* Case B: Album has direct gallery images */
        album.gallery && <GalleryContent images={album.gallery} albumTitle={album.title} />
      )}
    </main>
  )
}
