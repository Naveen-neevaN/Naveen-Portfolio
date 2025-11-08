import { personalInfo } from '@/data/personalInfo'
import './Skills.css'

// Icon mapping - you can customize this based on react-icons
const getIconComponent = (iconName?: string) => {
  // This is a placeholder - in a real implementation, you'd import and use react-icons
  // For now, we'll use a simple approach
  return null
}

const Skills = () => {
  const skillCategories = {
    frontend: personalInfo.skills.filter(s => s.category === 'frontend'),
    backend: personalInfo.skills.filter(s => s.category === 'backend'),
    tools: personalInfo.skills.filter(s => s.category === 'tools'),
    other: personalInfo.skills.filter(s => s.category === 'other'),
  }

  return (
    <section id="skills" className="skills section-padding">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
        
        <div className="skills-grid">
          {Object.entries(skillCategories).map(([category, skills]) => {
            if (skills.length === 0) return null
            
            return (
              <div key={category} className="skill-category">
                <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="skill-items">
                  {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills

