'use client'

import { useState, useEffect } from 'react'
import { personalInfo } from '@/data/personalInfo.js'
import './Hero.css'
import './Hero.additional.css'

const Hero = () => {
  const [currentCarouselImage, setCurrentCarouselImage] = useState(0)
  const [carouselError, setCarouselError] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [typedTitle, setTypedTitle] = useState('')

  useEffect(() => {
    const title = personalInfo.title;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= title.length) {
        setTypedTitle(title.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeDownload = (e) => {
    e.preventDefault()
    const link = document.createElement('a')
    link.href = personalInfo.resumeUrl
    link.download = 'Naveen_K_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    if (personalInfo.carouselImages && personalInfo.carouselImages.length > 0) {
      const interval = setInterval(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentCarouselImage((prev) => (prev + 1) % personalInfo.carouselImages.length)
          setIsTransitioning(false)
        }, 500)
      }, 6000)

      return () => clearInterval(interval)
    }
  }, [])

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-content fade-in-up">
          <div className="hero-carousel-container">
            <div className="hero-carousel-wrapper">
              {personalInfo.carouselImages && personalInfo.carouselImages.length > 0 && !carouselError ? (
                <div className="hero-carousel-images-wrapper">
                  {personalInfo.carouselImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Carousel ${index + 1}`}
                      className={`hero-carousel-image ${index === currentCarouselImage ? 'active' : ''}`}
                      onError={() => {
                        if (index === currentCarouselImage) {
                          setCarouselError(true)
                        }
                      }}
                      onLoad={() => {
                        if (index === currentCarouselImage) {
                          setCarouselError(false)
                        }
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="hero-carousel-placeholder">
                  <span>Add Carousel Images to public/images/carousel/</span>
                </div>
              )}
            </div>
          </div>
          
          <h1 className="hero-title">
            Hi, I'm <span className="highlight-gradient">{personalInfo.name}</span>
          </h1>
          <div className="hero-location">
            <span>📍 {personalInfo.location}</span>
          </div>
          <h2 className="hero-subtitle">
            {typedTitle}<span className="typing-cursor">|</span>
          </h2>
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
