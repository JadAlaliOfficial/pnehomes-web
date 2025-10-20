"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { communitiesAPI, Community } from "@/features/communities/api"

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([])
  const [selectedCommunity, setSelectedCommunity] = useState<string>("all")
  const [selectedCity, setSelectedCity] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [zillowUrl, setZillowUrl] = useState<string>("")
  const [coverImage, setCoverImage] = useState<string>("")

  useEffect(() => {
    async function loadCommunities() {
      try {
        const data = await communitiesAPI.getAllCommunities()
        setCommunities(data)
        setFilteredCommunities(data)
        
        // Load Zillow URL
        const zillow = await communitiesAPI.getZillowUrl()
        setZillowUrl(zillow)
        
        // Load cover image
        const cover = await communitiesAPI.getCoverImage()
        setCoverImage(cover)
      } catch (error) {
        console.error("Failed to load communities:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunities()
  }, [])

  useEffect(() => {
    let filtered = communities

    if (selectedCommunity !== "all") {
      filtered = filtered.filter(community => community.title === selectedCommunity)
    }

    if (selectedCity !== "all") {
      filtered = filtered.filter(community => community.city === selectedCity)
    }

    setFilteredCommunities(filtered)
  }, [selectedCommunity, selectedCity, communities])

  // Get unique community names and cities
  const uniqueCommunities = Array.from(new Set(communities.map(c => c.title)))
  const uniqueCities = Array.from(new Set(communities.map(c => c.city)))

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading communities...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cover Image */}
      {coverImage && (
        <section className="relative h-96 mb-8">
          <div className="absolute inset-0">
            <Image
              src={coverImage}
              alt="Our Communities"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">Our Communities</h1>
              <p className="text-xl">
                Discover beautiful communities designed for modern living
              </p>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        {!coverImage && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center mb-4">Our Communities</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
              Discover beautiful communities designed for modern living
            </p>
          </div>
        )}
        
        {/* Filters */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Community Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Community
              </label>
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Communities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Communities</SelectItem>
                  {uniqueCommunities.map((community) => (
                    <SelectItem key={community} value={community}>
                      {community}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by City
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {uniqueCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Visit us on Zillow Button */}
        <div className="text-center mt-6">
          <a
            href={zillowUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Visit us on Zillow
          </a>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommunities.map((community) => (
          <Link 
            key={community.id} 
            href={`/communities/${community.slug}`}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Community Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={community.card_image}
                  alt={community.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Community Info */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {community.title}
                </h3>
                <p className="text-2xl font-bold text-green-600 mb-2">
                  ${community["starting-price"]}
                </p>
                <p className="text-gray-600">
                  {community.city}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {filteredCommunities.length === 0 && (selectedCommunity !== "all" || selectedCity !== "all") && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No communities found with the selected filters
          </p>
          <p className="text-gray-400 mt-2">
            Try adjusting your filter selections
          </p>
        </div>
      )}
    </div>
  )
}