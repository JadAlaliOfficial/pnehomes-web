import { PrivacyPolicyAPI } from '@/features/privacyPolicy/api';
import Image from 'next/image';

export default async function PrivacyPolicyPage() {
  // Fetch privacy policy data
  const privacyPolicyResponse = await PrivacyPolicyAPI.getPrivacyPolicy();
  
  if (!privacyPolicyResponse.success) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h1 className="text-2xl font-bold text-red-800 mb-2">Error Loading Privacy Policy</h1>
            <p className="text-red-600">{privacyPolicyResponse.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = privacyPolicyResponse;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Image Section */}
        {data.cover && (
          <div className="mb-12">
            <Image 
              src={data.cover} 
              alt="Privacy Policy Cover" 
              width={800}
              height={256}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{data.slogan}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{data.title}</h2>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-justify">
              {data.description}
            </p>
          </div>
        </div>

        {/* Contact Section - Only show if contact exists */}
        {data.contact && (
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">{data.contact.title}</h3>
            <a 
              href={`/contact?message=${encodeURIComponent(data.contact.message)}`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        )}
      </div>
    </div>
  );
}