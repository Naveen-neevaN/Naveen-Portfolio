'use client'

import { useState, useEffect } from 'react'
import { personalInfo } from '@/data/personalInfo'
import './Hero.css'

const Hero = () => {
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0)
  const [carouselError, setCarouselError] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a')
    link.href = personalInfo.resumeUrl
    link.download = 'Naveen_K_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Carousel auto-shuffle effect
  useEffect(() => {
    if (personalInfo.carouselImages && personalInfo.carouselImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentCarouselImage((prev) => 
          (prev + 1) % personalInfo.carouselImages!.length
        )
      }, 3000) // Change image every 3 seconds

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content fade-in-up">
          {/* Carousel Image - Rectangular, above intro text */}
          <div className="hero-carousel-container">
            <div className="hero-carousel-wrapper">
              {personalInfo.carouselImages && personalInfo.carouselImages.length > 0 && !carouselError ? (
                <img
                  src={personalInfo.carouselImages[currentCarouselImage]}
                  alt={`Carousel ${currentCarouselImage + 1}`}
                  className="hero-carousel-image"
                  key={currentCarouselImage}
                  onError={() => {
                    setCarouselError(true)
                  }}
                  onLoad={() => {
                    setCarouselError(false)
                  }}
                />
              ) : (
                <div className="hero-carousel-placeholder">
                  <span>Add Carousel Images to public/images/carousel/</span>
                </div>
              )}
            </div>
          </div>
          
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
              onClick={handleResumeDownload}
              className="btn btn-secondary"
              download="Naveen_K_Resume.pdf"
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

