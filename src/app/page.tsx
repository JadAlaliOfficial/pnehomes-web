"use client"

// src/app/page.tsx
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { homeContentApi } from "@/features/home/api/home_content.api";
import { Calendar, Pencil, Home as HomeIcon } from "lucide-react";

/**
 * Updates in this version:
 * - Hero + "Why PNE" (title & subtitle) use "New Caslon SB Bold".
 * - Larger hero logo.
 * - Removed borders on "Why PNE" cards.
 * - Switched emojis to lucide-react icons; icons use pne-accent; all text in "Why PNE" uses pne-brand.
 * - Removed borders on Services links.
 */

// Testimonials Carousel Component
function TestimonialsCarousel({ testimonials }: { testimonials: any[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const stopAutoPlay = React.useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = React.useCallback(() => {
    if (!api) return;
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
    autoPlayRef.current = setInterval(() => {
      api.scrollNext();
    }, 4000);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
      setCount(api.scrollSnapList().length);
    };

    update();
    api.on("reInit", update);
    api.on("select", update);

    startAutoPlay();

    const handleVisibility = () => {
      if (document.hidden) stopAutoPlay();
      else startAutoPlay();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      api.off("reInit", update);
      api.off("select", update);
      document.removeEventListener("visibilitychange", handleVisibility);
      stopAutoPlay();
    };
  }, [api, startAutoPlay, stopAutoPlay]);

  return (
    <div className="relative">
      <Carousel
        setApi={setApi}
        className="w-full max-w-3xl mx-auto"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial: any, index: number) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
              <div className="bg-white rounded-xl p-8 shadow-sm h-full">
                <p className="text-gray-700 text-lg italic mb-6">
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

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              i === current
                ? "bg-[color:var(--pne-accent)]"
                : "bg-gray-300 hover:bg-gray-400",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const firstSection = homeContentApi.getFirstSection();
  const hero = homeContentApi.getHero();
  const services = homeContentApi.getServices();
  const gridSection = homeContentApi.getGridSection();
  const testimonials = homeContentApi.getTestimonials();
  const contact = homeContentApi.getContact();

  return (
    <div className="min-h-screen bg-white">
      {/* =========================
          HERO — Full-bleed video with mobile cover fallback
         ========================= */}
      <section className="relative h-[100svh] min-h-[560px] w-full">
        {/* Video for larger screens */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover hidden sm:block"
        >
          <source src={firstSection.video} type="video/mp4" />
        </video>

        {/* Cover image for mobile screens */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center sm:hidden"
          style={{ backgroundImage: `url(${homeContentApi.getCoverForMobile()})` }}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/50 [mask-image:linear-gradient(to_bottom,black,black,transparent)]" />

        <div className="relative z-10 h-full flex items-center justify-center px-4 pt-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            {firstSection.logo && (
              <div className="mb-8">
                <Image
                  src={firstSection.logo}
                  alt="PNE Homes Logo"
                  width={360}
                  height={140}
                  className="mx-auto h-auto w-[240px] sm:w-[300px] md:w-[360px] object-contain"
                  priority
                />
              </div>
            )}

            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
              style={{ fontFamily: '"New Caslon SB Bold", serif' }}
            >
              {firstSection.title}
            </h1>

            {homeContentApi.hasFirstSectionSubtitle() && (
              <p
                className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto"
                style={{ fontFamily: '"New Caslon SB Bold", serif' }}
              >
                {firstSection.subtitle}
              </p>
            )}

            {homeContentApi.hasBookButton() && (
              <Button
                asChild
                size="lg"
                className="bg-[color:var(--pne-accent)] hover:brightness-110 text-white px-8 py-6 text-base md:text-lg rounded-md shadow-sm hover:shadow-md transition"
              >
                <Link href="/contact">{firstSection["book-button"]}</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          "Why PNE" — 3 feature cards
         ========================= */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-[color:var(--pne-brand)]">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-6xl font-bold"
              style={{ fontFamily: '"New Caslon SB Bold", serif' }}
            >
              {hero.title}
            </h2>
            {homeContentApi.hasHeroSubtitle() && (
              <p
                className="mt-3 text-4xl max-w-3xl mx-auto"
                style={{ fontFamily: '"New Caslon SB Bold", serif' }}
              >
                {hero.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {hero.sections.map((section: any, i: number) => {
              const Icon =
                section.icon === "date"
                  ? Calendar
                  : section.icon === "pen"
                  ? Pencil
                  : HomeIcon;

              return (
                <div
                  key={i}
                  className="rounded-xl text-xl p-8 text-center hover:shadow-sm transition bg-white"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full">
                    <Icon
                      aria-hidden
                      className="h-8 w-8 text-[color:var(--pne-accent)]"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {section.title}
                  </h3>
                  {section.description && (
                    <p className="opacity-90">{section.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================
          Services — left copy + right list with background image
         ========================= */}
      <section
        className="py-16 md:py-20 px-4 bg-gray-50 relative"
        style={{
          backgroundImage: `url(${homeContentApi.getServicesCover()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-white/20" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start relative z-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {services.title}
            </h2>
            {homeContentApi.hasServicesDescription() && (
              <p className="text-lg text-gray-900 max-w-2xl">
                {services.description}
              </p>
            )}
          </div>
          <div className="space-y-4">
            {services.links.map((link: any, i: number) => (
              <Button
                key={i}
                asChild
                // removed outlines/borders
                variant="ghost"
                size="lg"
                className="w-full justify-start text-left h-auto py-4 rounded-lg border-none ring-0 shadow-none hover:bg-white"
              >
                <Link href={`/services/${link.slug}`}>
                  <span className="text-lg">{link.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          Media Grid — communities/video/kitchens + events/logo/custom homes
         ========================= */}
      <section className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6">
            {/* Communities */}
            <Link href="/communities" className="group block">
              <div
                className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[0].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {gridSection.links[0].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Center video - hidden on small screens */}
            <div className="relative h-64 rounded-xl overflow-hidden hidden md:block">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={gridSection.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 ring-1 ring-black/5 pointer-events-none rounded-xl" />
            </div>

            {/* Kitchens */}
            <Link href="/gallery/kitchens" className="group block">
              <div
                className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[1].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {gridSection.links[1].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Events */}
            <Link href="/events" className="group block">
              <div
                className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[2].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {gridSection.links[2].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Logo tile - hidden on small screens, bigger on large screens */}
            <div className="h-64 rounded-xl bg-gray-100 ring-1 ring-black/5 items-center justify-center hidden md:flex">
              <Image
                src={gridSection.logo}
                alt="PNE Homes Logo"
                width={240}
                height={120}
                className="h-auto w-[160px] md:w-[200px] lg:w-[240px] object-contain"
              />
            </div>

            {/* Custom Homes */}
            <Link href="/services/custom-homes" className="group block">
              <div
                className="relative h-64 rounded-xl overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${gridSection.links[3].cover})` }}
              >
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">
                    {gridSection.links[3].title}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          Testimonials
         ========================= */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
            What Our Clients Say
          </h2>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* =========================
          Contact CTA
         ========================= */}
      <section className="py-16 md:py-20 px-4 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <Button
            asChild
            size="lg"
            className="bg-[color:var(--pne-accent)] hover:brightness-110 text-white px-12 py-6 text-base md:text-lg rounded-md shadow-sm hover:shadow-md transition"
          >
            <Link href="/contact">{contact}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
