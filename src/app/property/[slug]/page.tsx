// src/app/property/[slug]/page.tsx
import * as Property from "@/features/property/api"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import SharePrintButtons from "@/features/property/components/SharePrintButtons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import ImageGallery from "@/components/ImageGallery"

export async function generateStaticParams() {
  const slugs = await Property.allSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Page({ 
  params, 
  searchParams 
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
    community: typeof sp.community === "string" ? sp.community : undefined,
    price: sp.price ? Number(sp.price) : undefined,
    beds: sp.beds ? Number(sp.beds) : undefined,
    baths: sp.baths ? Number(sp.baths) : undefined,
    garages: sp.garages ? Number(sp.garages) : undefined,
    min: sp.min ? Number(sp.min) : undefined,
    max: sp.max ? Number(sp.max) : undefined,
    sortBy: "sqft" as const,
    sortOrder: "desc" as const
  }

  // Get filtered properties to calculate navigation
  const filteredProperties = await Property.list({ ...filterParams, limit: 1000 })
  const currentIndex = filteredProperties.findIndex(prop => prop.slug === slug)
  
  const prevProperty = currentIndex > 0 ? filteredProperties[currentIndex - 1] : null
  const nextProperty = currentIndex < filteredProperties.length - 1 ? filteredProperties[currentIndex + 1] : null

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
    if (!v && v !== "0") return undefined
    const n = Number(v)
    return Number.isNaN(n) ? undefined : n
  }
  const money = (v?: string) => {
    const n = num(v)
    return typeof n === "number" ? `$${Math.round(n).toLocaleString()}` : "Contact for price"
  }
  const sqft = (v?: string) => {
    const n = num(v)
    return typeof n === "number" ? `${n.toLocaleString()} sqft` : ""
  }

  const beds = p.beds ? `${p.beds} bd` : ""
  const baths = p.baths ? `${p.baths} ba` : ""
  const garages = p.garages ? `${p.garages} garage${parseInt(p.garages) === 1 ? "" : "s"}` : ""
  const metaBits = [beds, baths, sqft(p.sqft), garages].filter(Boolean)

  const gallery = Array.isArray(p.gallery) && p.gallery.length > 0 ? p.gallery : ["/img/placeholder.jpg"]

  const shareText =
    (p?.Whats_special?.description?.slice(0, 140)?.trim() || "") ||
    [beds, baths, sqft(p.sqft)].filter(Boolean).join(" • ")

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{p.title}</h1>
          <div className="mt-1 text-sm text-muted-foreground opacity-60 capitalize">
            {p.community}
          </div>
        {metaBits.length > 0 && (
          <div className="mt-2 text-sm text-muted-foreground opacity-80">
            {metaBits.join(" • ")}
          </div>
        )}
        </div>
      </div>

      {/* Hero area: gallery + sticky info card */}
      <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
        {/* Gallery */}
        <div>
          <ImageGallery 
            images={gallery} 
            title={p.title} 
            maxVisibleImages={3}
          />
        </div>

        {/* Sticky facts / price card */}
        <aside className="lg:pl-2">
          <div className="sticky top-6 rounded-xl border bg-card shadow-sm">
            <div className="p-5 border-b">
              <div className="text-2xl font-semibold">{money(p.price)}</div>
              <div className="mt-1 text-sm text-muted-foreground opacity-80">
                {beds} {beds && baths ? "•" : ""} {baths}
                {(beds || baths) && sqft(p.sqft) ? " • " : ""}{sqft(p.sqft)}
              </div>
            </div>

            <div className="p-5 space-y-3">
              {/* quick facts list like PNE page */}
              <ul className="grid grid-cols-2 gap-y-2 text-sm">
                <li className="opacity-80">Community</li><li className="font-medium capitalize">{p.community || "-"}</li>
                <li className="opacity-80">Bedrooms</li><li className="font-medium">{p.beds || "-"}</li>
                <li className="opacity-80">Bathrooms</li><li className="font-medium">{p.baths || "-"}</li>
                <li className="opacity-80">Garages</li><li className="font-medium">{p.garages || "-"}</li>
                <li className="opacity-80">Square Feet</li><li className="font-medium">{num(p.sqft)?.toLocaleString() ?? "-"}</li>
              </ul>

              {/* CTA row */}
              <div className="pt-2 flex flex-col gap-2 print:hidden">
                {p.zillow_link && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"
                  >
                    <a
                      href={p.zillow_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Zillow
                    </a>
                  </Button>
                )}

                {/* Share & Print buttons (client) */}
                <SharePrintButtons
                  title={p.title || "Property"}
                  text={shareText}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* What's Special */}
      {p.Whats_special && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-3">What&apos;s Special</h2>
          {Array.isArray(p.Whats_special.badges) && p.Whats_special.badges.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {p.Whats_special.badges.map((badge, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-blue-50 text-blue-700 border-blue-100"
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

      {/* Facts & Features (carded sections) */}
      {Array.isArray(p.Facts_features) && p.Facts_features.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Facts &amp; Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {p.Facts_features.map((section, i) => (
              <div key={i} className="rounded-lg border p-4 bg-card">
                <h3 className="font-medium mb-2">{section.title}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
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
        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Floor Plans</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {p.floor_plans.map((plan, i) => (
              <div key={i} className="rounded-lg border overflow-hidden bg-card">
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
                    <p className="text-sm text-muted-foreground mt-1">{plan.Description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Button */}
      <section className="mt-10 text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href={`/contact?message=I'm interested in ${encodeURIComponent(p.title)}`}>
            Contact Us About This Property
          </Link>
        </Button>
      </section>

      {/* Prev / Next property navigation */}
      {(prevProperty || nextProperty) && (
        <nav className="mt-10 flex items-center justify-between gap-3">
          <div>
            {prevProperty && (
              <Button asChild variant="outline">
                <Link href={buildNavUrl(prevProperty.slug)}>
                  <span aria-hidden>←</span>
                  Previous Property
                </Link>
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground opacity-70">{p.title}</div>
          <div>
            {nextProperty && (
              <Button asChild variant="outline">
                <Link href={buildNavUrl(nextProperty.slug)}>
                  Next Property
                  <span aria-hidden>→</span>
                </Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </main>
  )
}
