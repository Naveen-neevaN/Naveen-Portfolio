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
          <article className="about__grid">
            <div className="about__media glass-panel">
              <video
                className="about__video"
                src={encodeURI('./public/Wipro Logo Video.mp4')}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Wipro showcase"
              />
            </div>
            <div className="about__card glass-panel">
              <div className="about__intro">
                {aboutParagraphs.map((paragraph, index) => (
                  <p key={`about-paragraph-${index}`} className="about__paragraph">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default About
