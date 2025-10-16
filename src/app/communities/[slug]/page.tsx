import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { communitiesAPI, Community } from "@/features/communities/api"
import ImageGallery from "@/components/ImageGallery"
import RequestTourButton from "@/components/RequestTourButton"

interface CommunityPageProps {
  params: Promise<{ slug: string }>
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  const { slug } = await params
  const community = await communitiesAPI.getCommunityBySlug(slug)

  if (!community) {
    return notFound()
  }

  // Show only first 3 floor plans
  const displayedFloorPlans = community["floor-plans"].slice(0, 3)
  const hasMoreFloorPlans = community["floor-plans"].length > 3

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{community.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{community.address}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <ImageGallery 
              images={community.gallery} 
              title={community.title}
              maxVisibleImages={4}
            />
          </section>

          {/* Video Section */}
          {community.video && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Community Video</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <video 
                  controls 
                  className="w-full h-full object-cover"
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
            <h2 className="text-2xl font-semibold mb-4">Community Features</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {community["community-features"]}
              </p>
            </div>
          </section>

          {/* Floor Plans Preview */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Floor Plans</h2>
              {hasMoreFloorPlans && (
                <Link href={`/communities/${community.slug}/floor-plans`}>
                  <Button variant="outline">
                    Show All Floor Plans ({community["floor-plans"].length})
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFloorPlans.map((floorPlan) => (
                <Link 
                  key={floorPlan.slug} 
                  href={`/property/${floorPlan.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={floorPlan.cover}
                        alt={floorPlan.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                        {floorPlan.title}
                      </h3>
                      <div className="text-2xl font-bold text-green-600 mb-3">
                        ${parseInt(floorPlan.price).toLocaleString()}
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{floorPlan.beds} beds</span>
                        <span>{floorPlan.baths} baths</span>
                        <span>{parseInt(floorPlan.sqft).toLocaleString()} sqft</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Show Floor Plans Button */}
            <div className="mt-6 text-center">
              <Link href={`/communities/${community.slug}/floor-plans`}>
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
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ${community["starting-price"]}
                  </div>
                  <p className="text-gray-600 mb-4">Starting Price</p>
                  <div className="text-sm text-gray-500 mb-6">
                    {community.city}
                  </div>
                  
                  {/* Request Tour Button */}
                  <RequestTourButton 
                    communityName={community.title}
                    className="w-full mb-3"
                  />
                  
                  <p className="text-xs text-gray-500">
                    Schedule a personalized tour of this community
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Community Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{community.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor Plans:</span>
                    <span className="font-medium">{community["floor-plans"].length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Starting Price:</span>
                    <span className="font-medium">${community["starting-price"]}</span>
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