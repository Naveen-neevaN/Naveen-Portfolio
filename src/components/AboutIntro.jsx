'use client'

import React, { useState } from 'react'
import './About.css'
import resolveAssetPath from '@/lib/resolveAssetPath'

const AboutIntro = ({ videoSrc, prefersReducedMotion }) => {
  const [videoError, setVideoError] = useState(false)
  const poster = resolveAssetPath('/about-poster.png')
  const src = resolveAssetPath(videoSrc)

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
          <h2 id="about-intro-title" className="projects__title gradient-text">Experience and Expertise
          </h2>
          <p className="projects__description text-muted">
            As a Senior Project Engineer and Tosca Automation Test Lead at Wipro Ltd, I bring a wealth of experience spanning nearly 5 years in the BFSI sector. My professional journey centers on delivering exceptional automation solutions while building lasting client relationships through innovative testing approaches.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
