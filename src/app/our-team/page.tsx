import { OurTeamRepository } from '@/features/ourTeam/api'
import { TeamMember } from '@/features/ourTeam/api'
import Image from 'next/image'
import Link from 'next/link'

export default async function OurTeamPage() {
  const teamData = await OurTeamRepository.getOurTeamData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-96 bg-gray-900">
        <Image src={teamData.cover} alt="Our Team Cover" fill className="object-cover opacity-70" />
        <div className="bg-opacity-40 absolute inset-0 bg-black" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <p className="mb-4 text-sm font-semibold tracking-wide uppercase">{teamData.slogan}</p>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">{teamData.title}</h1>
            {teamData.subtitle && <p className="mb-6 text-xl md:text-2xl">{teamData.subtitle}</p>}
            {teamData.description && (
              <p className="mx-auto max-w-4xl px-4 text-lg">{teamData.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamData.team.map((member: TeamMember, index: number) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={member.cover}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="h-80 w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="mb-3 font-semibold text-blue-600">{member.position}</p>
                  {member.description && (
                    <p className="text-sm leading-relaxed text-gray-700">{member.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section - Only show if contact data exists */}
      {teamData.contact && (
        <div className="bg-blue-600 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-white">{teamData.contact.title}</h2>
            <Link
              href={`/contact?message=${encodeURIComponent(teamData.contact.message)}`}
              className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-gray-100"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
