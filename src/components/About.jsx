'use client'

import { useMemo } from 'react'
import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './About.css'

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  const aboutParagraphs = useMemo(
    () =>
      (personalInfo.about ?? '')
        .split('\n')
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    []
  )

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <h2 className="section-heading">About Me</h2>
        <p className="section-subheading">
          Engineering elevated, human-centric automation experiences across BFSI ecosystems.
        </p>

        <div ref={ref} className={`about__wrapper ${isVisible ? 'is-visible' : ''}`}>
          <article className="about__card glass-panel">
            <div className="about__intro">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={`about-paragraph-${index}`} className="about__paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="about__details">
              <div className="about__detail">
                <span className="about__detail-icon" aria-hidden="true">
                  ✉️
                </span>
                <span className="about__detail-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="about__detail-value">
                  {personalInfo.email}
                </a>
              </div>
              <div className="about__detail">
                <span className="about__detail-icon" aria-hidden="true">
                  📍
                </span>
                <span className="about__detail-label">Location</span>
                <span className="about__detail-value">{personalInfo.location}</span>
              </div>
              {personalInfo.phone ? (
                <div className="about__detail">
                  <span className="about__detail-icon" aria-hidden="true">
                    📞
                  </span>
                  <span className="about__detail-label">Phone</span>
                  <a href={`tel:${personalInfo.phone}`} className="about__detail-value">
                    {personalInfo.phone}
                  </a>
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
