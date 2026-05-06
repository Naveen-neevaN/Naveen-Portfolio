'use client'

import React from 'react'
import './About.css'
import { personalInfo } from '@/data/personalInfo.js'

const Achievements = () => {
  const statCards = personalInfo.achievements ?? []

  return (
    <section className="about-achievements" aria-labelledby="achievements-title">
      <h3 id="achievements-title" className="section-subhead">Achievements & Highlights</h3>
      <div className="achievements__grid">
        {statCards.map((card) => (
          <div key={card.id} className="achievement__card glass-panel">
            <div className="achievement__icon" aria-hidden>
              {card.icon}
            </div>
            <div className="achievement__body">
              <div className="achievement__label">{card.label}</div>
              <div className="achievement__subtitle">{card.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Achievements
