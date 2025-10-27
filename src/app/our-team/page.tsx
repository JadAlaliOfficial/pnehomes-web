import { getCover, getOurTeamData, TeamMember } from '@/features/ourTeam/api'
import Image from 'next/image'
import Link from 'next/link'

export default async function OurTeamPage() {
  const teamData = await getOurTeamData()
  const coverImage = await getCover()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== Hero ===== */}
      {coverImage && (
        <section className="relative isolate">
          <div className="absolute inset-0 -z-10">
            <Image src={coverImage} alt="Our Team Cover" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-white/10 to-black/10" />
          </div>

          <div className="container mx-auto px-6 pt-20 pb-10 text-center">
            {teamData?.slogan && (
              <p className="text-pne-accent mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
                {teamData.slogan}
              </p>
            )}
            <h1 className="text-pne-brand mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {teamData?.title || 'Our Team'}
            </h1>
            {teamData?.subtitle && (
              <h2 className="text-pne-brand text-xl font-medium opacity-90 md:text-2xl lg:text-3xl">
                {teamData.subtitle}
              </h2>
            )}
          </div>
        </section>
      )}

      {/* Title section when no cover image */}
      {!coverImage && (
        <div className="py-16 text-center">
          <div className="container mx-auto px-6">
            {teamData?.slogan && (
              <p className="text-pne-accent mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
                {teamData.slogan}
              </p>
            )}
            <h1 className="text-gray-900 mb-4 text-4xl font-extrabold tracking-tight uppercase sm:text-5xl">
              {teamData?.title || 'Our Team'}
            </h1>
            {teamData?.subtitle && (
              <h2 className="text-gray-700 text-xl font-medium md:text-2xl lg:text-3xl">
                {teamData.subtitle}
              </h2>
            )}
          </div>
        </div>
      )}

      {/* Description section */}
      {teamData?.description && (
        <div className="py-8 text-center">
          <div className="container mx-auto px-6">
            <p className="text-gray-600 mx-auto max-w-3xl text-base/7 sm:text-lg/8">
              {teamData.description}
            </p>
          </div>
        </div>
      )}

      {/* ===== Team Grid ===== */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamData?.team?.map((member: TeamMember, index: number) => (
              <article
                key={`${member.name}-${index}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Media */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={member.cover}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    priority={index < 3}
                  />
                  {/* Overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />
                  {/* Top-right subtle badge line (decorative) */}
                  <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-full border border-white/30 backdrop-blur-[2px] opacity-70 group-hover:opacity-100" />
                </div>

                {/* Text block over image, pinned to bottom */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-white drop-shadow-sm">
                    <span className="block text-xl font-bold tracking-tight">
                      {member.name}
                    </span>
                  </h3>
                  <p className="text-pne-accent mt-1 font-semibold">
                    {member.position}
                  </p>

                  {/* Slide-up bio on hover (clamped when not hovered) */}
                  {member.description && (
                    <p className="mt-3 max-h-0 overflow-hidden text-sm text-white/90 transition-[max-height] duration-500 ease-out group-hover:max-h-40">
                      {member.description}
                    </p>
                  )}
                </div>

                {/* Card underline accent on hover */}
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-pne-accent via-pne-brand to-pne-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </article>
            ))}
          </div>

          {/* ===== Contact CTA ===== */}
          {teamData?.contact && (
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5 md:p-12">
                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {teamData.contact.title}
                  </h2>
                  <Link
                    href={`/contact?message=${encodeURIComponent(teamData.contact.message)}`}
                    className="mt-8 inline-flex items-center justify-center rounded-md bg-pne-accent px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-pne-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-pne-accent focus-visible:ring-offset-2"
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
