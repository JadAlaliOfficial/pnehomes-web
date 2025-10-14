// src/app/property/[slug]/page.tsx
import * as Property from "@/features/property/api"
import Image from "next/image"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const slugs = await Property.allSlugs()
  return slugs.map(slug => ({ slug }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const p = await Property.getBySlug(params.slug)
  if (!p) return notFound()

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-3">{p.title}</h1>
      <div className="opacity-80 mb-4">
        {p.beds} bd • {p.baths} ba • {p.sqft.toLocaleString()} sqft • {p.city}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {p.gallery.map((src, i) => (
          <div key={i} className="relative aspect-[4/3]">
            <Image src={src} alt={p.title} fill className="object-cover rounded-lg" />
          </div>
        ))}
      </div>

      {p.features.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 mb-2">Features</h2>
          <ul className="list-disc pl-6 space-y-1">
            {p.features.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </>
      )}
    </main>
  )
}
