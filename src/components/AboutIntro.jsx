'use client'

import React, { useState } from 'react'
import './About.css'

const normalizeSrc = (path) => {
  if (!path) return ''
  if (typeof path !== 'string') return path
  if (/^https?:\/\//i.test(path)) return encodeURI(path)
  return encodeURI(path.replace(/^\.\/?/, '/').replace(/^public\//, '/'))
}

const AboutIntro = ({ videoSrc, prefersReducedMotion }) => {
  const [videoError, setVideoError] = useState(false)
  const poster = normalizeSrc('/A sharp vibrant ima.png')
  const src = normalizeSrc(videoSrc)

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
              aria-hidden="true"
              onError={() => setVideoError(true)}
            />
          ) : (
            <img className="about-intro__video" src={poster} alt="About visual" />
          )}
          <div className="about-intro__media-overlay" />
        </div>

        <div className="about-intro__text">
          <h2 id="about-intro-title" className="projects__title gradient-text">Experience and Expertise</h2>
          <p className="about-intro__summary">
            As a Senior Project Engineer and Tosca Automation Test Lead at Wipro Ltd, I bring a wealth of
            experience spanning nearly 5 years in the BFSI sector. My professional journey centers on delivering
            exceptional automation solutions while building lasting client relationships through innovative testing
            approaches.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
