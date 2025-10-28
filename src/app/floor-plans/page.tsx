// src/floor-plans/page.tsx

import * as Property from '@/features/property/api'
import PropertyCard from '@/features/property/components/PropertyCard'
import FilterBar from '@/features/property/components/FilterBar'
import { toNum } from '@/lib/url'
import Image from 'next/image'

type SP = Record<string, string | string[] | undefined>

function buildQueryString(
  searchParams: SP,
  overrides: Record<string, string | number | undefined>
) {
  const base = Object.fromEntries(Object.entries(searchParams).filter(([key]) => key !== 'page'))
  const qs = new URLSearchParams({
    ...base,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, v]) => v !== undefined && v !== null)
    ),
  } as Record<string, string>)
  return qs.toString()
}

function getWindowedPages(current: number, total: number) {
  // Create a compact pagination like pnehomes.com: 1 ... 4 5 [6] 7 8 ... 20
  const delta = 2
  const pages: (number | '...')[] = []
  const range = new Set<number>()

  // Always include first and last
  range.add(1)
  range.add(total)

  // Include a sliding window around current
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.add(i)
  }

  // Build sorted array
  const sorted = Array.from(range).sort((a, b) => a - b)

  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i]
    pages.push(page)
    const next = sorted[i + 1]
    if (next && next - page > 1) pages.push('...')
  }

  return pages
}

export default async function Page({ searchParams }: { searchParams: SP }) {
  const params = {
    community: typeof searchParams.community === 'string' ? searchParams.community : undefined,
    price: toNum(searchParams.price),
    beds: toNum(searchParams.beds),
    baths: toNum(searchParams.baths),
    garages: toNum(searchParams.garages),
    min: toNum(searchParams.min),
    max: toNum(searchParams.max),
    page: toNum(searchParams.page) || 1,
    limit: 9,
    sortBy: 'sqft' as const,
    sortOrder: 'desc' as const,
  }

  const [list, totalCount, coverImage, pageTitle] = await Promise.all([
    Property.list(params),
    Property.getTotalFilteredCount(params),
    Property.getCoverImage(),
    Property.getPageTitle(),
  ])

  const totalPages = Math.max(1, Math.ceil(totalCount / params.limit))
  const currentPage = Math.min(Math.max(1, params.page), totalPages)
  const pages = getWindowedPages(currentPage, totalPages)

  return (
    <main className="relative">
      {/* Hero / Title (clean and bold like pnehomes.com) */}
      <section className="relative isolate">
        <div 
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
        </div>

        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {pageTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-y bg-white">
        <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
          <FilterBar />
        </div>
      </section>

      {/* Results summary */}
      <section className="container mx-auto px-6">
        <p className="mt-6 mb-4 text-sm text-gray-600">
          Showing <span className="font-medium">{list.length}</span> of{' '}
          <span className="font-medium">{totalCount}</span> result{totalCount === 1 ? '' : 's'}
        </p>

        {/* Cards grid (clean, airy, like pnehomes) */}
        <div className="my-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(p => (
            <div
              key={p.id}
              className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Let PropertyCard render its own internals; we wrap for consistent look */}
              <PropertyCard p={p} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="mx-auto mt-10 mb-16 flex items-center justify-center gap-2"
          > 
            {/* Prev */}
            {currentPage > 1 && (
              <a
                href={`/floor-plans?${buildQueryString(searchParams, {
                  page: currentPage - 1,
                })}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden="true">‹</span>
                <span className="hidden sm:inline">Previous</span>
              </a>
            )}

            {/* Numbered pages with ellipses */}
            <div className="flex items-center gap-2">
              {pages.map((pg, idx) =>
                pg === '...' ? (
                  <span key={`dots-${idx}`} className="px-3 py-2 text-sm text-gray-400 select-none">
                    …
                  </span>
                ) : (
                  <a
                    key={pg}
                    href={`/floor-plans?${buildQueryString(searchParams, {
                      page: pg,
                    })}`}
                    aria-current={pg === currentPage ? 'page' : undefined}
                    className={[
                      'inline-flex min-w-10 items-center justify-center rounded-full border px-3 py-2 text-sm font-medium',
                      pg === currentPage
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-50',
                    ].join(' ')}
                  >
                    {pg}
                  </a>
                )
              )}
            </div>

            {/* Next */}
            {currentPage < totalPages && (
              <a
                href={`/floor-plans?${buildQueryString(searchParams, {
                  page: currentPage + 1,
                })}`}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <span className="hidden sm:inline">Next</span>
                <span aria-hidden="true">›</span>
              </a>
            )}
          </nav>
        )}
      </section>
    </main>
  )
}
