export interface Contact {
  title: string;
  slug: string;
}

export interface PrivacyPolicy {
  slogan: string;
  title: string;
  description: string;
  contact: Contact;
}

export interface PrivacyPolicyResponse {
  data: PrivacyPolicy;
  success: boolean;
  message?: string;
}