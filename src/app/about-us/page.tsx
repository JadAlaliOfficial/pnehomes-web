import { getAboutUsData, getCover } from '@/features/aboutUs/api'
import Link from 'next/link'

export default async function AboutUsPage() {
  const response = await getAboutUsData()

  if (!response.success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    )
  }

  const { data } = response

  // Get cover image
  const coverImage = await getCover()

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with fixed background */}
      {/* Hero Section with fixed background */}
      {coverImage && (
        <section className="relative isolate">
          {/* Background image (fixed) */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />

          {/* Centered content */}
          <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-6 text-center">
            <h1 className="text-pne-brand text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {data.title}
            </h1>
          </div>
        </section>
      )}

      {/* Slogan Section - Right under cover */}
      {coverImage && (
        <div className="bg-white py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-pne-brand text-lg font-semibold tracking-wide uppercase">
              {data.slogan}
            </p>
          </div>
        </div>
      )}

      <div className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          {/* Header Section - Only show if no cover */}
          {!coverImage && (
            <div className="mb-12 text-center">
              <p className="mb-2 text-sm font-semibold tracking-wide text-blue-600 uppercase">
                {data.slogan}
              </p>
              <h1 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">{data.title}</h1>
            </div>
          )}

          {/* Main Content */}
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg bg-white p-8 shadow-lg md:p-12">
              <div className="prose prose-lg max-w-none">
                <div
                  className="text-lg leading-relaxed text-gray-700"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              {/* Contact Section */}
              {data.contact && (
                <div className="mt-12 border-t border-gray-200 pt-8">
                  <div className="text-center">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">{data.contact.title}</h2>
                    <Link
                      href={`/contact?message=${encodeURIComponent(data.contact.message)}`}
                      className="bg-pne-accent hover:bg-pne-brand focus:ring-pne-accent inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                    >
                      Get In Touch
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
