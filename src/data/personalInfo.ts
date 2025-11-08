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
  
  // Carousel Images - Add multiple images that will shuffle automatically
  // Place images in public/images/carousel/ folder
  // Images will change every 3 seconds automatically
  // Rectangular faded shape spanning significant page width
  carouselImages: [
    '/images/carousel/image1.jpg',
    '/images/carousel/image2.jpg',
    // '/images/carousel/image3.jpg',
  ] as string[],
  
  // About Section - Rephrased content
  bio: `A seasoned Tosca Automation Test Lead with 5 years of specialized expertise in BFSI domain applications. 
        I excel at orchestrating automation initiatives and fostering meaningful client partnerships. My core strengths 
        lie in designing robust Tosca frameworks, implementing DEX integrations, and pioneering AI-driven testing methodologies.`,
  
  about: `As a Senior Project Engineer and Tosca Automation Test Lead at Wipro Ltd, I bring a wealth of experience 
          spanning nearly 5 years in the BFSI sector. My professional journey centers on delivering exceptional automation 
          solutions while building lasting client relationships through innovative testing approaches.
          
          I've played a pivotal role in Wipro's GenAI Accelerator PoC initiative, where I spearheaded comprehensive 
          tool assessments leveraging Katalon and Playwright across diverse client landscapes. My technical expertise 
          encompasses MCP server orchestration, seamless CI/CD pipeline integration, and strategic automation planning.
          
          My track record speaks volumes: I've successfully delivered 50+ production releases with a flawless zero-escalation 
          record, consistently exceeding stakeholder expectations through meticulous execution and proactive problem-solving.
          
          Beyond the professional realm, I'm an accomplished chess player who has competed at the district level and led 
          my college team as captain. My passion extends to exploring cutting-edge AI-driven testing innovations and 
          advancing DevOps practices in the automation landscape.`,
  
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
  
  // Projects - Rephrased descriptions
  projects: [
    {
      title: 'Banking Domain – QA Automation',
      description: 'Orchestrated comprehensive Tosca QA automation framework during a critical banking merger initiative. As the primary QA representative for First Access (SailPoint), I maintained an impeccable zero-escalation track record. Successfully transformed manual test suites into fully automated Tosca workflows, dramatically reducing regression cycle times while ensuring 50+ production releases with unwavering stability and reliability.',
      technologies: ['Tosca', 'DEX', 'Vision AI', 'Jenkins', 'Jira'],
    },
    {
      title: 'GenAI-Powered Automation PoC | Wipro Accelerator',
      description: 'Pioneered an innovative AI-driven proof-of-concept that evaluated Tosca, Katalon, and Playwright for enterprise-level QA transformation. Demonstrated revolutionary AI-assisted test case generation capabilities tailored for BFSI clients. Achieved remarkable efficiency gains by deploying automation infrastructure on MCP servers, resulting in substantial runtime reductions. Delivered compelling presentations that secured production-level pilot program approval.',
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

