'use client'

import { useEffect, useRef, useState } from 'react'
import './Header.css'
import { ThemeSwitch } from './ThemeSwitch'
import MotionToggle from './MotionToggle'

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

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      // If reduced motion is preferred, avoid hide/show animations and keep header visible
      if (prefersReducedMotion) {
        setIsHidden(false)
        setIsScrolled(window.scrollY > 0)
        return
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          const delta = currentScrollY - lastScrollY

          // Show header at the top of the page
          if (currentScrollY < 50) {
            setIsHidden(false)
            setIsScrolled(false)
          }
          // Hide header when scrolling down
          else if (delta > 10) {
            setIsHidden(true)
            setIsScrolled(true)
          }
          // Show header when scrolling up
          else if (delta < -10) {
            setIsHidden(false)
            setIsScrolled(true)
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
          <a
            href="#hero"
            className="site-header__brand"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('hero')
            }}
            aria-label="Scroll to top"
          >
            <span className="site-header__brand-title gradient-text">{SITE_TITLE}</span>
          </a>

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
                <li className="site-header__item site-header__item--switch">
                  <ThemeSwitch />
                </li>
                <li className="site-header__item site-header__item--switch">
                  <MotionToggle />
                </li>
              </ul>
            </nav>
            <div className="site-header__controls">
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
