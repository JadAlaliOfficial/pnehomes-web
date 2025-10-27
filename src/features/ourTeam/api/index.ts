import { OurTeamRepository } from './file.repository'

// Export all repository functions and types
export { OurTeamRepository } from './file.repository'
export type { OurTeamData, TeamMember, Contact } from '../model/types'

// Export convenience functions directly from the repository
export const getOurTeamData = () => OurTeamRepository.getOurTeamData()
export const getTeamMembers = () => OurTeamRepository.getTeamMembers()
export const getTeamMemberByName = (name: string) => OurTeamRepository.getTeamMemberByName(name)
export const getTeamMemberByPosition = (position: string) => OurTeamRepository.getTeamMemberByPosition(position)
export const getContactInfo = () => OurTeamRepository.getContactInfo()
export const getHeaderInfo = () => OurTeamRepository.getHeaderInfo()
export const getCover = () => OurTeamRepository.getCover()
