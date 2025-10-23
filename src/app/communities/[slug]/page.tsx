import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { communitiesAPI } from '@/features/communities/api'
import ImageGallery from '@/components/ImageGallery'
import RequestTourButton from '@/components/RequestTourButton'

interface CommunityPageProps {
  params: Promise<{ slug: string }>
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params
  const community = await communitiesAPI.getCommunityBySlug(slug)

  if (!community) {
    return notFound()
  }

  // Show only first 3 floor plans, safely handling possible null or undefined
  const floorPlans = community['floor-plans'] || []
  const displayedFloorPlans = floorPlans.slice(0, 3)
  const hasMoreFloorPlans = floorPlans.length > 3

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">{community.title}</h1>
        <p className="mb-4 text-lg text-gray-600">{community.address}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Gallery */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Gallery</h2>
            <ImageGallery images={community.gallery} title={community.title} maxVisibleImages={4} />
          </section>

          {/* Video Section */}
          {community.video && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold">Community Video</h2>
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
            </section>
          )}

          {/* Community Features */}
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Community Features</h2>
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-gray-700">{community['community-features']}</p>
            </div>
          </section>

          {/* Floor Plans Preview */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Floor Plans</h2>
              {hasMoreFloorPlans && (
                <Link href={`/floor-plans?community=${encodeURIComponent(community.title)}`}>
                  <Button variant="outline">Show All Floor Plans ({floorPlans.length})</Button>
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedFloorPlans.map(floorPlan => (
                <Card key={floorPlan.slug} className="overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={floorPlan.cover}
                      alt={floorPlan.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-2 font-semibold">{floorPlan.title}</h3>
                    <div className="mb-3 text-2xl font-bold text-green-600">
                      ${parseInt(floorPlan.price).toLocaleString()}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{floorPlan.beds} beds</span>
                      <span>{floorPlan.baths} baths</span>
                      <span>{parseInt(floorPlan.sqft).toLocaleString()} sqft</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show Floor Plans Button */}
            <div className="mt-6 text-center">
              <Link href={`/floor-plans?community=${encodeURIComponent(community.title)}`}>
                <Button size="lg" className="px-8">
                  Show Floor Plans
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Price Card */}
            <Card>
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

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Community Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{community.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor Plans:</span>
                    <span className="font-medium">{floorPlans.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price:</span>
                    <span className="font-medium">${community['starting-price']}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
