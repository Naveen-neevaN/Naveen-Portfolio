'use client'

import React from 'react'
import './About.css'
import resolveAssetPath from '@/lib/resolveAssetPath'
import { personalInfo } from '@/data/personalInfo.js'

const Innovation = () => {
  const innovation = personalInfo.innovation

  return (
    <section className="about-innovation" aria-labelledby="innovation-title">
      <h3 id="innovation-title" className="section-subhead">{innovation.title}</h3>
      <div className="about-innovation__inner glass-panel">
        <div className="innovation__content">
          <p>{innovation.description}</p>
        </div>

        <div className="innovation__image">
          <img
            src={resolveAssetPath(innovation.image)}
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
