export interface Project {
  title: string
  description: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
}

export interface SocialLink {
  name?: string
  url: string
  icon?: string
}

export interface Skill {
  name: string
  category?: string
}

export interface PersonalInfo {
  name: string
  title?: string
  email?: string
  phone?: string
  location?: string
  carouselImages?: string[]
  bio?: string
  about?: string
  skills: Skill[]
  projects: Project[]
  socialLinks: SocialLink[]
  resumeUrl?: string
}

export const personalInfo: PersonalInfo
