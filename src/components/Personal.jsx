'use client'

import React from 'react'
import './About.css'

const Personal = () => {
  return (
    <section className="about-personal glass-panel" aria-labelledby="personal-title">
      <h3 id="personal-title" className="section-subhead">Beyond the Code</h3>
      <p>
        Beyond the professional realm, I’m an accomplished chess player who captained my college team and enjoy
        exploring AI-driven innovations and DevOps practices.
      </p>
      <blockquote className="personal__quote">“Chess taught me strategy; QA taught me patience — both made me better at debugging life.”</blockquote>
    </section>
  )
}

export default Personal
