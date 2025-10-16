import { OurTeamRepository } from '@/features/ourTeam/api';
import { TeamMember } from '@/features/ourTeam/api';
import Image from 'next/image';

export default async function OurTeamPage() {
  const teamData = await OurTeamRepository.getOurTeamData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">
            {teamData.slogan}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {teamData.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {teamData.subtitle}
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            {teamData.description}
          </p>
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

      {/* Contact Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {teamData.contact.title}
          </h2>
          <a
            href={`/${teamData.contact.slug}`}
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}