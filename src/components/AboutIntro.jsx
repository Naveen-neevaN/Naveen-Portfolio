'use client'

import React, { useState } from 'react'
import './About.css'

const normalizeSrc = (path) => {
  if (!path) return ''
  if (typeof path !== 'string') return path
  if (/^https?:\/\//i.test(path)) return encodeURI(path)

  // Normalize backslashes and trim
  const normalized = path.replace(/\\/g, '/').trim()

  // Determine base path (e.g., GitHub Pages repo subpath)
  let basePath = ''
  try {
    if (typeof window !== 'undefined' && window.location && typeof window.location.pathname === 'string') {
      const parts = window.location.pathname.split('/').filter(Boolean)
      if (parts.length && parts[0]) basePath = `/${parts[0]}`
    }
  } catch (e) {
    basePath = ''
  }

  // Remove public/ prefix or leading ./
  const cleaned = normalized.replace(/^\.\/?/, '').replace(/^public\//, '').replace(/^\//, '')
  const raw = `${basePath}/${cleaned}`
  const final = raw.replace(/\\/g, '/').replace(/\/{2,}/g, '/')
  try {
    return encodeURI(final)
  } catch (e) {
    return final
  }
}

const AboutIntro = ({ videoSrc, prefersReducedMotion }) => {
  const [videoError, setVideoError] = useState(false)
  const poster = normalizeSrc('/about-poster.png')
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
              onError={(e) => {
                console.warn('AboutIntro video failed to load:', src, e?.nativeEvent?.src || e?.target?.src)
                setVideoError(true)
              }}
            />
          ) : (
            <img className="about-intro__video" src={poster} alt="About visual" loading="lazy" />
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
