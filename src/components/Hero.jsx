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
    const prefix = 'QA Automation - '
    const rolesRef = useRef(['Senior Project Engineer', 'Tosca Test Lead'])
  // Refs and state to keep the prefix statically centered while the typed role animates
  const roleContainerRef = useRef(null)
  const prefixRef = useRef(null)
  const [prefixWidth, setPrefixWidth] = useState(0)
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
    const typingSpeed = isDeleting ? 40 : 60
    const pauseAtEndMs = 1000
    const pauseAtStartMs = 500

    let timer

    if (!isDeleting && typedTitle === currentRole) {
      // pause at end before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseAtEndMs)
    } else if (isDeleting && typedTitle === '') {
      // move to next role and start typing
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % roles.length)
      timer = setTimeout(() => {}, pauseAtStartMs)
    } else {
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, Math.max(0, typedTitle.length - 1))
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

  // Measure the prefix width so we can absolutely position the typed text to the right of the centered prefix
  useEffect(() => {
    if (typeof window === 'undefined') return
    const measure = () => {
      try {
        if (prefixRef.current) setPrefixWidth(prefixRef.current.offsetWidth)
      } catch (e) {
        // ignore
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [isMounted])

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
        {/* Main hero layout: Left column (greeting text), Right column (carousel) */}
        <div className={`hero__layout ${isMounted ? 'is-mounted' : ''}`}>
          {/* Left Column: Large Greeting Text */}
          <div className={`hero__column hero__column--intro ${isMounted ? 'is-active' : ''}`}>
            <div className="hero__greetingBox">
              <h2 className="hero__greetingText">Hi, I&apos;m<br/><span className="gradient-text">{personalInfo.name}</span></h2>
            </div>
          </div>

          {/* Right Column: Modernized Carousel */}
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

        {/* Role Overview Tile: Below Hero Columns */}
        <div className={`hero__roleOverviewTile glass-panel ${isMounted ? 'is-visible' : ''}`}>
          <div className="hero__roleOverviewContent">
            {/* Left 70%: Role Description */}
            <div className="hero__roleDescription">
              <h2 className="hero__roleTitle">
                <span className="hero__rolePrefix">{prefix}</span>
                <span className="hero__roleTyped gradient-text">{typedTitle}</span>
              </h2>
              <p className="hero__roleOverviewText">{heroDescription}</p>
            </div>

            {/* Right 30%: Location Icon and Buttons */}
            <div className="hero__roleActions">
              <div className="hero__locationBadge">
                <span className="hero__locationIcon">📍</span>
                <div className="hero__locationValue">{personalInfo.location}</div>
              </div>

              <div className="hero__buttonsGroup">
                <button
                  className="btn btn-primary"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection('projects')
                  }}
                >
                  View Projects
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleResumeDownload}
                >
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

