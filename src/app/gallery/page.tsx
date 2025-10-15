import { getAllGalleryAlbums } from "@/features/gallery/api"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default async function GalleryPage() {
  const albums = await getAllGalleryAlbums()

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
        <p className="text-muted-foreground mt-2">
          Explore our collection of virtual and real images
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <Link key={album.id} href={`/gallery/${album.slug}`}>
            <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 p-0">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={album.cover_img.virtual_img}
                    alt={album.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-white text-xl font-semibold">
                      {album.title}
                    </h2>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}