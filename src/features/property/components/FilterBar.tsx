"use client"
// src/features/property/components/FilterBar.tsx
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getCommunities } from "@/features/property/api"

export default function FilterBar() {
  const router = useRouter()
  const sp = useSearchParams()

  const [community, setCommunity] = useState(sp.get("community") ?? "")
  const [price, setPrice] = useState(sp.get("price") ?? "")
  const [beds, setBeds] = useState(sp.get("beds") ?? "")
  const [baths, setBaths] = useState(sp.get("baths") ?? "")
  const [garages, setGarages] = useState(sp.get("garages") ?? "")
  const [communities, setCommunities] = useState<string[]>([])

  useEffect(() => {
    setCommunity(sp.get("community") ?? "")
    setPrice(sp.get("price") ?? "")
    setBeds(sp.get("beds") ?? "")
    setBaths(sp.get("baths") ?? "")
    setGarages(sp.get("garages") ?? "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()])

  useEffect(() => {
    // Load communities for dropdown
    getCommunities().then(setCommunities)
  }, [])

  function apply() {
    const params = new URLSearchParams(sp.toString())
    
    // Community filter - trim whitespace and handle case-insensitive comparison
    const trimmedCommunity = community.trim()
    trimmedCommunity ? params.set("community", trimmedCommunity) : params.delete("community")
    
    // Price filter - ensure it's a valid number
    const numericPrice = price.trim()
    if (numericPrice && !isNaN(Number(numericPrice)) && Number(numericPrice) > 0) {
      params.set("price", numericPrice)
    } else {
      params.delete("price")
    }
    
    beds ? params.set("beds", beds) : params.delete("beds")
    baths ? params.set("baths", baths) : params.delete("baths")
    garages ? params.set("garages", garages) : params.delete("garages")
    router.push(`/floor-plans?${params.toString()}`)
  }

  function reset() {
    router.push(`/floor-plans`)
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Select value={community} onValueChange={setCommunity}>
        <SelectTrigger className="w-[160px]">
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

      <Input
        type="number"
        placeholder="Max price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-[140px]"
        min="0"
      />

      <Select value={beds} onValueChange={setBeds}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Any beds" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any beds</SelectItem>
          <SelectItem value="2">2+ beds</SelectItem>
          <SelectItem value="3">3+ beds</SelectItem>
          <SelectItem value="4">4+ beds</SelectItem>
        </SelectContent>
      </Select>

      <Select value={baths} onValueChange={setBaths}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Any baths" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any baths</SelectItem>
          <SelectItem value="2">2+ baths</SelectItem>
          <SelectItem value="3">3+ baths</SelectItem>
        </SelectContent>
      </Select>

      <Select value={garages} onValueChange={setGarages}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Any garages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any garages</SelectItem>
          <SelectItem value="1">1+ garages</SelectItem>
          <SelectItem value="2">2+ garages</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={apply}>Apply</Button>
      <Button variant="outline" onClick={reset}>Reset</Button>
    </div>
  )
}
