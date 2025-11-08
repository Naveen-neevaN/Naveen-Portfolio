'use client'

import { personalInfo } from '@/data/personalInfo'
import './Hero.css'

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content fade-in-up">
          <h1 className="hero-title">
            Hi, I'm <span className="highlight">{personalInfo.name}</span>
          </h1>
          <h2 className="hero-subtitle">{personalInfo.title}</h2>
          <p className="hero-description">{personalInfo.bio}</p>
          <div className="hero-buttons">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
              className="btn btn-primary"
            >
              View My Work
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

