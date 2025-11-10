'use client'

import { useMemo, useEffect, useState } from 'react'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import AboutIntro from './AboutIntro'
import Achievements from './Achievements'
import Innovation from './Innovation'
import TechExpertise from './TechExpertise'
import Personal from './Personal'
import './About.css'

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = (e) => setPrefersReducedMotion(e.matches)
    setPrefersReducedMotion(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // single video from public folder (renamed to a safe filename)
  const videoPath = '/wipro-logo.mp4'

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <p className="section-subheading">Engineering elevated, human-centric automation experiences across BFSI ecosystems.</p>

        <div ref={ref} className={`about__wrapper ${isVisible ? 'is-visible' : ''}`}>
          <AboutIntro videoSrc={videoPath} prefersReducedMotion={prefersReducedMotion} />
          <Achievements />
          <Innovation />
          <TechExpertise />
          <Personal />
          
          <section className="about-cta">
            <div className="about-cta__inner">
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's build smarter systems together
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default About
