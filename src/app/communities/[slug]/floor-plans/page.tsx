"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { communitiesAPI, Community, FloorPlan } from "@/features/communities/api"
import FloorPlanFilters from "@/features/communities/components/FloorPlanFilters"

interface CommunityFloorPlansPageProps {
  params: Promise<{ slug: string }>
}

export default function CommunityFloorPlansPage({ params }: CommunityFloorPlansPageProps) {
  const [community, setCommunity] = useState<Community | null>(null)
  const [filteredFloorPlans, setFilteredFloorPlans] = useState<FloorPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCommunity() {
      const { slug } = await params
      const communityData = await communitiesAPI.getCommunityBySlug(slug)
      
      if (!communityData) {
        notFound()
      }
      
      setCommunity(communityData)
      setFilteredFloorPlans(communityData["floor-plans"])
      setLoading(false)
    }
    
    loadCommunity()
  }, [params])

  const handleFilterChange = (filtered: FloorPlan[]) => {
    setFilteredFloorPlans(filtered)
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!community) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/communities" className="hover:text-blue-600">
          Communities
        </Link>
        <span>→</span>
        <Link href={`/communities/${community.slug}`} className="hover:text-blue-600">
          {community.title}
        </Link>
        <span>→</span>
        <span className="text-gray-900">Floor Plans</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {community.title} Floor Plans
        </h1>
        <p className="text-lg text-gray-600">
          Explore all available floor plans in {community.title}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
          <span>{filteredFloorPlans.length} of {community["floor-plans"].length} floor plans shown</span>
          <span>•</span>
          <span>Starting from ${community["starting-price"]}</span>
        </div>
      </div>

      {/* Filters */}
      <FloorPlanFilters 
        floorPlans={community["floor-plans"]} 
        onFilterChange={handleFilterChange}
      />

      {/* Floor Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFloorPlans.map((floorPlan) => (
          <Link 
            key={floorPlan.slug} 
            href={`/property/${floorPlan.slug}`}
            className="group block"
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              {/* Floor Plan Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={floorPlan.cover}
                  alt={floorPlan.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant={floorPlan.status === "Now selling" ? "default" : "secondary"}
                    className={
                      floorPlan.status === "Now selling" 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "bg-gray-600 hover:bg-gray-700"
                    }
                  >
                    {floorPlan.status}
                  </Badge>
                </div>
              </div>
              
              {/* Floor Plan Info */}
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                  {floorPlan.title}
                </h3>
                
                {/* Price */}
                <div className="text-3xl font-bold text-green-600 mb-4">
                  ${parseInt(floorPlan.price).toLocaleString()}
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {floorPlan.beds}
                    </div>
                    <div className="text-sm text-gray-600">
                      Bed{parseInt(floorPlan.beds) !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {floorPlan.baths}
                    </div>
                    <div className="text-sm text-gray-600">
                      Bath{parseFloat(floorPlan.baths) !== 1 ? 's' : ''}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {parseInt(floorPlan.sqft).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sq Ft
                    </div>
                  </div>
                </div>

                {/* Garage Info */}
                {floorPlan.garages && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      {floorPlan.garages} Car Garage{parseInt(floorPlan.garages) !== 1 ? 's' : ''}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Back to Community Button */}
      <div className="mt-12 text-center">
        <Link href={`/communities/${community.slug}`}>
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            ← Back to {community.title}
          </button>
        </Link>
      </div>

      {/* Empty State */}
      {filteredFloorPlans.length === 0 && community["floor-plans"].length > 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Floor Plans Match Your Filters
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filter criteria to see more results.
          </p>
        </div>
      )}

      {/* Original Empty State */}
      {community["floor-plans"].length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏠</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Floor Plans Available
          </h3>
          <p className="text-gray-600 mb-6">
            Floor plans for this community are coming soon.
          </p>
          <Link href={`/communities/${community.slug}`}>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Back to Community
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}