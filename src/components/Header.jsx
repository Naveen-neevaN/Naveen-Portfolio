'use client'

import { useEffect, useRef, useState } from 'react'
import './Header.css'
import { ThemeSwitch } from './ThemeSwitch'

const SITE_TITLE = "Surf My Profile"

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const scrollMeta = useRef({ lastY: 0, ticking: false })
  const isHiddenRef = useRef(isHidden)
  const isScrolledRef = useRef(isScrolled)

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      // If reduced motion is preferred, avoid hide/show animations and keep header visible
      if (prefersReducedMotion) {
        if (isHiddenRef.current !== false) {
          isHiddenRef.current = false
          setIsHidden(false)
        }
        const sc = window.scrollY > 0
        if (isScrolledRef.current !== sc) {
          isScrolledRef.current = sc
          setIsScrolled(sc)
        }
        return
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const delta = currentScrollY - lastScrollY

          // Show header at the top of the page
          if (currentScrollY < 50) {
            if (isHiddenRef.current !== false) {
              isHiddenRef.current = false
              setIsHidden(false)
            }
            if (isScrolledRef.current !== false) {
              isScrolledRef.current = false
              setIsScrolled(false)
            }
          }
          // Hide header when scrolling down
          else if (delta > 10) {
            if (isHiddenRef.current !== true) {
              isHiddenRef.current = true
              setIsHidden(true)
            }
            if (isScrolledRef.current !== true) {
              isScrolledRef.current = true
              setIsScrolled(true)
            }
          }
          // Show header when scrolling up
          else if (delta < -10) {
            if (isHiddenRef.current !== false) {
              isHiddenRef.current = false
              setIsHidden(false)
            }
            if (isScrolledRef.current !== true) {
              isScrolledRef.current = true
              setIsScrolled(true)
            }
          }

          lastScrollY = currentScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsHidden(false)
    }
  }, [prefersReducedMotion])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const readPref = () => {
      try {
        if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')) return true
        const saved = typeof window !== 'undefined' ? localStorage.getItem('reducedMotion') : null
        if (saved === 'true') return true
      } catch (e) {
        // ignore
      }
      if (typeof window !== 'undefined' && window.matchMedia) return window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return false
    }

    setPrefersReducedMotion(readPref())

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(readPref())

    mediaQuery.addEventListener('change', updatePreference)
    document.addEventListener('reduced-motion-change', updatePreference)
    const handleStorage = (e) => {
      if (e.key === 'reducedMotion') setPrefersReducedMotion(readPref())
    }
    window.addEventListener('storage', handleStorage)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
      document.removeEventListener('reduced-motion-change', updatePreference)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <header
        className={[
          'site-header',
          isScrolled ? 'site-header--scrolled' : '',
          isHidden ? 'site-header--hidden' : '',
          isMobileMenuOpen ? 'site-header--menu-open' : '',
        ].join(' ')}
      >
        <div className="site-header__inner container">
          {/* Surf button moved to the left side */}
          <button
            type="button"
            className="header-btn surf-profile"
            aria-label="Surf My Profile"
            title="Surf My Profile"
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload()
            }}
          >
            Surf My Profile
          </button>

          {/* nav moved into right controls to keep links aligned right */}
          <div className="site-header__right">
            <nav className="site-header__nav" aria-label="Primary">
              <ul className={`site-header__links ${isMobileMenuOpen ? 'is-open' : ''}`}>
                {navItems.map((item) => (
                  <li key={item.id} className="site-header__item">
                    <a
                      href={`#${item.id}`}
                      className="site-header__link"
                      onClick={(event) => {
                        event.preventDefault()
                        scrollToSection(item.id)
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="site-header__controls">
              {/* Theme controls (kept in header controls for consistent spacing) */}
              <div className="header-theme-controls">
                <ThemeSwitch />
              </div>

              <button
                type="button"
                className="site-header__menuButton"
                aria-label="Toggle navigation"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>
      {isMobileMenuOpen ? <div className="site-header__overlay" onClick={() => setIsMobileMenuOpen(false)} /> : null}
    </>
  )
}

export default Header
