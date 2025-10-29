import { getGalleryData, getGalleryTitle , getGalleryCover } from '@/features/gallery/api'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

// app/gallery/page.tsx
export const dynamic = 'force-static'
export const fetchCache = 'force-cache' // optional, but makes the intent clear
// DO NOT export revalidate here if you use `next export`


export default async function GalleryPage() {
  const [galleryData, galleryCover, galleryTitle] = await Promise.all([
    getGalleryData(),
    getGalleryCover(),
    getGalleryTitle(),
  ])
  const { gallery: albums } = galleryData


  return (
    <main className="relative w-full">
      {/* Hero / Title (clean and bold like pnehomes.com) */}
      <section className="relative isolate">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: `url(${galleryCover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
        </div>

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {galleryTitle}
            </h1>
          </div>
        </div>
      </section>


      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Small screens (sm) - 2 columns regular grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:hidden">
          {albums.map(album => (
            <Link key={album.id} href={`/gallery/${album.slug}`}>
              <Card className="group cursor-pointer overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={album.cover_img}
                      alt={album.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <h2 className="text-2xl font-semibold text-white transition-transform duration-300 group-hover:-translate-y-2">{album.title}</h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Medium screens (md) - Custom masonry grid with 2 columns */}
        <div className="hidden md:block lg:hidden">
          <div className="grid grid-cols-2 gap-6" style={{ gridTemplateRows: `repeat(${Math.ceil(albums.length * 10)}, minmax(0, 1fr))` }}>
            {albums.map((album, index) => {
              // Calculate grid positioning for 2 columns
              const pairIndex = Math.floor(index / 2)
              const isFirstInPair = index % 2 === 0
              
              // First card in pair: column 1, rows (pairIndex * 19 + 1) to (pairIndex * 19 + 19)
              // Second card in pair: column 2, rows (pairIndex * 19 + 2) to (pairIndex * 19 + 20)
              const gridColumn = isFirstInPair ? 1 : 2
              const gridRowStart = isFirstInPair ? (pairIndex * 19 + 1) : (pairIndex * 19 + 2)
              const gridRowEnd = isFirstInPair ? (pairIndex * 19 + 20) : (pairIndex * 19 + 21)
              
              return (
                <Link 
                  key={album.id} 
                  href={`/gallery/${album.slug}`}
                  style={{
                    gridColumn: gridColumn,
                    gridRowStart: gridRowStart,
                    gridRowEnd: gridRowEnd
                  }}
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg h-full">
                    <CardContent className="p-0 h-full">
                      <div className="relative h-full overflow-hidden">
                        <Image
                          src={album.cover_img}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-black/40" />
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <h2 className="text-2xl font-semibold text-white transition-transform duration-300 group-hover:-translate-y-2">{album.title}</h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Large screens (lg) and above - Custom masonry grid with 4 columns */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6" style={{ gridTemplateRows: `repeat(${Math.ceil(albums.length * 5)}, minmax(0, 1fr))` }}>
            {albums.map((album, index) => {
              // Calculate grid positioning for 4 columns
              const groupIndex = Math.floor(index / 4)
              const positionInGroup = index % 4
              
              // Pattern: Col1 starts row 1, Col2 starts row 2, Col3 starts row 1, Col4 starts row 2
              // Column 1: rows (groupIndex * 19 + 1) to (groupIndex * 19 + 19)
              // Column 2: rows (groupIndex * 19 + 2) to (groupIndex * 19 + 20)
              // Column 3: rows (groupIndex * 19 + 1) to (groupIndex * 19 + 19)
              // Column 4: rows (groupIndex * 19 + 2) to (groupIndex * 19 + 20)
              const gridColumn = positionInGroup + 1
              const startOffset = (positionInGroup === 0 || positionInGroup === 2) ? 0 : 1
              const gridRowStart = groupIndex * 19 + startOffset + 1
              const gridRowEnd = groupIndex * 19 + startOffset + 20
              
              return (
                <Link 
                  key={album.id} 
                  href={`/gallery/${album.slug}`}
                  style={{
                    gridColumn: gridColumn,
                    gridRowStart: gridRowStart,
                    gridRowEnd: gridRowEnd
                  }}
                >
                  <Card className="group cursor-pointer overflow-hidden border-0 p-0 shadow-md transition-all duration-300 hover:shadow-lg h-full">
                    <CardContent className="p-0 h-full">
                      <div className="relative h-full overflow-hidden">
                        <Image
                          src={album.cover_img}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-300 group-hover:backdrop-blur-sm group-hover:bg-black/40" />
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <h2 className="text-4xl font-semibold text-white transition-transform duration-300 group-hover:-translate-y-2">{album.title}</h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
