'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { Calendar, Pencil, Home as HomeIcon } from 'lucide-react'
import { ResponsiveMedia } from '@/features/home/components/ResponsiveMedia'
import { HomeContent } from '@/features/home/model/home_content.types'

// --- Testimonials Carousel (unchanged) ---
function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const stopAutoPlay = React.useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const startAutoPlay = React.useCallback(() => {
    if (!api) return
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
    autoPlayRef.current = setInterval(() => {
      api.scrollNext()
    }, 4000)
  }, [api])

  useEffect(() => {
    if (!api) return
    const update = () => {
      setCurrent(api.selectedScrollSnap())
      setCount(api.scrollSnapList().length)
    }
    update()
    api.on('reInit', update)
    api.on('select', update)

    startAutoPlay()

    const handleVisibility = () => {
      if (document.hidden) stopAutoPlay()
      else startAutoPlay()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      api.off('reInit', update)
      api.off('select', update)
      document.removeEventListener('visibilitychange', handleVisibility)
      stopAutoPlay()
    }
  }, [api, startAutoPlay, stopAutoPlay])

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="mx-auto w-full max-w-3xl"
        opts={{ align: 'start', loop: true }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial: any, index: number) => (
            <CarouselItem key={index} className="basis-full pl-2 md:pl-4">
              <div className="h-full rounded-xl bg-white p-8 shadow-sm">
                <p className="mb-6 text-lg text-gray-700 italic">
                  &ldquo;{testimonial.description}&rdquo;
                </p>
                <p className="font-semibold text-gray-900">- {testimonial.by}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={[
              'h-2.5 w-2.5 rounded-full transition',
              i === current ? 'bg-[color:var(--pne-accent)]' : 'bg-gray-300 hover:bg-gray-400',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomePageClient({ content }: { content: HomeContent }) {
  const firstSection = content['first-section']
  const hero = content.hero
  const services = content.services
  const gridSection = content['grid-section']
  const testimonials = content.testimonials
  const contact = content.contact

  const hasFirstSectionSubtitle = !!firstSection.subtitle
  const hasBookButton = !!firstSection['book-button']
  const hasHeroSubtitle = !!hero.subtitle
  const hasServicesDescription = !!services.description

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[560px] w-full">
        {/* Video for larger screens */}
        <ResponsiveMedia
          src={firstSection.video}
          className="absolute inset-0 hidden h-full w-full object-cover sm:block"
        />
        {/* Cover image for mobile screens */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center sm:hidden"
          style={{ backgroundImage: `url(${firstSection['cover-for-mobile']})` }}
        />
        <div className="absolute inset-0 bg-black/50 [mask-image:linear-gradient(to_bottom,black,black,transparent)]" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 pt-16">
          <div className="mx-auto max-w-4xl text-center text-white">
            {firstSection.logo && (
              <div className="mb-8">
                <Image
                  src={firstSection.logo}
                  alt="PNE Homes Logo"
                  width={360}
                  height={140}
                  className="mx-auto h-auto w-[240px] object-contain sm:w-[300px] md:w-[360px]"
                  priority
                />
              </div>
            )}

            <h1
              className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              style={{ fontFamily: '"New Caslon SB Bold", serif' }}
            >
              {firstSection.title}
            </h1>

            {hasFirstSectionSubtitle && (
              <p
                className="mx-auto mb-8 max-w-3xl text-base text-white/90 sm:text-lg md:text-xl"
                style={{ fontFamily: '"New Caslon SB Bold", serif' }}
              >
                {firstSection.subtitle}
              </p>
            )}

            {hasBookButton && (
              <Button
                asChild
                size="lg"
                className="rounded-md bg-[color:var(--pne-accent)] px-8 py-6 text-base text-white shadow-sm transition hover:shadow-md hover:brightness-110 md:text-lg"
              >
                <Link href="/contact">{firstSection['book-button']}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Why PNE */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl text-[color:var(--pne-brand)]">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl font-bold sm:text-6xl"
              style={{ fontFamily: '"New Caslon SB Bold", serif' }}
            >
              {hero.title}
            </h2>
            {hasHeroSubtitle && (
              <p
                className="mx-auto mt-3 max-w-3xl text-4xl"
                style={{ fontFamily: '"New Caslon SB Bold", serif' }}
              >
                {hero.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {hero.sections.map((section, i) => {
              const Icon =
                section.icon === 'date' ? Calendar : section.icon === 'pen' ? Pencil : HomeIcon
              return (
                <div
                  key={i}
                  className="rounded-xl bg-white p-8 text-center text-xl transition hover:shadow-sm"
                >
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                    <Icon aria-hidden className="h-12 w-12 text-[color:var(--pne-accent)]" />
                  </div>
                  <h3
                    className="mb-4 text-2xl font-semibold md:text-3xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {section.title}
                  </h3>
                  {section.description && (
                    <p
                      className="text-lg opacity-90 md:text-xl"
                      style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                    >
                      {section.description}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="relative bg-gray-50 px-4 py-16 md:py-20"
        style={{
          backgroundImage: `url(${services.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
              style={{ fontFamily: '"New Caslon SB Bold", serif' }}
            >
              {services.title}
            </h2>
            {hasServicesDescription && (
              <p
                className="max-w-2xl text-xl text-gray-900 md:text-2xl"
                style={{ fontFamily: '"New Caslon SB Bold", serif' }}
              >
                {services.description}
              </p>
            )}
          </div>
          <div className="space-y-6">
            {services.links.map((link, i) => (
              <Button
                key={i}
                asChild
                variant="ghost"
                size="lg"
                className="h-auto w-full justify-start rounded-lg border-none py-6 text-left shadow-none ring-0 hover:bg-white"
              >
                <Link href={`/services/${link.slug}`}>
                  <span
                    className="text-xl md:text-2xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {link.title}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Media Grid */}
      <section className="bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {/* Communities */}
            <Link href="/communities" className="group block">
              <div
                className="relative h-64 overflow-hidden rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url("${gridSection.links[0].cover}")` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className="text-3xl font-bold text-white md:text-4xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {gridSection.links[0].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Center video - hidden on small screens */}
            <div className="relative hidden h-64 overflow-hidden rounded-xl md:block">
              <ResponsiveMedia
                src={gridSection.video}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5" />
            </div>

            {/* Kitchens (note: CMS order differs; we still show Kitchens on right) */}
            <Link href="/gallery/kitchens" className="group block">
              <div
                className="relative h-64 overflow-hidden rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[2].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className="text-3xl font-bold text-white md:text-4xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {gridSection.links[2].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {/* Events (CMS second item) */}
            <Link href="/events" className="group block">
              <div
                className="relative h-64 overflow-hidden rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[1].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className="text-3xl font-bold text-white md:text-4xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {gridSection.links[1].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Logo tile */}
            <div className="hidden h-64 items-center justify-center rounded-xl bg-transparent ring-1 ring-black/5 md:flex">
              <Image
                src={gridSection.logo}
                alt="PNE Homes Logo"
                width={320}
                height={160}
                className="h-auto w-[200px] object-contain md:w-[260px] lg:w-[320px]"
              />
            </div>

            {/* Custom Homes (CMS fourth item is "WHY PNE?"; we keep your original link target) */}
            <Link href="/services/custom-homes" className="group block">
              <div
                className="relative h-64 overflow-hidden rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[3].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3
                    className="text-3xl font-bold text-white md:text-4xl"
                    style={{ fontFamily: '"New Caslon SB Bold", serif' }}
                  >
                    {gridSection.links[3].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white px-4 py-16 text-center md:py-20">
        <div className="mx-auto max-w-3xl">
          <Button
            asChild
            size="lg"
            className="rounded-md bg-[color:var(--pne-accent)] px-12 py-6 text-base text-white shadow-sm transition hover:shadow-md hover:brightness-110 md:text-lg"
          >
            <Link href="/contact">{contact}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
