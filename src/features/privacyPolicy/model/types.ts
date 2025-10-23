export interface Contact {
  title: string
  message: string
}

export interface PrivacyPolicy {
  slogan: string
  title: string
  description: string
  cover?: string
  contact?: Contact
}

export interface PrivacyPolicyResponse {
  data: PrivacyPolicy
  success: boolean
  message?: string
}
