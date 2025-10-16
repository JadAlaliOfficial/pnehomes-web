"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { communitiesAPI, Community } from "@/features/communities/api"

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCommunities() {
      try {
        const data = await communitiesAPI.getAllCommunities()
        setCommunities(data)
        setFilteredCommunities(data)
      } catch (error) {
        console.error("Failed to load communities:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunities()
  }, [])

  useEffect(() => {
    const trimmedSearch = searchTerm.trim().toLowerCase()
    
    if (!trimmedSearch) {
      setFilteredCommunities(communities)
    } else {
      const filtered = communities.filter(community => 
        community.title.toLowerCase().includes(trimmedSearch) ||
        community.city.toLowerCase().includes(trimmedSearch)
      )
      setFilteredCommunities(filtered)
    }
  }, [searchTerm, communities])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading communities...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our Communities</h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Discover beautiful communities designed for modern living
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search by community name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
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
      {filteredCommunities.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No communities found matching "{searchTerm}"
          </p>
          <p className="text-gray-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      )}
    </div>
  )
}