'use client'

import React from 'react'
import './About.css'

const Innovation = () => {
  return (
    <section className="about-innovation" aria-labelledby="innovation-title">
      <div className="about-innovation__inner glass-panel">
        <div className="innovation__visual" aria-hidden>
          {/* simple abstract svg circuit */}
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="8" width="144" height="144" rx="16" stroke="rgba(255,255,255,0.08)"/>
            <path d="M40 60h40v40" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="110" cy="50" r="6" fill="var(--color-secondary)" />
            <path d="M70 30c10 20 30 20 40 10" stroke="rgba(255,255,255,0.12)" strokeWidth="2"/>
          </svg>
        </div>

        <div className="innovation__content">
          <h3 id="innovation-title" className="section-subhead">Innovation & Leadership</h3>
          <p>
            I played a pivotal role in Wipro's GenAI Accelerator PoC initiative, where I led tool assessments leveraging
            Katalon and Playwright across diverse client environments.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Innovation
