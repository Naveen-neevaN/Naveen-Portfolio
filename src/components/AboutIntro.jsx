'use client'

import React, { useState } from 'react'
import './About.css'
import resolveAssetPath from '@/lib/resolveAssetPath'
import { personalInfo } from '@/data/personalInfo.js'

const AboutIntro = ({ videoSrc, prefersReducedMotion }) => {
  const [videoError, setVideoError] = useState(false)
  const poster = resolveAssetPath('/about-poster.png')
  const src = resolveAssetPath(videoSrc)
  const intro = personalInfo.aboutIntro

  return (
    <section className="about-intro glass-panel" aria-labelledby="about-intro-title">
      <div className="about-intro__inner">
        <div className="about-intro__media">
          {!videoError ? (
            <video
              className="about-intro__video"
              src={src}
              poster={poster}
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              loading="lazy"
              aria-hidden="true"
              onError={(e) => {
                if (process.env.NODE_ENV !== 'production') {
                  console.warn('AboutIntro video failed to load:', src, e?.nativeEvent?.src || e?.target?.src)
                }
                setVideoError(true)
              }}
            />
          ) : (
            <img
              className="about-intro__video"
              src={poster}
              alt="Poster illustrating innovation and experience"
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="about-intro__media-overlay" />
        </div>

        <div className="about-intro__text">
          <h2 id="about-intro-title" className="about-card-title gradient-text">
            {intro.title}
          </h2>
          <p className="about-card-description text-muted">
            {intro.description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
