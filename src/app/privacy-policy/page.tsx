import { PrivacyPolicyAPI } from '@/features/privacyPolicy/api'
import Image from 'next/image'

export default async function PrivacyPolicyPage() {
  // Fetch privacy policy data
  const privacyPolicyResponse = await PrivacyPolicyAPI.getPrivacyPolicy()

  if (!privacyPolicyResponse.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h1 className="mb-2 text-2xl font-bold text-red-800">Error Loading Privacy Policy</h1>
            <p className="text-red-600">{privacyPolicyResponse.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const { data } = privacyPolicyResponse

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Cover Image Section */}
        {data.cover && (
          <div className="mb-12">
            <Image
              src={data.cover}
              alt="Privacy Policy Cover"
              width={800}
              height={256}
              className="h-64 w-full rounded-lg object-cover shadow-lg"
            />
          </div>
        )}

        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">{data.slogan}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{data.title}</h2>
        </div>

        {/* Main Content */}
        <div className="mb-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="prose prose-lg max-w-none">
            <p className="text-justify leading-relaxed text-gray-700">{data.description}</p>
          </div>
        </div>

        {/* Contact Section - Only show if contact exists */}
        {data.contact && (
          <div className="rounded-lg bg-blue-50 p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-blue-900">{data.contact.title}</h3>
            <a
              href={`/contact?message=${encodeURIComponent(data.contact.message)}`}
              className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
