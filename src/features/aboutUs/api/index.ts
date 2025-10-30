/**
 * AboutUs API - Main entry point (using live API)
 */

export type { AboutUsData, ContactInfo, AboutUsResponse } from '../model/types'
export { AboutUsApiRepository } from './api.repository'

import { AboutUsApiRepository } from './api.repository'

export const getAboutUsData = () => AboutUsApiRepository.getAboutUsData()
export const getContactInfo = () => AboutUsApiRepository.getContactInfo()
export const getTitle = () => AboutUsApiRepository.getTitle()
export const getSlogan = () => AboutUsApiRepository.getSlogan()
export const getDescription = () => AboutUsApiRepository.getDescription()
export const getCover = () => AboutUsApiRepository.getCover()

const AboutUsAPI = {
  getAboutUsData,
  getContactInfo,
  getTitle,
  getSlogan,
  getDescription,
  getCover,
  Repository: AboutUsApiRepository,
}

export default AboutUsAPI
