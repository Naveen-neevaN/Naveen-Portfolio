'use client'

import React, { useState } from 'react'
import './About.css'
import { resolveAssetPath, resolveAssetSrcSet } from '@/lib/resolveAssetPath'
import { personalInfo } from '@/data/personalInfo.js'

const AboutIntro = ({ videoSrc, prefersReducedMotion, shouldLoadVideo }) => {
  const [videoError, setVideoError] = useState(false)
  const poster = resolveAssetPath('/images/optimized/about-poster-960.jpg')
  const posterSrcSet = resolveAssetSrcSet('/images/optimized/about-poster-640.jpg 640w, /images/optimized/about-poster-960.jpg 960w')
  const src = resolveAssetPath(videoSrc)
  const intro = personalInfo.aboutIntro

  return (
    <section className="about-intro glass-panel" aria-labelledby="about-intro-title">
      <div className="about-intro__inner">
        <div className="about-intro__media">
          {!videoError ? (
            <video
              className="about-intro__video"
              src={shouldLoadVideo ? src : undefined}
              poster={poster}
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              preload="none"
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
              srcSet={posterSrcSet}
              sizes="(max-width: 768px) 95vw, 520px"
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
