'use client'

import React from 'react'
import './About.css'

const statCards = [
  { id: 1, label: '50+ Releases', subtitle: 'Production releases delivered', icon: '🚀' },
  { id: 2, label: 'Zero Escalations', subtitle: 'Customer-facing stability', icon: '✅' },
  { id: 3, label: '5 Years', subtitle: 'Industry experience', icon: '⏱️' }
]

const Achievements = () => {
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
