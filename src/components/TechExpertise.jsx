'use client'

import React from 'react'
import './About.css'

const skills = [
  { id: 'mcp', title: 'MCP Server Orchestration', desc: 'Design and manage MCP servers for scalable test execution' },
  { id: 'cicd', title: 'CI/CD Integration', desc: 'Pipeline automation for reliable delivery' },
  { id: 'automation', title: 'Automation Strategy', desc: 'End-to-end automation planning and governance' }
]

const TechExpertise = () => {
  return (
    <section className="about-skills" aria-labelledby="skills-title">
      <h3 id="skills-title" className="section-subhead">Tech Expertise & Toolchain</h3>
      <div className="skills__row">
        {skills.map((s) => (
          <div key={s.id} className="skill__card glass-panel">
            <div className="skill__icon" aria-hidden>⚙️</div>
            <div className="skill__title">{s.title}</div>
            <div className="skill__desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechExpertise
