import { EventsAPI } from '@/features/events/api';
import type { Event, Contact } from '@/features/events/model/types';
import Image from 'next/image';

export default async function EventsPage() {
  // Fetch events data
  const eventsResponse = await EventsAPI.getEventsData();
  
  if (!eventsResponse.success || !eventsResponse.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Events</h1>
          <p className="text-gray-600">{eventsResponse.error || 'Failed to load events data'}</p>
        </div>
      </div>
    );
  }

  const { slogan, events, contact } = eventsResponse.data;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{slogan}</h1>
            <p className="text-lg text-gray-600">Discover our community events and initiatives</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:gap-12">
          {events.map((event: Event, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Event Header */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h2>
                {event.description && (
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                )}
              </div>

              {/* Event Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.gallery.map((imagePath: string, imgIndex: number) => (
                      <div key={imgIndex} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={imagePath}
                          alt={`${event.title} - Image ${imgIndex + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        {contact && (
          <div className="mt-16 bg-blue-600 rounded-lg shadow-lg">
            <div className="px-6 py-12 md:px-8 md:py-16 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">{contact.title}</h2>
              <p className="text-blue-100 mb-8">
                Ready to learn more about our events or get involved? We'd love to hear from you!
              </p>
              <a
                href={`/${contact.slug}`}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}