import { EventsAPI } from '@/features/events/api'
import type { Event } from '@/features/events/model/types'
import Image from 'next/image'

export default async function EventsPage() {
  // Fetch events data
  const eventsResponse = await EventsAPI.getEventsData()

  if (!eventsResponse.success || !eventsResponse.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error Loading Events</h1>
          <p className="text-gray-600">{eventsResponse.error || 'Failed to load events data'}</p>
        </div>
      </div>
    )
  }

  const { slogan, events, contact, cover } = eventsResponse.data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div
        className="relative bg-white bg-cover bg-center bg-no-repeat shadow-sm"
        style={{ backgroundImage: `url(${cover})` }}
      >
        {/* Overlay for better text readability */}
        <div className="bg-opacity-50 absolute inset-0 bg-black"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">{slogan}</h1>
            <p className="text-lg text-gray-200">Discover our community events and initiatives</p>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:gap-12">
          {events.map((event: Event, index: number) => (
            <div key={index} className="overflow-hidden rounded-lg bg-white shadow-lg">
              {/* Event Header */}
              <div className="p-6 md:p-8">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{event.title}</h2>
                {event.description && (
                  <p className="mb-6 leading-relaxed text-gray-700">{event.description}</p>
                )}
              </div>

              {/* Event Gallery */}
              {event.gallery && event.gallery.length > 0 && (
                <div className="px-6 pb-6 md:px-8 md:pb-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">Gallery</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {event.gallery.map((imagePath: string, imgIndex: number) => (
                      <div
                        key={imgIndex}
                        className="relative aspect-video overflow-hidden rounded-lg bg-gray-200"
                      >
                        <Image
                          src={imagePath}
                          alt={`${event.title} - Image ${imgIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
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
          <div className="mt-16 rounded-lg bg-blue-600 shadow-lg">
            <div className="px-6 py-12 text-center md:px-8 md:py-16">
              <h2 className="mb-4 text-3xl font-bold text-white">{contact.title}</h2>
              <p className="mb-8 text-blue-100">{contact.message}</p>
              <a
                href={`/contact?message=${encodeURIComponent(contact.message)}`}
                className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 transition-colors duration-200 hover:bg-gray-50"
              >
                Get In Touch
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
