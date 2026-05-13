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

export interface ResponsiveAsset {
  src: string
  srcSet?: string
  fallback?: string
}

export interface PersonalInfo {
  name: string
  title?: string
  email?: string
  phone?: string
  location?: string
  carouselImages?: Array<string | ResponsiveAsset>
  bio?: string
  about?: string
  aboutIntro?: {
    title: string
    description: string
  }
  achievements?: Array<{
    id: string | number
    label: string
    subtitle: string
    icon?: string
  }>
  innovation?: {
    title: string
    description: string
    image?: string
    imageSrcSet?: string
    imageFallback?: string
  }
  techExpertise?: Array<{
    id: string
    title: string
    desc: string
    icon?: string
  }>
  personalNote?: {
    title: string
    description: string
    icon?: string
    quote: string
  }
  skills: Skill[]
  projects: Project[]
  socialLinks: SocialLink[]
  // resumeUrl removed — resume download functionality eliminated
}

export const personalInfo: PersonalInfo
