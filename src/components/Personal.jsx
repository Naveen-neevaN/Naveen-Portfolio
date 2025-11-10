'use client'

import React from 'react'
import './About.css'

const Personal = () => {
  return (
    <section className="about-personal" aria-labelledby="personal-title">
      <h3 id="personal-title" className="section-subhead">Beyond the Code</h3>
      <div className="personal__panel glass-panel">
        <p>
          Beyond the professional realm, I'm an accomplished chess player who captained my college team and enjoy
          exploring AI-driven innovations and DevOps practices.
        </p>

        <div className="personal__center">
          <div className="agile-badge">
            <div className="agile-icon" aria-hidden>♟️</div>
            <div className="agile-quote">Chess taught me strategy; QA taught me patience — both made me better at debugging life.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Personal
