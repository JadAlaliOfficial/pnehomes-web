// src/app/property/[slug]/page.tsx
import * as Property from '@/features/property/api'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SharePrintButtons from '@/features/property/components/SharePrintButtons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import ImageGallery from '@/components/ImageGallery'

export async function generateStaticParams() {
  const slugs = await Property.allSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { slug } = await params
  const sp = await searchParams
  const p = await Property.getBySlug(slug)
  if (!p) return notFound()

  // Get filter parameters from search params to maintain context
  const filterParams = {
    community: typeof sp.community === 'string' ? sp.community : undefined,
    price: sp.price ? Number(sp.price) : undefined,
    beds: sp.beds ? Number(sp.beds) : undefined,
    baths: sp.baths ? Number(sp.baths) : undefined,
    garages: sp.garages ? Number(sp.garages) : undefined,
    min: sp.min ? Number(sp.min) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
    sortBy: 'sqft' as const,
    sortOrder: 'desc' as const,
  }

  // Get filtered properties to calculate navigation and cover image
  const [filteredProperties, coverImage] = await Promise.all([
    Property.list({ ...filterParams, limit: 1000 }),
    Property.getCoverImage(),
  ])
  const currentIndex = filteredProperties.findIndex(prop => prop.slug === slug)

  const prevProperty = currentIndex > 0 ? filteredProperties[currentIndex - 1] : null
  const nextProperty =
    currentIndex < filteredProperties.length - 1 ? filteredProperties[currentIndex + 1] : null

  // Build query string for navigation links
  const buildNavUrl = (targetSlug: string) => {
    const queryParams = new URLSearchParams()
    Object.entries(sp).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        queryParams.set(key, value)
      }
    })
    return `/property/${targetSlug}?${queryParams.toString()}`
  }

  // helpers
  const num = (v?: string) => {
    if (!v && v !== '0') return undefined
    const n = Number(v)
    return Number.isNaN(n) ? undefined : n
  }
  const money = (v?: string) => {
    const n = num(v)
    return typeof n === 'number' ? `$${Math.round(n).toLocaleString()}` : 'Contact for price'
  }
  const sqft = (v?: string) => {
    const n = num(v)
    return typeof n === 'number' ? `${n.toLocaleString()} sqft` : ''
  }

  const beds = p.beds ? `${p.beds} bd` : ''
  const baths = p.baths ? `${p.baths} ba` : ''
  const garages = p.garages ? `${p.garages} garage${parseInt(p.garages) === 1 ? '' : 's'}` : ''
  const metaBits = [beds, baths, sqft(p.sqft), garages].filter(Boolean)

  const gallery =
    Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : ['/img/placeholder.jpg']

  const shareText =
    p?.Whats_special?.description?.slice(0, 140)?.trim() ||
    '' ||
    [beds, baths, sqft(p.sqft)].filter(Boolean).join(' • ')

  // Build "Back to results" URL preserving filters
  const backToResultsHref = (() => {
    const queryParams = new URLSearchParams()
    Object.entries(sp).forEach(([key, value]) => {
      if (value && typeof value === 'string') queryParams.set(key, value)
    })
    const qs = queryParams.toString()
    return qs ? `/search?${qs}` : '/search'
  })()

  return (
    <main className="relative">
      {/* Hero / Title (clean and bold like pnehomes.com) */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Image src={coverImage} alt="Property Cover" fill priority className="object-cover" />
          <div className="0 absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
        </div>

        <div className="container mx-auto px-6 pt-20 pb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
            {p.title}
          </h1>
        </div>
      </section>

      {/* Header Title block */}
      <header className="container mx-auto max-w-6xl px-4 pt-6 pb-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className='text-left'>
            <h1 className="mb-2 text-3xl leading-tight font-semibold sm:text-4xl">{p.title}</h1>
            <p className="text-muted-foreground/80 text-lg font-semibold tracking-wider uppercase">
              {p.community || 'Featured Property'}
            </p>
          </div>
          <div className="text-right">
            <div className="mt-4">
              <SharePrintButtons title={p.title || 'Property'} text={shareText} />
            </div>
            {/* <div className="text-2xl font-semibold sm:text-3xl">{money(p.price)}</div> */}
          </div>
        </div>
      </header>

      {/* Main content area */}
      <section className="container mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Gallery */}
          <div className="bg-card rounded-xl border shadow-sm">
            <ImageGallery images={gallery} title={p.title} maxVisibleImages={5} />
          </div>

          {/* Sticky facts / price card (right rail) */}
          <aside className="lg:pl-2">
            <div className="bg-card sticky top-24 rounded-xl border shadow-sm">
              <div className="border-b p-6">
                <div className="text-3xl font-semibold">{money(p.price)}</div>
                <div className="text-muted-foreground mt-1 text-sm opacity-80">
                  {beds} {beds && baths ? '•' : ''} {baths}
                  {(beds || baths) && sqft(p.sqft) ? ' • ' : ''}
                  {sqft(p.sqft)}
                </div>
              </div>

              <div className="p-6">
                {/* Quick Specs grid like PNE */}
                <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                  Quick Facts
                </h3>
                <ul className="grid grid-cols-2 gap-y-2 text-sm">
                  <li className="opacity-70">Community</li>
                  <li className="text-right font-medium capitalize">{p.community || '-'}</li>
                  <li className="opacity-70">Bedrooms</li>
                  <li className="text-right font-medium">{p.beds || '-'}</li>
                  <li className="opacity-70">Bathrooms</li>
                  <li className="text-right font-medium">{p.baths || '-'}</li>
                  <li className="opacity-70">Garages</li>
                  <li className="text-right font-medium">{p.garages || '-'}</li>
                  <li className="opacity-70">Square Feet</li>
                  <li className="text-right font-medium">{num(p.sqft)?.toLocaleString() ?? '-'}</li>
                </ul>

                {/* CTA row */}
                <div className="mt-6 flex flex-col gap-2 print:hidden">
                  {p.zillow_link && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                    >
                      <a href={p.zillow_link} target="_blank" rel="noopener noreferrer">
                        View on Zillow
                      </a>
                    </Button>
                  )}

                  <Button asChild size="lg" className="w-full">
                    <Link
                      href={`/contact?message=I'm interested in ${encodeURIComponent(p.title)}`}
                    >
                      Contact Us About This Property
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* What's Special / Highlights */}
        {p.Whats_special && (
          <section className="bg-card mt-12 rounded-xl border p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">What&apos;s Special</h2>
            </div>

            {Array.isArray(p.Whats_special.badges) && p.Whats_special.badges.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {p.Whats_special.badges.map((badge, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="border-blue-100 bg-blue-50 text-blue-700"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {p.Whats_special.description && (
              <p className="text-muted-foreground leading-relaxed">{p.Whats_special.description}</p>
            )}
          </section>
        )}

        {/* Facts & Features */}
        {Array.isArray(p.Facts_features) && p.Facts_features.length > 0 && (
          <section className="mt-12">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">Facts &amp; Features</h2>
              <div className="bg-primary/60 mt-2 h-px w-16" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {p.Facts_features.map((section, i) => (
                <div key={i} className="bg-card rounded-xl border p-5 shadow-sm">
                  <h3 className="mb-2 font-medium">{section.title}</h3>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    {section.list.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Floor Plans */}
        {Array.isArray(p.floor_plans) && p.floor_plans.length > 0 && (
          <section className="mt-12">
            <div className="mb-5">
              <h2 className="text-xl font-semibold">Floor Plans</h2>
              <div className="bg-primary/60 mt-2 h-px w-16" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {p.floor_plans.map((plan, i) => (
                <div key={i} className="bg-card overflow-hidden rounded-xl border shadow-sm">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={plan.img}
                      alt={plan.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{plan.title}</h3>
                    {plan.Description && (
                      <p className="text-muted-foreground mt-1 text-sm">{plan.Description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Prev / Next property navigation */}
        {(prevProperty || nextProperty) && (
          <nav className="mt-12 flex items-center justify-between gap-3">
            <div className="min-w-0">
              {prevProperty && (
                <Button asChild variant="outline" className="justify-start gap-2">
                  <Link href={buildNavUrl(prevProperty.slug)}>
                    <span aria-hidden>←</span>
                    <span className="truncate">Previous: {prevProperty.title}</span>
                  </Link>
                </Button>
              )}
            </div>
            <div className="text-muted-foreground hidden text-sm opacity-70 sm:block">
              {p.title}
            </div>
            <div className="min-w-0 text-right">
              {nextProperty && (
                <Button asChild variant="outline" className="justify-end gap-2">
                  <Link href={buildNavUrl(nextProperty.slug)}>
                    <span className="truncate">Next: {nextProperty.title}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        )}
      </section>

      {/* Print-only footer */}
      <div className="text-muted-foreground hidden px-8 pt-4 pb-12 text-sm print:block">
        <hr className="border-muted mb-3" />
        <p>
          {p.title} — {p.community || ''} {beds && `• ${beds}`} {baths && `• ${baths}`}{' '}
          {sqft(p.sqft) && `• ${sqft(p.sqft)}`}
        </p>
        <p>Price: {money(p.price)}</p>
      </div>
    </main>
  )
}
