import { getAboutUsData } from '@/features/aboutUs/api';
import Link from 'next/link';

export default async function AboutUsPage() {
  const response = await getAboutUsData();

  if (!response.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{response.message}</p>
        </div>
      </div>
    );
  }

  const { data } = response;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            {data.slogan}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            {data.title}
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {data.description}
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {data.contact.title}
                </h2>
                <Link
                  href={`/${data.contact.slug}`}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}