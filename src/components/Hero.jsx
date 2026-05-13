'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
// Use native <img> to simplify loading from /public and avoid Next Image sizing issues for this static export
import { personalInfo } from '@/data/personalInfo.js'
import { resolveAssetPath, resolveAssetSrcSet } from '@/lib/resolveAssetPath'
import { useReducedMotion } from '@/hooks/useReducedMotion.js'
import './Hero.css'

const SLIDE_DURATION_MS = 6500
const SLIDE_ANIM_MS = 700
const ROLE_DURATION_MS = 3500
const ROLE_ANIM_MS = 320

const Hero = () => {
  const carouselImages = personalInfo.carouselImages ?? []
  const hasCarousel = carouselImages.length > 0
  const [currentSlide, setCurrentSlide] = useState(0)
  const [prevSlide, setPrevSlide] = useState(null)
  const [isMounted, setIsMounted] = useState(false)
  // Role list and simple cycling state (small, non-typed transitions)
  const rolesRef = useRef(['Senior Project Engineer', 'Tosca Test Lead'])
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [prevRoleIndex, setPrevRoleIndex] = useState(null)
  const prefersReducedMotion = useReducedMotion()
  const [hasCarouselError, setHasCarouselError] = useState(false)
  const [failedCarouselUrls, setFailedCarouselUrls] = useState([])
  

  const heroDescription = useMemo(() => personalInfo.bio?.replace(/\s+/g, ' ').trim() ?? '', [])
  const currentRole = rolesRef.current[currentRoleIndex] ?? rolesRef.current[0]
  const getImageSrc = (image) => (typeof image === 'string' ? image : image.src)
  const getImageFallback = (image) => (typeof image === 'string' ? image : image.fallback || image.src)
  const getImageSrcSet = (image) => (typeof image === 'string' ? undefined : image.srcSet)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Diagnostic: log resolved asset URLs (helps capture what the resolver returns in different hosts)
  useEffect(() => {
    try {
      const resolved = (carouselImages || []).map((img) => ({ original: img, resolved: resolveAssetPath(img) }))
      if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.console && resolved.length) {
        console.groupCollapsed('Asset resolver diagnostics — hero')
        console.table(resolved)
        console.groupEnd()
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.warn('Resolver diagnostics failed', err)
    }
  }, [isMounted])

  // Removed: typed-role typing effects and measurement logic. The compact
  // name icon uses CSS animations and therefore doesn't require JS typing.

  // No JS shrink-to-fit needed; rely on CSS clamp() for responsive sizing

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

  // Cycle roles independently of the carousel so the name tile feels alive
  useEffect(() => {
    if (prefersReducedMotion) return
    if (!rolesRef.current || rolesRef.current.length <= 1) return

    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => {
        const next = (prev + 1) % rolesRef.current.length
        setPrevRoleIndex(prev)
        // clear prev marker after the reveal animation completes
        setTimeout(() => setPrevRoleIndex(null), ROLE_ANIM_MS + 60)
        return next
      })
    }, ROLE_DURATION_MS)

    return () => clearInterval(interval)
  }, [prefersReducedMotion])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Navigation helper: smooth-scroll to an in-page section
  // (used by the action buttons)

  const showFallback = !hasCarousel || hasCarouselError

  return (
    <section id="hero" className="hero section-padding">
      <div className="container">
        {/* Main hero layout: Left column (greeting text), Right column (carousel) */}
        <div className={`hero__layout ${isMounted ? 'is-mounted' : ''}`}>
          {/* Left Column: Large Greeting Text */}
          <div className={`hero__column hero__column--intro ${isMounted ? 'is-active' : ''}`}>
            <div className="hero__greetingBox">
              <h2 className="hero__greetingText"><span className="hero__greeting-prefix">Hi, I&apos;m</span><span className="gradient-text">{personalInfo.name}</span></h2>
              <div className="hero__roleDisplay" aria-live="polite" aria-atomic="true">
                <span className="sr-only">{currentRole}</span>
                {rolesRef.current.map((role, i) => (
                  <span
                    key={role}
                    className={`hero__role ${i === currentRoleIndex ? 'is-active' : ''} ${i === prevRoleIndex ? 'was-active' : ''}`}
                    aria-hidden="true"
                  >
                    {role}
                  </span>
                ))}
              </div>
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
                          key={getImageSrc(image)}
                          className={`hero__slide ${isActive ? 'is-active' : ''} ${isPrev ? 'was-active' : ''}`}
                          data-direction={dir}
                          aria-hidden={!isActive}
                        >
                          <img
                            src={resolveAssetPath(getImageSrc(image))}
                            srcSet={resolveAssetSrcSet(getImageSrcSet(image))}
                            sizes="(max-width: 540px) 90vw, (max-width: 1080px) 70vw, 520px"
                            alt={`Portfolio highlight ${index + 1}`}
                            className="hero__image"
                            loading={index === 0 ? 'eager' : 'lazy'}
                            fetchPriority={index === 0 ? 'high' : 'low'}
                            decoding="async"
                            onError={(e) => {
                              // mark error to fall back and capture resolved URL for diagnostics
                              const fallback = resolveAssetPath(getImageFallback(image))
                              const resolved = resolveAssetPath(getImageSrc(image))
                              if (e.currentTarget.src !== fallback) {
                                e.currentTarget.srcset = ''
                                e.currentTarget.src = fallback
                                return
                              }
                              if (process.env.NODE_ENV !== 'production') {
                                console.warn('Carousel image failed to load:', getImageSrc(image), 'resolved->', resolved, e?.nativeEvent?.src || e?.target?.src)
                              }
                              setFailedCarouselUrls((s) => {
                                const exists = s.find((x) => x.resolved === resolved)
                                if (exists) return s
                                return [...s, { original: getImageSrc(image), resolved }]
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
        <div className={`hero__roleOverviewTile glass-panel glass-anim ${isMounted ? 'is-visible' : ''}`}>
          <div className="hero__roleOverviewContent">
            {/* Left 70%: Role Description */}
            <div className="hero__roleDescription">
              {/* Title removed as requested — keep the overview text */}
              <p className="hero__roleOverviewText">{heroDescription}</p>
            </div>

            {/* Right 30%: Buttons */}
            <div className="hero__roleActions">
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
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection('technologies')
                  }}
                >
                  View Skill Sets
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

