'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { personalInfo } from '@/data/personalInfo.js'
import './Hero.css'

const SLIDE_DURATION_MS = 6500

const resolveImageSource = (path) => {
  if (!path) {
    return ''
  }

  if (/^https?:\/\//i.test(path)) {
    return path
  }

  if (path.startsWith('/')) {
    return path
  }

  if (path.startsWith('./')) {
    return `/${path.replace(/^\.\//, '')}`
  }

  return `/${path.replace(/^\/?/, '')}`
}

const Hero = () => {
  const carouselImages = personalInfo.carouselImages ?? []
  const hasCarousel = carouselImages.length > 0
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [typedTitle, setTypedTitle] = useState('')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasCarouselError, setHasCarouselError] = useState(false)
  const typingIndexRef = useRef(0)

  const heroDescription = useMemo(() => personalInfo.bio?.replace(/\s+/g, ' ').trim() ?? '', [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = (event) => setPrefersReducedMotion(event.matches)

    setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const title = personalInfo.title ?? ''
    if (!title || prefersReducedMotion) {
      setTypedTitle(title)
      return
    }

    typingIndexRef.current = 0
    setTypedTitle('')

    const interval = setInterval(() => {
      typingIndexRef.current += 1
      if (typingIndexRef.current > title.length) {
        clearInterval(interval)
        return
      }
      setTypedTitle(title.slice(0, typingIndexRef.current))
    }, 55)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (!hasCarousel || hasCarouselError || prefersReducedMotion || carouselImages.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, SLIDE_DURATION_MS)

    return () => clearInterval(interval)
  }, [carouselImages.length, hasCarousel, hasCarouselError, prefersReducedMotion])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResumeDownload = (event) => {
    event.preventDefault()
    const link = document.createElement('a')
    link.href = personalInfo.resumeUrl
    link.download = 'Naveen_K_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const showFallback = !hasCarousel || hasCarouselError

  return (
    <section id="hero" className="hero section-padding">
      <div className="container">
        <div className={`hero__layout ${isMounted ? 'is-mounted' : ''}`}>
          <div className={`hero__column hero__column--intro ${isMounted ? 'is-active' : ''}`}>
            <span className="hero__badge glass-inline">Hi, I&apos;m</span>
            <h1 className="hero__title">
              <span className="hero__highlight gradient-text">{personalInfo.name}</span>
            </h1>
            <p className="hero__role">{typedTitle || personalInfo.title}</p>

            <p className="hero__bio text-muted">{heroDescription}</p>

            <div className="hero__meta">
              <span className="hero__meta-item">
                <span aria-hidden="true">📍</span>
                {personalInfo.location}
              </span>
              <span className="hero__meta-item">
                <span aria-hidden="true">✉️</span>
                {personalInfo.email}
              </span>
            </div>

            <div className="hero__actions">
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('projects')
                }}
              >
                View My Work
              </a>
              <a href={personalInfo.resumeUrl} className="btn btn-outline" onClick={handleResumeDownload}>
                Download Resume
              </a>
            </div>
          </div>

          <div className={`hero__column hero__column--visual ${isMounted ? 'is-active' : ''}`}>
            <div className="hero__visual glass-panel">
              <div className="hero__visual-glow" />

              {showFallback ? (
                <div className="hero__fallback">
                  <span>Add carousel images to `public/images/carousel/` to complete the look.</span>
                </div>
              ) : (
                <>
                  <div className="hero__carousel" aria-live="polite">
                    {carouselImages.map((image, index) => (
                      <div
                        key={image}
                        className={`hero__slide ${index === currentSlide ? 'is-active' : ''}`}
                        aria-hidden={index !== currentSlide}
                      >
                        <Image
                          src={resolveImageSource(image)}
                          alt={`Portfolio highlight ${index + 1}`}
                          fill
                          sizes="(min-width: 1024px) 520px, (min-width: 768px) 70vw, 92vw"
                          priority={index === 0}
                          className="hero__image"
                          onError={() => setHasCarouselError(true)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="hero__indicators" role="tablist" aria-label="Hero carousel indicators">
                    {carouselImages.map((_, index) => (
                      <button
                        key={`indicator-${index}`}
                        type="button"
                        className={`hero__indicator ${index === currentSlide ? 'is-active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Show slide ${index + 1}`}
                        aria-selected={index === currentSlide}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
