import { PrivacyPolicyAPI } from '@/features/privacyPolicy/api'
import Link from 'next/link'

export default async function PrivacyPolicyPage() {
  // Fetch privacy policy data
  const privacyPolicyResponse = await PrivacyPolicyAPI.getPrivacyPolicy()

  if (!privacyPolicyResponse.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h1 className="mb-2 text-2xl font-bold text-red-800">Error Loading Privacy Policy</h1>
            <p className="text-red-600">{privacyPolicyResponse.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const { data } = privacyPolicyResponse

  // Get cover image
  const coverImage = await PrivacyPolicyAPI.getCover()

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section with Cover Image */}
      {coverImage && (
        <section 
          className="relative isolate flex min-h-[60vh] items-center justify-center bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ backgroundImage: `url(${coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />

          <div className="container mx-auto px-6 pt-20 pb-10 text-center relative z-10">
            <h1 className="text-pne-brand mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {data.title}
            </h1>
          </div>
        </section>
      )}

      {/* Slogan Section - Right under cover */}
      {coverImage && (
        <section className="bg-background py-8">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-pne-brand text-xl font-medium md:text-2xl lg:text-3xl">
              {data.slogan}
            </h2>
          </div>
        </section>
      )}

      <div className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Header Section - Only show if no cover */}
          {!coverImage && (
            <div className="mb-12 text-center">
              <h1 className="text-foreground text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                {data.title}
              </h1>
              <h2 className="text-muted-foreground text-xl font-medium md:text-2xl lg:text-3xl">
                {data.slogan}
              </h2>
            </div>
          )}

          {/* Main Content */}
          <div className="mx-auto mb-16 max-w-7xl">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-muted-foreground text-lg leading-relaxed text-justify md:text-xl"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>
            </div>
          </div>

          {/* Contact Section - Only show if contact exists */}
          {data.contact && (
            <div className="mt-12 border-t border-gray-200 pt-8">
              <div className="text-center">
                <Link
                  href={`/contact?message=${encodeURIComponent(data.contact.message)}`}
                  className="inline-flex items-center rounded-md border border-transparent bg-pne-accent px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-pne-brand focus:ring-2 focus:ring-pne-accent focus:ring-offset-2 focus:outline-none"
                >
                  {data.contact.title}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
