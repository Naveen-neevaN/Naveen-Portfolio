'use client'

import { useEffect, useRef, useState } from 'react'
import './Header.css'
import { ThemeSwitch } from './ThemeSwitch'

const SITE_TITLE = "Naveen's Portfolio"

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
    scrollMeta.current.lastY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 24)

      if (!scrollMeta.current.ticking) {
        window.requestAnimationFrame(() => {
          const lastY = scrollMeta.current.lastY
          const delta = currentY - lastY
          const isScrollingDown = delta > 6
          const isScrollingUp = delta < -6

          if (currentY < 120) {
            setIsHidden(false)
          } else if (isScrollingDown) {
            setIsHidden(true)
          } else if (isScrollingUp) {
            setIsHidden(false)
          }

          scrollMeta.current.lastY = currentY
          scrollMeta.current.ticking = false
        })
        scrollMeta.current.ticking = true
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
    if (typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = (event) => {
      setPrefersReducedMotion(event.matches)
    }

    setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
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
