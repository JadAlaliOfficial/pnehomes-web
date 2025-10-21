import { OurTeamRepository } from '@/features/ourTeam/api';
import { TeamMember } from '@/features/ourTeam/api';
import Image from 'next/image';
import Link from 'next/link';

export default async function OurTeamPage() {
  const teamData = await OurTeamRepository.getOurTeamData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Cover Image */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={teamData.cover}
          alt="Our Team Cover"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-wide mb-4">
              {teamData.slogan}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {teamData.title}
            </h1>
            {teamData.subtitle && (
              <p className="text-xl md:text-2xl mb-6">
                {teamData.subtitle}
              </p>
            )}
            {teamData.description && (
              <p className="text-lg max-w-4xl mx-auto px-4">
                {teamData.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.team.map((member: TeamMember, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <Image
                    src={member.cover}
                    alt={member.name}
                    width={400}
                    height={500}
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-3">
                    {member.position}
                  </p>
                  {member.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {member.description}
                    </p>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              {teamData.contact.title}
            </h2>
            <Link
              href={`/contact?message=${encodeURIComponent(teamData.contact.message)}`}
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}