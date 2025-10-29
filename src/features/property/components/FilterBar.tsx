'use client'
// src/features/property/components/FilterBar.tsx

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getCommunities } from '@/features/property/api'

export default function FilterBar() {
  const router = useRouter()
  const sp = useSearchParams()

  // NOTE: use "all"/"any" for UI, but convert to/from empty strings for URL params
  const [community, setCommunity] = useState(sp.get('community') || 'all')
  const [price, setPrice] = useState(sp.get('price') ?? '')
  const [beds, setBeds] = useState(sp.get('beds') || 'any')
  const [baths, setBaths] = useState(sp.get('baths') || 'any')
  const [garages, setGarages] = useState(sp.get('garages') || 'any')
  const [communities, setCommunities] = useState<string[]>([])

  // Keep inputs in sync with URL changes
  useEffect(() => {
    setCommunity(sp.get('community') || 'all')
    setPrice(sp.get('price') ?? '')
    setBeds(sp.get('beds') || 'any')
    setBaths(sp.get('baths') || 'any')
    setGarages(sp.get('garages') || 'any')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()])

  // Load communities from the API-backed repository
  useEffect(() => {
    getCommunities().then(setCommunities).catch(() => setCommunities([]))
  }, [])

  const searchParamsString = useMemo(() => sp.toString(), [sp])

  function apply() {
    const params = new URLSearchParams(searchParamsString)

    // COMMUNITY
    const trimmedCommunity = community.trim()
    if (trimmedCommunity && trimmedCommunity !== 'all') {
      params.set('community', trimmedCommunity)
    } else {
      params.delete('community')
    }

    // PRICE (API expects ?price= as "max price")
    const numericPrice = price.trim()
    if (numericPrice && !isNaN(Number(numericPrice)) && Number(numericPrice) > 0) {
      params.set('price', numericPrice)
    } else {
      params.delete('price')
    }

    // BEDS
    if (beds && beds !== 'any' && !isNaN(Number(beds))) {
      params.set('beds', beds)
    } else {
      params.delete('beds')
    }

    // BATHS (can be fractional like 2.5)
    if (baths && baths !== 'any' && !isNaN(Number(baths))) {
      params.set('baths', baths)
    } else {
      params.delete('baths')
    }

    // GARAGES
    if (garages && garages !== 'any' && !isNaN(Number(garages))) {
      params.set('garages', garages)
    } else {
      params.delete('garages')
    }

    // When applying new filters, reset to page 1
    params.set('page', '1')

    router.push(`/floor-plans?${params.toString()}`)
  }

  function reset() {
    router.push(`/floor-plans`)
  }

  // Submit on Enter in the price field
  function onPriceKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') apply()
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Filter controls */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {/* Community */}
        <Select value={community} onValueChange={setCommunity}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Community name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All communities</SelectItem>
            {communities.map((communityName) => (
              <SelectItem key={communityName} value={communityName}>
                {communityName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Max price */}
        <Input
          type="number"
          placeholder="Max price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={onPriceKeyDown}
          className="w-full"
          min="0"
          inputMode="numeric"
        />

        {/* Beds */}
        <Select value={beds} onValueChange={setBeds}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any beds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any beds</SelectItem>
            <SelectItem value="2">2+ beds</SelectItem>
            <SelectItem value="3">3+ beds</SelectItem>
            <SelectItem value="4">4+ beds</SelectItem>
          </SelectContent>
        </Select>

        {/* Baths */}
        <Select value={baths} onValueChange={setBaths}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any baths" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any baths</SelectItem>
            <SelectItem value="2">2+ baths</SelectItem>
            <SelectItem value="2.5">2.5+ baths</SelectItem>
            <SelectItem value="3">3+ baths</SelectItem>
          </SelectContent>
        </Select>

        {/* Garages */}
        <Select value={garages} onValueChange={setGarages}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Any garages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any garages</SelectItem>
            <SelectItem value="1">1+ garages</SelectItem>
            <SelectItem value="2">2+ garages</SelectItem>
            <SelectItem value="3">3+ garages</SelectItem>
          </SelectContent>
        </Select>

        {/* Actions */}
        <div className="col-span-1 flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:gap-3 lg:col-span-3 xl:col-span-1">
          <Button onClick={apply} className="flex-1 sm:min-w-[80px] sm:flex-none">
            Apply
          </Button>
          <Button
            variant="outline"
            onClick={reset}
            className="flex-1 sm:min-w-[80px] sm:flex-none"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
