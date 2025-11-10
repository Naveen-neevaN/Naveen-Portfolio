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
          <h2 id="about-intro-title" className="projects__title gradient-text">Senior Project Engineer & Tosca Automation Test Lead</h2>
          <p className="about-intro__summary">
            As a Senior Project Engineer and Tosca Automation Test Lead at Wipro Ltd, I bring a wealth of
            experience spanning nearly 5 years in the BFSI sector. My professional journey centers on delivering
            exceptional automation solutions while building lasting client relationships through innovative testing
            approaches.
          </p>
          <div className="about-intro__name-badge">
            <span className="about-intro__name">Naveen</span>
            <span className="about-intro__designation">Senior Project Engineer & Tosca Automation Test Lead</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutIntro
