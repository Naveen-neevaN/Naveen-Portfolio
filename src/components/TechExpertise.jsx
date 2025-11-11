'use client'

import React from 'react'
import './About.css'

const skills = [
  {
    id: 'automation',
    title: 'Automation Strategy',
    desc: 'End-to-end automation planning and governance',
    icon: '🛠️'
  },
  {
    id: 'cicd',
    title: 'CI/CD Integration',
    desc: 'Pipeline automation for reliable delivery',
    icon: '💡'
  },
  {
    id: 'genai',
    title: 'GenAI Orchestration',
    desc: 'Design and manage GenAI frameworks and MCP config',
    icon: '🔮'
  }
]

const TechExpertise = () => {
  return (
    <section className="about-skills" aria-labelledby="skills-title">
      <h3 id="skills-title" className="section-subhead">Tech Expertise & Toolchain</h3>
      <div className="skills__row">
        {skills.map((s) => (
          <div key={s.id} className="skill__card glass-panel">
            <div className="skill__iconCol" aria-hidden="true">
              <div className="skill__icon">{s.icon}</div>
            </div>

            <div className="skill__contentCol">
              <div className="skill__title">{s.title}</div>
              <div className="skill__desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechExpertise
