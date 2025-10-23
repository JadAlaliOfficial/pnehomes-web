// src/app/services/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getServiceBySlug, getCover } from '@/features/services/api'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const response = await getServiceBySlug(params.slug)

  if (!response.success || !response.data) {
    notFound()
  }

  const service = response.data

  // Get cover image
  const coverResponse = await getCover()
  const coverImage = coverResponse.success ? coverResponse.data : null

  return (
    <div className="bg-background min-h-screen">
      {/* Cover Image Section */}
      {coverImage && (
        <div className="relative mb-12 h-64 w-full md:h-96">
          <Image src={coverImage} alt="Services Cover" fill className="object-cover" priority />
          <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center text-white">
              <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Service Title - Only show if no cover */}
          {!coverImage && (
            <div className="mb-8 text-center">
              <h1 className="text-foreground text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
            </div>
          )}

          {/* Service Sub-title (if exists) */}
          {service.sub_title && (
            <div className="mb-8 text-center">
              <h2 className="text-muted-foreground text-xl font-medium md:text-2xl lg:text-3xl">
                {service.sub_title}
              </h2>
            </div>
          )}

          {/* Service Description (if exists) */}
          {service.description && (
            <div className="mx-auto mb-16 max-w-4xl text-center">
              <p className="text-muted-foreground text-lg leading-relaxed md:text-xl">
                {service.description}
              </p>
            </div>
          )}

          {/* Service Content with Alternating Layout */}
          <div className="space-y-16">
            {service.content.map((item, index) => {
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                    isEven ? '' : 'lg:grid-flow-col-dense'
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative h-64 w-full overflow-hidden rounded-xl md:h-80 lg:h-96 ${
                      isEven ? '' : 'lg:col-start-2'
                    }`}
                  >
                    <Image
                      src={item.img}
                      alt={item.sub_title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>

                  {/* Text Content */}
                  <div className={`space-y-4 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <h3 className="text-foreground text-2xl font-bold md:text-3xl">
                      {item.sub_title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Us Button */}
          <div className="mt-16 text-center">
            <Button asChild size="lg" className="px-8 py-3">
              <Link
                href={`/contact?message=${encodeURIComponent(service.contact.message.replace('{title}', service.title))}`}
              >
                {service.contact.title}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all services (optional, for better performance)
export async function generateStaticParams() {
  try {
    const { getAllServices } = await import('@/features/services/api')
    const response = await getAllServices()

    if (response.success) {
      return response.data.map(service => ({
        slug: service.slug,
      }))
    }
  } catch (error) {
    console.error('Failed to generate static params for services:', error)
  }

  return []
}
