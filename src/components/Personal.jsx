'use client'

import React from 'react'
import './About.css'
import { personalInfo } from '@/data/personalInfo.js'

const Personal = () => {
  const note = personalInfo.personalNote

  return (
    <section className="about-personal" aria-labelledby="personal-title">
      <h3 id="personal-title" className="section-subhead">{note.title}</h3>
      <div className="personal__panel glass-panel glass-anim">
        <p>{note.description}</p>

        <div className="personal__center">
          <div className="agile-badge">
            <div className="agile-icon" aria-hidden>{note.icon}</div>
            <div className="agile-quote">{note.quote}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Personal
