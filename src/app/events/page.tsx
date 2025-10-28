import { EventsAPI } from '@/features/events/api'
import type { Event } from '@/features/events/model/types'
import ImageGallery from '@/components/ImageGallery'
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

  const { title, slogan, events, contact, cover } = eventsResponse.data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      {cover && (
        <section className="relative isolate">
          <div 
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat md:bg-fixed"
            style={{ backgroundImage: `url(${cover})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
          </div>

          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-pne-brand mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
                {title}
              </h1>
            </div>
          </div>
        </section>
      )}

      {/* Slogan Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-800 text-xl font-medium md:text-2xl lg:text-3xl">
            {slogan}
          </p>
        </div>
      </section>

      {/* Events Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {events.map((event: Event, index: number) => {
            const isEven = index % 2 === 0
            
            return (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className={`grid gap-8 lg:grid-cols-2 ${isEven ? '' : 'lg:grid-cols-2'}`}>
                  {/* Content Section */}
                  <div className={`p-6 md:p-8 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">{event.title}</h2>
                    {event.description && (
                      <p className="leading-relaxed text-gray-700">{event.description}</p>
                    )}
                  </div>

                  {/* Images Section */}
                  {event.gallery && event.gallery.length > 0 && (
                    <div className={`p-6 md:p-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <ImageGallery 
                        images={event.gallery} 
                        title={event.title}
                        maxVisibleImages={4}
                      />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
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
