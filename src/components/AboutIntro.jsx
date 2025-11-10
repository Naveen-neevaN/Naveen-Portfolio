'use client'

import React from 'react'
import './About.css'

const AboutIntro = ({ videoSrc, prefersReducedMotion }) => {
  return (
    <section className="about-intro glass-panel" aria-labelledby="about-intro-title">
      <div className="about-intro__inner">
        <div className="about-intro__media">
          <video
            className="about-intro__video"
            src={videoSrc}
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            playsInline
            aria-hidden="true"
          />
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
          {/* name badge intentionally removed per design */}
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
