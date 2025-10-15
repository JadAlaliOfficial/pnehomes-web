// src/app/services/[slug]/page.tsx

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServiceBySlug } from "@/features/services/api"

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

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Service Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {service.title}
          </h1>
        </div>

        {/* Service Sub-title (if exists) */}
        {service.sub_title && (
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
              {service.sub_title}
            </h2>
          </div>
        )}

        {/* Service Description (if exists) */}
        {service.description && (
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
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
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-col-dense"
                }`}
              >
                {/* Image */}
                <div className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl ${
                  isEven ? "" : "lg:col-start-2"
                }`}>
                  <Image
                    src={item.img}
                    alt={item.sub_title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                {/* Text Content */}
                <div className={`space-y-4 ${
                  isEven ? "" : "lg:col-start-1 lg:row-start-1"
                }`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    {item.sub_title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contact Us Button */}
        <div className="text-center mt-16">
          <Button asChild size="lg" className="px-8 py-3">
            <Link href="/contact">
              Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all services (optional, for better performance)
export async function generateStaticParams() {
  try {
    const { getAllServices } = await import("@/features/services/api")
    const response = await getAllServices()
    
    if (response.success) {
      return response.data.map((service) => ({
        slug: service.slug,
      }))
    }
  } catch (error) {
    console.error("Failed to generate static params for services:", error)
  }
  
  return []
}