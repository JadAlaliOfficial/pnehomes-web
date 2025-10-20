"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { communitiesAPI } from "../api"
import type { Community } from "../model/types"

interface FloorPlanFiltersProps {
  onFilterChange: (filters: { community?: string; city?: string }) => void
}

export default function FloorPlanFilters({ onFilterChange }: FloorPlanFiltersProps) {
  const [communities, setCommunities] = useState<Community[]>([])
  const [selectedCommunity, setSelectedCommunity] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCommunities() {
      try {
        const data = await communitiesAPI.getAllCommunities()
        setCommunities(data)
      } catch (error) {
        console.error("Failed to load communities:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunities()
  }, [])

  useEffect(() => {
    const filters: { community?: string; city?: string } = {}
    
    if (selectedCommunity && selectedCommunity !== "any") {
      filters.community = selectedCommunity
    }
    
    if (selectedCity && selectedCity !== "any") {
      filters.city = selectedCity
    }

    onFilterChange(filters)
  }, [selectedCommunity, selectedCity, onFilterChange])

  function resetFilters() {
    setSelectedCommunity("")
    setSelectedCity("")
  }

  // Get unique values for filter options
  const uniqueCommunities = [...new Set(communities.map(c => c.title))].sort()
  const uniqueCities = [...new Set(communities.map(c => c.city))].sort()

  if (loading) {
    return (
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">Loading filters...</div>
      </div>
    )
  }

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Filter by Location</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Community Filter */}
        <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All communities</SelectItem>
            {uniqueCommunities.map(community => (
              <SelectItem key={community} value={community}>
                {community}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* City Filter */}
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">All cities</SelectItem>
            {uniqueCities.map(city => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* Results Info */}
      <div className="mt-3 text-sm text-gray-600">
        {selectedCommunity || selectedCity ? (
          <>
            Filtering by{" "}
            {selectedCommunity && selectedCommunity !== "any" && (
              <span className="font-medium">{selectedCommunity}</span>
            )}
            {selectedCommunity && selectedCommunity !== "any" && selectedCity && selectedCity !== "any" && " in "}
            {selectedCity && selectedCity !== "any" && (
              <span className="font-medium">{selectedCity}</span>
            )}
          </>
        ) : (
          "Showing all communities"
        )}
      </div>
    </div>
  )
}