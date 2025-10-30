// src/repository/index.ts

import { OurTeamRepository } from './team.repository'
export { OurTeamRepository } from './team.repository'

export type { OurTeamData, TeamMember, Contact } from '../model/types'

// Convenience re-exports — now these can access the imported OurTeamRepository
export const getOurTeamData = () => OurTeamRepository.getOurTeamData()
export const getTeamMembers = () => OurTeamRepository.getTeamMembers()
export const getTeamMemberByName = (name: string) => OurTeamRepository.getTeamMemberByName(name)
export const getTeamMemberByPosition = (position: string) => OurTeamRepository.getTeamMemberByPosition(position)
export const getContactInfo = () => OurTeamRepository.getContactInfo()
export const getHeaderInfo = () => OurTeamRepository.getHeaderInfo()
export const getCover = () => OurTeamRepository.getCover()
