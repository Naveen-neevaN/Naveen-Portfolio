'use client'

import React from 'react'
import './About.css'
import resolveAssetPath from '@/lib/resolveAssetPath'

const Innovation = () => {
  return (
    <section className="about-innovation" aria-labelledby="innovation-title">
      <h3 id="innovation-title" className="section-subhead">Innovation & Leadership</h3>
      <div className="about-innovation__inner glass-panel">
        <div className="innovation__content">
          <p>
            I played a pivotal role in Wipro's GenAI Accelerator PoC initiative, where I led tool assessments leveraging
            Katalon and Playwright across diverse client environments.
          </p>
        </div>

        <div className="innovation__image">
          <img
            src={resolveAssetPath('/about-poster.png')}
            alt="Poster illustrating innovation initiatives and the GenAI Accelerator"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

export default Innovation
