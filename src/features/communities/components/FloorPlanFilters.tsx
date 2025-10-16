"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { FloorPlan } from "../model/types"

interface FloorPlanFiltersProps {
  floorPlans: FloorPlan[]
  onFilterChange: (filteredPlans: FloorPlan[]) => void
}

export default function FloorPlanFilters({ floorPlans, onFilterChange }: FloorPlanFiltersProps) {
  const [beds, setBeds] = useState<string>("")
  const [baths, setBaths] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  useEffect(() => {
    applyFilters()
  }, [beds, baths, status, minPrice, maxPrice, floorPlans])

  function applyFilters() {
    let filtered = [...floorPlans]

    // Filter by bedrooms
    if (beds && beds !== "any") {
      const minBeds = parseInt(beds)
      filtered = filtered.filter(plan => parseInt(plan.beds) >= minBeds)
    }

    // Filter by bathrooms
    if (baths && baths !== "any") {
      const minBaths = parseFloat(baths)
      filtered = filtered.filter(plan => parseFloat(plan.baths) >= minBaths)
    }

    // Filter by status
    if (status && status !== "any") {
      filtered = filtered.filter(plan => plan.status === status)
    }

    // Filter by price range
    if (minPrice) {
      const min = parseInt(minPrice)
      if (!isNaN(min)) {
        filtered = filtered.filter(plan => parseInt(plan.price) >= min)
      }
    }

    if (maxPrice) {
      const max = parseInt(maxPrice)
      if (!isNaN(max)) {
        filtered = filtered.filter(plan => parseInt(plan.price) <= max)
      }
    }

    onFilterChange(filtered)
  }

  function resetFilters() {
    setBeds("")
    setBaths("")
    setStatus("")
    setMinPrice("")
    setMaxPrice("")
  }

  // Get unique values for filter options
  const uniqueStatuses = [...new Set(floorPlans.map(plan => plan.status))]
  const uniqueBeds = [...new Set(floorPlans.map(plan => parseInt(plan.beds)))].sort((a, b) => a - b)
  const uniqueBaths = [...new Set(floorPlans.map(plan => parseFloat(plan.baths)))].sort((a, b) => a - b)

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Filter Floor Plans</h3>
      
      <div className="flex flex-wrap gap-3">
        {/* Bedrooms Filter */}
        <Select value={beds} onValueChange={setBeds}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Any beds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any beds</SelectItem>
            {uniqueBeds.map(bedCount => (
              <SelectItem key={bedCount} value={bedCount.toString()}>
                {bedCount}+ beds
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Bathrooms Filter */}
        <Select value={baths} onValueChange={setBaths}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Any baths" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any baths</SelectItem>
            {uniqueBaths.map(bathCount => (
              <SelectItem key={bathCount} value={bathCount.toString()}>
                {bathCount}+ baths
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any status</SelectItem>
            {uniqueStatuses.map(statusOption => (
              <SelectItem key={statusOption} value={statusOption}>
                {statusOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Min Price Filter */}
        <Input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-[140px]"
          min="0"
        />

        {/* Max Price Filter */}
        <Input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-[140px]"
          min="0"
        />

        {/* Reset Button */}
        <Button variant="outline" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>

      {/* Results Count */}
      <div className="mt-3 text-sm text-gray-600">
        Showing {floorPlans.length} floor plan{floorPlans.length !== 1 ? 's' : ''}
      </div>
    </div>
  )
}