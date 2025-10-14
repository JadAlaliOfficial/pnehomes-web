// src/floor-plans/page.tsx

import * as Property from "@/features/property/api"
import PropertyCard from "@/features/property/components/PropertyCard"
import FilterBar from "@/features/property/components/FilterBar"
import { toNum } from "@/lib/url"

export const dynamic = "force-static"

type SP = Record<string, string | string[] | undefined>

export default async function Page({ searchParams }: { searchParams: SP }) {
  const params = {
    beds: toNum(searchParams.beds),
    baths: toNum(searchParams.baths),
    min: toNum(searchParams.min),
    max: toNum(searchParams.max),
    sort: (searchParams.sort as "newest" | "priceAsc" | "priceDesc" | "sqftDesc") ?? "newest"
  }

  const list = await Property.list(params)

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Floor Plans</h1>
      <p className="text-sm opacity-80 mb-4">Showing {list.length} result{list.length === 1 ? "" : "s"}</p>
      <FilterBar />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </main>
  )
}
