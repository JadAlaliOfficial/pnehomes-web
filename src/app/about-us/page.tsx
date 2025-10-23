import { getAboutUsData } from '@/features/aboutUs/api'
import Link from 'next/link'
import Image from 'next/image'

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image Section */}
      {data.cover && (
        <div className="relative mb-12 h-64 w-full md:h-96">
          <Image src={data.cover} alt="About Us Cover" fill className="object-cover" priority />
          <div className="bg-opacity-40 absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-center text-white">
              <p className="mb-2 text-sm font-semibold tracking-wide uppercase">{data.slogan}</p>
              <h1 className="text-4xl font-bold md:text-5xl">{data.title}</h1>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Header Section - Only show if no cover */}
        {!data.cover && (
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
              <p className="text-lg leading-relaxed text-gray-700">{data.description}</p>
            </div>

            {/* Contact Section */}
            {data.contact && (
              <div className="mt-12 border-t border-gray-200 pt-8">
                <div className="text-center">
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">{data.contact.title}</h2>
                  <Link
                    href={`/contact?message=${encodeURIComponent(data.contact.message)}`}
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
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
  )
}
