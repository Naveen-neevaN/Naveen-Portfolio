// Personal Information Data
// Replace all placeholder values with your actual information
//
// CUSTOMIZATION GUIDE:
// 1. Update all personal information (name, title, email, phone, location)
// 2. Customize your bio and about sections
// 3. Add/remove skills as needed (categories: 'frontend', 'backend', 'tools', 'other')
// 4. Add your projects with descriptions, technologies, and links
// 5. Update social media links (GitHub, LinkedIn, Twitter, etc.)
// 6. Place your resume.pdf file in the public/ folder
//
// NOTE: For the contact form to work, you'll need to integrate with a backend service
// like Formspree, EmailJS, or your own API endpoint.

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string; // Optional icon name from react-icons
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // Icon name from react-icons (e.g., 'FaGithub', 'FaLinkedin')
}

export const personalInfo = {
  // Basic Information
  name: 'NAVEEN K',
  title: 'Senior Project Engineer – Tosca Automation / Test Lead',
  email: 'naveennagendiran321@gmail.com',
  phone: '+91 9843165568',
  location: 'Tiruchirappalli, Tamil Nadu, India',
  
  // About Section
  bio: `Tosca Automation Test Lead with nearly 5 years of experience in BFSI applications, 
        driving automation delivery and client engagement. Proficient in Tosca framework design, 
        DEX integration, and AI-based testing.`,
  
  about: `I'm a Senior Project Engineer and Tosca Automation Test Lead at Wipro Ltd with nearly 5 years 
          of experience in BFSI applications. I specialize in driving automation delivery and client engagement, 
          with expertise in Tosca framework design, DEX integration, and AI-based testing.
          
          I've contributed to Wipro's GenAI Accelerator PoC, leading tool evaluations using Katalon and Playwright 
          in client environments. Skilled in MCP server orchestration, CI/CD integration, and automation strategy, 
          I've delivered 50+ releases with zero client escalations and consistent stakeholder satisfaction.
          
          When I'm not working, I'm a chess enthusiast - a district-level player and former college team captain. 
          I'm passionate about AI-led testing innovation and DevOps integration.`,
  
  // Skills
  skills: [
    // Testing Tools
    { name: 'Tosca', category: 'tools' as const },
    { name: 'Katalon', category: 'tools' as const },
    { name: 'Playwright', category: 'tools' as const },
    { name: 'Selenium', category: 'tools' as const },
    // GenAI Tools
    { name: 'Wipro GenAI Accelerator', category: 'other' as const },
    { name: 'Google Vertex AI', category: 'other' as const },
    // CI/CD & DevOps
    { name: 'Jenkins', category: 'tools' as const },
    { name: 'Jira', category: 'tools' as const },
    { name: 'BitBucket', category: 'tools' as const },
    { name: 'MCP Servers', category: 'tools' as const },
    // Backend/Programming
    { name: 'Python', category: 'backend' as const },
    { name: 'MySQL', category: 'backend' as const },
    // Other Tools
    { name: 'Postman', category: 'tools' as const },
    { name: 'AWS', category: 'tools' as const },
    { name: 'Salesforce', category: 'tools' as const },
  ] as Skill[],
  
  // Projects
  projects: [
    {
      title: 'Banking Domain – QA Automation',
      description: 'Led Tosca QA automation during major banking merger program. Served as QA representative for First Access (SailPoint) ensuring zero release escalations. Migrated manual suites to Tosca automation and optimized regression cycles, delivering 50+ releases with full stability.',
      technologies: ['Tosca', 'DEX', 'Vision AI', 'Jenkins', 'Jira'],
    },
    {
      title: 'GenAI-Powered Automation PoC | Wipro Accelerator',
      description: 'Executed AI-driven PoC comparing Tosca, Katalon, and Playwright for enterprise QA modernization. Showcased AI-assisted test case generation for BFSI client. Deployed automation on MCP servers, cutting runtime significantly. Presented outcomes leading to production-level pilot approval.',
      technologies: ['Wipro GenAI Accelerator', 'Katalon', 'Playwright', 'Tosca', 'MCP Servers', 'Google Vertex AI'],
    },
  ] as Project[],
  
  // Social Links
  socialLinks: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/naveen-k-2580411b2', icon: 'FaLinkedin' },
    { name: 'Email', url: 'mailto:naveennagendiran321@gmail.com', icon: 'FaEnvelope' },
  ] as SocialLink[],
  
  // Resume
  resumeUrl: '/resume.pdf', // Place your resume.pdf in the public folder
};

