// src/app/page.tsx

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { homeContentApi } from "@/features/home/api/home_content.api"

export default function Home() {
  const homeContent = homeContentApi.getContent();
  const hero = homeContentApi.getHero();
  const services = homeContentApi.getServices();
  const links = homeContentApi.getLinks();
  const testimonials = homeContentApi.getTestimonials();
  const contact = homeContentApi.getContact();
  
  return (
    <div className="min-h-screen">
      {/* First Section - Video Background with Logo, Title, Subtitle, and Book Button */}
      <section className="relative h-screen flex items-center justify-center">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={homeContent.video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        <div className="relative z-20 text-center text-white px-4">
          <div className="mb-8">
            <Image 
              src={homeContent.logo} 
              alt="PNE Homes Logo" 
              width={200} 
              height={100}
              className="mx-auto mb-6"
            />
          </div>
          <h1 className="text-6xl font-bold mb-4">{homeContent.title}</h1>
          <p className="text-2xl mb-8">{homeContent.subtitle}</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
            <Link href={`/${homeContent["book-button"].slug}`}>
              {homeContent["book-button"].title}
            </Link>
          </Button>
        </div>
      </section>

      {/* Second Section - Hero */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">{hero.title}</h2>
          <p className="text-xl mb-16 text-gray-600">{hero.subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {hero.sections.map((section, index) => (
              <div key={index} className="text-center">
                <div className="mb-6">
                  {/* Icon placeholder - you can replace with actual icons */}
                  <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
                    {section.icon === 'date' ? '📅' : section.icon === 'pen' ? '✏️' : '🏠'}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{section.title}</h3>
                <p className="text-gray-600">{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Third Section - Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">{services.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{services.description}</p>
            </div>
            <div className="space-y-4">
              {services.links.map((link, index) => (
                <Button 
                  key={index} 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full justify-start text-left h-auto py-4"
                >
                  <Link href={`/services/${link.slug}`}>
                    <span className="text-lg">{link.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section - Links Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* First Card - First Link */}
            <Link href={`/${links.links[0].slug}`} className="group">
              <div 
                className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center cursor-pointer transform transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${links.links[0].cover})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{links.links[0].title}</h3>
                </div>
              </div>
            </Link>
            
            {/* Second Card - Video */}
            <div className="relative h-64 rounded-lg overflow-hidden">
              <video 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover"
              >
                <source src={links.video} type="video/mp4" />
              </video>
            </div>
            
            {/* Third Card - Second Link */}
            <Link href={`/${links.links[1].slug}`} className="group">
              <div 
                className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center cursor-pointer transform transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${links.links[1].cover})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{links.links[1].title}</h3>
                </div>
              </div>
            </Link>
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* First Card - Third Link */}
            <Link href={`/${links.links[2].slug}`} className="group">
              <div 
                className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center cursor-pointer transform transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${links.links[2].cover})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{links.links[2].title}</h3>
                </div>
              </div>
            </Link>
            
            {/* Second Card - Logo */}
            <div className="h-64 rounded-lg bg-gray-100 flex items-center justify-center">
              <Image 
                src={homeContent.logo} 
                alt="PNE Homes Logo" 
                width={150} 
                height={75}
              />
            </div>
            
            {/* Third Card - Fourth Link */}
            <Link href={`/${links.links[3].slug}`} className="group">
              <div 
                className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center cursor-pointer transform transition-transform group-hover:scale-105"
                style={{ backgroundImage: `url(${links.links[3].cover})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{links.links[3].title}</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Fifth Section - Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-6 italic">"{testimonial.description}"</p>
                <p className="font-bold text-gray-900">- {testimonial.by}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Button */}
      <section className="py-20 px-4 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">{contact.title}</h2>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg">
            <Link href={`/${contact.slug}`}>
              Get In Touch
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
