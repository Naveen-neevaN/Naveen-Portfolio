'use client'

import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './Skills.css'

const Skills = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  
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
        
        <div 
          ref={ref}
          className={`skills-grid ${isVisible ? 'fade-in-up' : ''}`}
        >
          {Object.entries(skillCategories).map(([category, skills], catIndex) => {
            if (skills.length === 0) return null
            
            return (
              <div 
                key={category} 
                className="skill-category"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <h3 className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="skill-items">
                  {skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="skill-item"
                      style={{ animationDelay: `${(catIndex * 0.1) + (index * 0.05)}s` }}
                    >
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
