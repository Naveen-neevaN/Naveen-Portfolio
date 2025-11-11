'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
// Use native <img> to simplify loading from /public and avoid Next Image sizing issues for this static export
import { personalInfo } from '@/data/personalInfo.js'
import resolveAssetPath from '@/lib/resolveAssetPath'
import './Hero.css'

const SLIDE_DURATION_MS = 6500
const SLIDE_ANIM_MS = 700

const Hero = () => {
  const carouselImages = personalInfo.carouselImages ?? []
  const hasCarousel = carouselImages.length > 0
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  const [typedTitle, setTypedTitle] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [roleMinCh, setRoleMinCh] = useState(0)
  const prefix = 'QA Automation – '
  const rolesRef = useRef(['Tosca Test Lead', 'Senior Project Engineer'])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasCarouselError, setHasCarouselError] = useState(false)
  const [failedCarouselUrls, setFailedCarouselUrls] = useState([])
  const typingIndexRef = useRef(0)

  const heroDescription = useMemo(() => personalInfo.bio?.replace(/\s+/g, ' ').trim() ?? '', [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Diagnostic: log resolved asset URLs (helps capture what the resolver returns in different hosts)
  useEffect(() => {
    try {
      const resolved = (carouselImages || []).map((img) => ({ original: img, resolved: resolveAssetPath(img) }))
      const resumeResolved = resolveAssetPath(personalInfo.resumeUrl || '')
      if (typeof window !== 'undefined' && window.console && resolved.length) {
        console.groupCollapsed('Asset resolver diagnostics — hero')
        console.table(resolved)
        console.log('Resolved resume URL:', resumeResolved)
        console.groupEnd()
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.warn('Resolver diagnostics failed', err)
    }
  }, [isMounted])

  useEffect(() => {
    if (typeof window === 'undefined') return

    // determine reduced motion preference from multiple signals:
    // 1) explicit site-level toggle (document.documentElement class)
    // 2) persisted localStorage key (reducedMotion)
    // 3) system preference via matchMedia
    const readPref = () => {
      try {
        if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')) return true
        const saved = typeof window !== 'undefined' ? localStorage.getItem('reducedMotion') : null
        if (saved === 'true') return true
      } catch (e) {
        // ignore
      }
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      }
      return false
    }

    setPrefersReducedMotion(readPref())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMedia = (event) => setPrefersReducedMotion(readPref())
    mediaQuery.addEventListener('change', handleMedia)

    const handleDocEvent = (e) => setPrefersReducedMotion(readPref())
    document.addEventListener('reduced-motion-change', handleDocEvent)

    const handleStorage = (e) => {
      if (e.key === 'reducedMotion') setPrefersReducedMotion(readPref())
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      mediaQuery.removeEventListener('change', handleMedia)
      document.removeEventListener('reduced-motion-change', handleDocEvent)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    const roles = rolesRef.current
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
    // Reserve width to avoid layout shift/flicker
    const maxLen = rolesRef.current.reduce((m, s) => Math.max(m, s.length), 0)
    setRoleMinCh(maxLen + 2)
  }, [])

  useEffect(() => {
    if (!hasCarousel || hasCarouselError || prefersReducedMotion || carouselImages.length <= 1) {
      return
    }

    const interval = setInterval(() => {
      // use functional update to capture previous index so we can mark it for exit animation
      setCurrentSlide((prev) => {
        const next = (prev + 1) % carouselImages.length
        setPrevSlide(prev)
        // clear the prev marker after the animation duration
        setTimeout(() => setPrevSlide(null), SLIDE_ANIM_MS + 50)
        return next
      })
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
    // Resolve resume URL to respect possible basePath in hosted environments
    link.href = resolveAssetPath(personalInfo.resumeUrl || '')
    link.download = 'Naveen_K_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const showFallback = !hasCarousel || hasCarouselError

  return (
    <section id="hero" className="hero section-padding">
      <div className="container">
        {/* Top intro inside hero: single-line greeting rendered inside a glassy button-like element */}
        <div className="hero__topIntro">
          <h1 className="hero__title hero__title--singleline">
            <span className="hero__introLabel">Hi, I&apos;m</span>
            <button
              type="button"
              className="hero__introButton"
              onClick={(e) => e.preventDefault()}
              aria-label={`${personalInfo.name}`}
            >
              <span className="hero__highlight">{personalInfo.name}</span>
            </button>
          </h1>
        </div>
        <div className={`hero__layout ${isMounted ? 'is-mounted' : ''}`}>
          <div className={`hero__column hero__column--intro ${isMounted ? 'is-active' : ''}`}>
            <div className="hero__leftTile glass-panel">
              <div className="hero__columnContent">
                <p className="hero__role" style={{ minWidth: `${roleMinCh + prefix.length}ch` }}>
                  <span className="hero__rolePrefix">{prefix}</span>
                  <span className="hero__roleTyped">{typedTitle}</span>
                </p>

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
            </div>
          </div>

          <div className={`hero__column hero__column--visual ${isMounted ? 'is-active' : ''}`}>
            <div className="hero__visual glass-panel carousel-glass">
              <div className="hero__visual-glow" />
              {/* SVG overlay provides a crisper gold accent and glass shape (GPU-friendly) */}
              <svg
                className="hero__visual-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient id="g-gold" x1="0%" x2="100%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#F1C969" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                {/* subtle gold top-right accent line */}
                <line x1="8" y1="12" x2="92" y2="12" stroke="url(#g-gold)" strokeWidth="0.6" strokeLinecap="round" opacity="0.95" />
                {/* glass bevel highlight (soft) */}
                <rect x="0" y="0" width="100" height="100" fill="none" />
              </svg>

              {showFallback ? (
                <div className="hero__fallback">
                  {hasCarouselError ? (
                    <div>
                      <p style={{ margin: 0 }}>Carousel failed to load images from the public folder. Diagnostic info:</p>
                      <ul style={{ textAlign: 'left', margin: '0.6rem 0' }}>
                        {failedCarouselUrls.length ? (
                          failedCarouselUrls.map((it) => (
                            <li key={it.resolved} style={{ marginBottom: '0.4rem' }}>
                              <div><strong>original:</strong> {it.original}</div>
                              <div>
                                <strong>resolved:</strong>{' '}
                                <a href={it.resolved} target="_blank" rel="noopener noreferrer">
                                  {it.resolved}
                                </a>
                              </div>
                            </li>
                          ))
                        ) : (
                          <li>No resolved URLs captured yet — refresh the page to retry loading.</li>
                        )}
                      </ul>
                      <p style={{ marginTop: '0.6rem' }}>
                        If these URLs 404 on your host, the site is likely served under a different base path (for example
                        GitHub Pages serves sites under <code>/RepoName/</code>). Copy one failing Request URL from DevTools
                        Network and paste it here and I will patch the resolver to match that pattern.
                      </p>
                    </div>
                  ) : (
                    <span>Add carousel images to `public/images/carousel/` to complete the look.</span>
                  )}
                </div>
              ) : (
                <>
                  <div
                    className="hero__carousel"
                    aria-live="polite"
                    data-prefers-reduced-motion={prefersReducedMotion ? 'true' : 'false'}
                  >
                    {carouselImages.map((image, index) => {
                      const isActive = index === currentSlide
                      const isPrev = prevSlide === index
                      // cycle entry directions so slides enter from all four sides
                      const directions = ['left', 'top', 'right', 'bottom']
                      const dir = directions[currentSlide % directions.length]

                      return (
                        <div
                          key={image}
                          className={`hero__slide ${isActive ? 'is-active' : ''} ${isPrev ? 'was-active' : ''}`}
                          data-direction={dir}
                          aria-hidden={!isActive}
                        >
                          <img
                            src={resolveAssetPath(image)}
                            alt={`Portfolio highlight ${index + 1}`}
                            className="hero__image"
                            loading="lazy"
                            onError={(e) => {
                              // mark error to fall back and capture resolved URL for diagnostics
                              const resolved = resolveAssetPath(image)
                              if (process.env.NODE_ENV !== 'production') {
                                console.warn('Carousel image failed to load:', image, 'resolved->', resolved, e?.nativeEvent?.src || e?.target?.src)
                              }
                              setFailedCarouselUrls((s) => {
                                const exists = s.find((x) => x.resolved === resolved)
                                if (exists) return s
                                return [...s, { original: image, resolved }]
                              })
                              setHasCarouselError(true)
                            }}
                          />
                        </div>
                      )
                    })}
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
