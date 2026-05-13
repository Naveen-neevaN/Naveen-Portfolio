'use client'

import React from 'react'
import './About.css'
import { resolveAssetPath, resolveAssetSrcSet } from '@/lib/resolveAssetPath'
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
            srcSet={resolveAssetSrcSet(innovation.imageSrcSet)}
            sizes="(max-width: 920px) 90vw, 340px"
            alt="Poster illustrating innovation initiatives and the GenAI Accelerator"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              if (innovation.imageFallback) {
                event.currentTarget.srcset = ''
                event.currentTarget.src = resolveAssetPath(innovation.imageFallback)
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Innovation
