export interface TeamMember {
  cover: string;
  name: string;
  position: string;
  description: string;
}

export interface Contact {
  title: string;
  slug: string;
}

export interface OurTeamData {
  slogan: string;
  title: string;
  subtitle: string;
  description: string;
  team: TeamMember[];
  contact: Contact;
}