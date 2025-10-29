import { getGallerySubAlbum, getGalleryContactInfo , getGalleryCover } from '@/features/gallery/api'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GalleryContent from '@/features/gallery/components/GalleryContent'

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
  const cover = await getGalleryCover()
  console.log('Cover image URL:', cover)
  const contactMessage = contactInfo.message.replace('{title}', subAlbum.title)
  const contactUrl = `/contact?message=${encodeURIComponent(contactMessage)}`

  return (
    <main className="relative">
      {/* Hero / Title (clean and bold like pnehomes.com) */}
      <section className="relative isolate">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: `url(${cover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
        </div>

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {subAlbum.title}
            </h1>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href={`/gallery/${slug}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-pne-accent text-white border-pne-accent hover:bg-pne-brand hover:border-pne-brand hover:text-white transition-colors"
            >
              ← Go back to {album?.title}
            </Button>
          </Link>
        </div>

        <GalleryContent images={subAlbum.gallery} albumTitle={subAlbum.title} />
        
        {/* Contact button at bottom center */}
        <div className="flex justify-center mt-12">
          <Link href={contactUrl}>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-pne-accent text-white border-pne-accent hover:bg-pne-brand hover:border-pne-brand hover:text-white transition-colors px-8 py-3 text-lg"
            >
              {contactInfo.title}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
