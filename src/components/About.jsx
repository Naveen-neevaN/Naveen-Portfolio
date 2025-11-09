'use client'

import { personalInfo } from '@/data/personalInfo.js'
import { useScrollAnimation } from '@/hooks/useScrollAnimation.js'
import './About.css'

const About = () => {
  const [ref, isVisible] = useScrollAnimation(0.2)

  return (
    <section id="about" className="about section-padding">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know me better</p>
        <div 
          ref={ref}
          className={`about-content ${isVisible ? 'fade-in-up' : ''}`}
        >
          <div className="about-text">
            <p>{personalInfo.about}</p>
            <div className="about-details">
              <div className="detail-item">
                <strong>Email:</strong> {personalInfo.email}
              </div>
              <div className="detail-item">
                <strong>Location:</strong> {personalInfo.location}
              </div>
              {personalInfo.phone && (
                <div className="detail-item">
                  <strong>Phone:</strong> {personalInfo.phone}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
