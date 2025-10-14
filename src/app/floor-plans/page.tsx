// src/floor-plans/page.tsx

import * as Property from "@/features/property/api"
import PropertyCard from "@/features/property/components/PropertyCard"
import FilterBar from "@/features/property/components/FilterBar"
import { toNum } from "@/lib/url"

// export const dynamic = "force-static"

type SP = Record<string, string | string[] | undefined>

export default async function Page({ searchParams }: { searchParams: SP }) {
  const params = {
    community: typeof searchParams.community === "string" ? searchParams.community : undefined,
    price: toNum(searchParams.price),
    beds: toNum(searchParams.beds),
    baths: toNum(searchParams.baths),
    garages: toNum(searchParams.garages),
    min: toNum(searchParams.min),
    max: toNum(searchParams.max),
    page: toNum(searchParams.page) || 1,
    limit: 9,
    sortBy: "sqft" as const,
    sortOrder: "desc" as const
  }

  const [list, totalCount] = await Promise.all([
    Property.list(params),
    Property.getTotalFilteredCount(params)
  ])

  const totalPages = Math.ceil(totalCount / params.limit)
  const currentPage = params.page

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Floor Plans</h1>
      <p className="text-sm opacity-80 mb-4">Showing {list.length} of {totalCount} result{totalCount === 1 ? "" : "s"}</p>
      <FilterBar />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Previous Button */}
          {currentPage > 1 && (
            <a
              href={`/floor-plans?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries(searchParams).filter(([key]) => key !== 'page')
                ),
                page: (currentPage - 1).toString()
              }).toString()}`}
              className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
            >
              Previous
            </a>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
            <a
              key={pageNum}
              href={`/floor-plans?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries(searchParams).filter(([key]) => key !== 'page')
                ),
                page: pageNum.toString()
              }).toString()}`}
              className={`px-3 py-2 text-sm border rounded ${
                pageNum === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              {pageNum}
            </a>
          ))}

          {/* Next Button */}
          {currentPage < totalPages && (
            <a
              href={`/floor-plans?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries(searchParams).filter(([key]) => key !== 'page')
                ),
                page: (currentPage + 1).toString()
              }).toString()}`}
              className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
            >
              Next
            </a>
          )}
        </div>
      )}
    </main>
  )
}
