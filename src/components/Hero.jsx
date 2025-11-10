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
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
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
    const roles = [
      'Senior Project Engineer – Automation',
      'Tosca Automation Test Lead',
    ]

    if (prefersReducedMotion) {
      setTypedTitle(roles[0])
      return
    }

    const currentRole = roles[roleIndex % roles.length]
    const typingSpeed = isDeleting ? 35 : 55
    const pauseAtEndMs = 1200
    const pauseAtStartMs = 400

    let timer
    if (!isDeleting && typedTitle === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), pauseAtEndMs)
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
      timer = setTimeout(() => {}, pauseAtStartMs)
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, typedTitle.length - 1)
          : currentRole.slice(0, typedTitle.length + 1)
        setTypedTitle(nextText)
      }, typingSpeed)
    }

    return () => clearTimeout(timer)
  }, [typedTitle, isDeleting, roleIndex, prefersReducedMotion])

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
            <div className="hero__introLabel">Hi, I&apos;m</div>
            <h1 className="hero__title">
              <span className="hero__highlight gradient-text">{personalInfo.name}</span>
            </h1>
            <p className="hero__role">{typedTitle}</p>

            <p className="hero__bio text-muted">{heroDescription}</p>

            <div className="hero__meta">
              <span className="hero__meta-item">
                <span aria-hidden="true">📍</span>
                {personalInfo.location}
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
                  {/* indicators removed as requested */}
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
