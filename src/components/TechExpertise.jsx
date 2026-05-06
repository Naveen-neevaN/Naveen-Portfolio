'use client'

import React from 'react'
import './About.css'
import { personalInfo } from '@/data/personalInfo.js'

const TechExpertise = () => {
  const skills = personalInfo.techExpertise ?? []

  return (
    <section id="technologies" className="about-skills" aria-labelledby="skills-title">
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
