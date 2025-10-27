'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { communitiesAPI, Community } from '@/features/communities/api'
import dynamic from 'next/dynamic'
const CommunityMap = dynamic(() => import('@/features/communities/components/CommunityMap'), {
  ssr: false,
})

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([])
  const [selectedCommunity, setSelectedCommunity] = useState<string>('all')
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [zillowUrl, setZillowUrl] = useState<string>('')
  const [coverImage, setCoverImage] = useState<string>('')

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
        console.error('Failed to load communities:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunities()
  }, [])

  useEffect(() => {
    let filtered = communities

    if (selectedCommunity !== 'all') {
      filtered = filtered.filter(community => community.title === selectedCommunity)
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(community => community.city === selectedCity)
    }

    setFilteredCommunities(filtered)
  }, [selectedCommunity, selectedCity, communities])

  // Get unique community names and cities
  const uniqueCommunities = Array.from(new Set(communities.map(c => c.title)))
  const uniqueCities = Array.from(new Set(communities.map(c => c.city)))

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="text-center">Loading communities...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Cover Image */}
      {coverImage && (
        <section className="relative mb-8 h-96">
          <div className="absolute inset-0">
            <Image src={coverImage} alt="Our Communities" fill className="object-cover" priority />
          </div>
          <div className="bg-opacity-40 absolute inset-0 bg-black"></div>
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center text-white">
              <h1 className="mb-4 text-5xl font-bold">Our Communities</h1>
              <p className="text-xl">Discover beautiful communities designed for modern living</p>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {!coverImage && (
          <div className="mb-8">
            <h1 className="mb-4 text-center text-4xl font-bold">Our Communities</h1>
            <p className="mb-8 text-center text-lg text-gray-600">
              Discover beautiful communities designed for modern living
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="grid grid-cols-1 gap-4 items-center md:grid-cols-2 ">
            {/* Community Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Filter by Community
              </label>
              <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Communities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Communities</SelectItem>
                  {uniqueCommunities.map(community => (
                    <SelectItem key={community} value={community}>
                      {community}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Filter */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Filter by City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {uniqueCities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content: Two Column Layout */}
        <div className="grid min-h-[600px] grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Communities Cards in Scrollable Area */}
          <div className="order-2 lg:order-1">
            <h2 className="mb-4 text-2xl font-semibold">Communities</h2>
            <div className="h-[600px] space-y-6 overflow-y-auto pr-4">
              {filteredCommunities.map(community => (
                <Link
                  key={community.id}
                  href={`/communities/${community.slug}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg">
                    {/* Community Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={community.card_image}
                        alt={community.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Community Info */}
                    <div className="p-4">
                      <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-blue-600">
                        {community.title}
                      </h3>
                      <p className="mb-2 text-2xl font-bold text-green-600">
                        ${community['starting-price']}
                      </p>
                      <p className="text-gray-600">{community.city}</p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* No Results */}
              {filteredCommunities.length === 0 &&
                (selectedCommunity !== 'all' || selectedCity !== 'all') && (
                  <div className="py-12 text-center">
                    <p className="text-lg text-gray-500">
                      No communities found with the selected filters
                    </p>
                    <p className="mt-2 text-gray-400">Try adjusting your filter selections</p>
                  </div>
                )}
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="order-1 lg:order-2 lg:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold">Map View</h2>
            <div className="h-[600px] overflow-hidden rounded-lg">
              <CommunityMap items={filteredCommunities} />
            </div>
          </div>
        </div>
      </div>

      {/* Visit us on Zillow Button - Bottom Center */}
      <div className="mt-12 pb-8 text-center">
        <a
          href={zillowUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
        >
          Visit us on Zillow
        </a>
      </div>
    </div>
  )
}
