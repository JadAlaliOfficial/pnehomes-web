"use client"
// src/features/property/components/FilterBar.tsx
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function FilterBar() {
  const router = useRouter()
  const sp = useSearchParams()

  const [beds, setBeds] = useState(sp.get("beds") ?? "")
  const [baths, setBaths] = useState(sp.get("baths") ?? "")
  const [sort, setSort] = useState(sp.get("sort") ?? "newest")

  useEffect(() => {
    setBeds(sp.get("beds") ?? "")
    setBaths(sp.get("baths") ?? "")
    setSort(sp.get("sort") ?? "newest")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()])

  function apply() {
    const params = new URLSearchParams(sp.toString())
    beds ? params.set("beds", beds) : params.delete("beds")
    baths ? params.set("baths", baths) : params.delete("baths")
    sort ? params.set("sort", sort) : params.delete("sort")
    router.push(`/floor-plans?${params.toString()}`)
  }

  function reset() {
    router.push(`/floor-plans`)
  }

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <select className="border rounded px-3 py-2" value={beds} onChange={e=>setBeds(e.target.value)}>
        <option value="">Any beds</option>
        <option value="2">2+ beds</option>
        <option value="3">3+ beds</option>
        <option value="4">4+ beds</option>
      </select>

      <select className="border rounded px-3 py-2" value={baths} onChange={e=>setBaths(e.target.value)}>
        <option value="">Any baths</option>
        <option value="2">2+ baths</option>
        <option value="3">3+ baths</option>
      </select>

      <select className="border rounded px-3 py-2" value={sort} onChange={e=>setSort(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="priceAsc">Price ↑</option>
        <option value="priceDesc">Price ↓</option>
        <option value="sqftDesc">Sqft ↓</option>
      </select>

      <button className="border rounded px-4 py-2" onClick={apply}>Apply</button>
      <button className="border rounded px-4 py-2" onClick={reset}>Reset</button>
    </div>
  )
}
