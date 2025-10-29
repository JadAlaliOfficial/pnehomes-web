import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { communitiesAPI } from '@/features/communities/api'
import ImageGallery from '@/components/ImageGallery'
import RequestTourButton from '@/components/RequestTourButton'
import { Bed, Bath, Car, Map } from 'lucide-react'

interface CommunityPageProps {
  params: Promise<{ slug: string }>
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params
  const [community, pageData] = await Promise.all([
    communitiesAPI.getCommunityBySlug(slug),
    communitiesAPI.getCommunitiesPageData(),
  ])

  if (!community) {
    return notFound()
  }

  // Show only first 3 floor plans, safely handling possible null or undefined
  const floorPlans = community['floor-plans'] || []
  const displayedFloorPlans = floorPlans.slice(0, 3)
  const hasMoreFloorPlans = floorPlans.length > 3

  return (
    <main className="relative">
      {/* Hero / Title (clean and bold like pnehomes.com) */}
      <section className="relative isolate">
        {/* Background image (fixed) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: `url(${pageData.cover})` }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />

        {/* Centered content */}
        <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 text-center">
          <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            {community.title}
          </h1>
        </div>
      </section>

      {/* Header Title block */}
      <header className="container mx-auto max-w-6xl px-4 pt-6 pb-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="text-left">
            <h1 className="mb-2 text-3xl leading-tight font-semibold sm:text-4xl">{community.title}</h1>
            <p className="text-muted-foreground/80 text-lg font-semibold tracking-wider uppercase">
              {community.address || 'Featured Community'}
            </p>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <section className="container mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Gallery */}
          <Card>
            <CardContent className="p-2">
              <ImageGallery images={community.gallery} title={community.title} maxVisibleImages={5} />
            </CardContent>
          </Card>
        </div>

        {/* Video Section */}
        {community.video && (
          <section className="mt-12">
            <Card>
              <CardContent className="p-2">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <video
                    controls
                    className="h-full w-full object-cover"
                    poster={community.gallery[0]}
                  >
                    <source src={community.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Community Features */}
        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Community Features</h2>
            <div className="bg-primary/60 mt-2 h-px w-16" />
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="prose prose-lg max-w-none">
                <p className="leading-relaxed text-gray-700">{community['community-features']}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Floor Plans Preview */}
        <section className="mt-12">
          <div className="mb-5">
            <h2 className="text-xl font-semibold">Floor Plans</h2>
            <div className="bg-primary/60 mt-2 h-px w-16" />
          </div>
          {hasMoreFloorPlans && (
            <div className="mb-6 flex justify-end">
              <Link href={`/floor-plans?community=${encodeURIComponent(community.title)}`}>
                <Button variant="outline">Show All Floor Plans ({floorPlans.length})</Button>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayedFloorPlans.map(floorPlan => (
              <div
                key={floorPlan.slug}
                className="overflow-hidden rounded-xl border bg-white shadow-sm"
              >
                <Card className="overflow-hidden p-0">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={floorPlan.cover}
                      alt={floorPlan.title}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-2">
                    <div className="text-2xl font-bold">{floorPlan.title}</div>
                    <div className="mt-1 text-lg capitalize opacity-60">{community.title}</div>
                    <div className="mt-2 text-base font-medium">
                      ${parseInt(floorPlan.price).toLocaleString()}
                    </div>
                    <div className="mt-1 flex items-center justify-around text-sm opacity-80">
                      <div className="flex-col items-center justify-between">
                        <div className="text-lg">
                          <Bed className="mr-1 inline-block h-5 w-5" />
                          {floorPlan.beds}
                        </div>
                        <div className="text-xs">Bedrooms</div>
                      </div>
                      <div className="h-10 border-r border-gray-500"></div>
                      <div className="flex-col items-center justify-center">
                        <div className="text-lg">
                          <Bath className="mr-1 inline-block h-5 w-5" />
                          {floorPlan.baths}
                        </div>
                        <div className="text-xs">Bathrooms</div>
                      </div>
                      <div className="h-10 border-r border-gray-500"></div>
                      <div className="flex-col items-center justify-center">
                        <div className="text-lg">
                          <Car className="mr-1 inline-block h-5 w-5" />
                          {floorPlan.garages}
                        </div>
                        <div className="text-xs">Garages</div>
                      </div>
                      <div className="h-10 border-r border-gray-500"></div>
                      <div className="flex-col items-center justify-center">
                        <div className="text-lg">
                          <Map className="mr-1 inline-block h-5 w-5" />
                          {parseInt(floorPlan.sqft).toLocaleString()}
                        </div>
                        <div className="text-xs">SQFT</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Show Floor Plans Button */}
          <div className="mt-6 text-center">
            <Link href={`/floor-plans?community=${encodeURIComponent(community.title)}`}>
              <Button size="lg" className="px-8">
                Show more Floor Plans
              </Button>
            </Link>
          </div>
        </section>

        {/* Price Card */}
              <Card className='mt-12'>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="mb-2 text-3xl font-bold text-green-600">
                      ${community['starting-price']}
                    </div>
                    <p className="mb-4 text-gray-600">Starting Price</p>
                    <div className="mb-6 text-sm text-gray-500">{community.city}</div>

                    {/* Request Tour Button */}
                    <RequestTourButton communityName={community.title} className="mb-3 w-full" />

                    <p className="text-xs text-gray-500">
                      Schedule a personalized tour of this community
                    </p>
                  </div>
                </CardContent>
              </Card>
      </section>
    </main>
  )
}
