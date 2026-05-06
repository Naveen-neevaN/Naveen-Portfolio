'use client';

import { useEffect, useState } from 'react';
import { applyThemeState, getInitialThemeState } from '@/lib/theme.js';
import './ThemeSwitch.css';

type Theme = 'light' | 'dark'
type ThemeFamily = '1' | '2'

/**
 * ThemeSwitch renders two buttons:
 * - display theme toggle (light / dark) — toggles within current family
 * - family toggle with gradient fill — shows the opposite family's gradient
 *
 * Family 1: Emerald → Teal → Gold gradient
 * Family 2 Light: Rose Pink → Soft Violet gradient
 * Family 2 Dark: Champagne → Ocean Teal → Champagne gradient
 */
export const ThemeSwitch = (): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');
  const [family, setFamily] = useState<ThemeFamily>('1');

  // Init from localStorage or system preference
  useEffect(() => {
    try {
      const { theme: initialTheme, family: initialFamily } = getInitialThemeState() as { theme: Theme, family: ThemeFamily }

      setTheme(initialTheme)
      setFamily(initialFamily)
      applyThemeState(initialTheme, initialFamily)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: init failed', e)
      applyThemeState(theme, family)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle light/dark within current family
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    try {
      applyThemeState(newTheme, family, { persist: true })
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: persist theme failed', e)
    }
  }

  // Toggle theme family between '1' (existing) and '2' (new family)
  const toggleFamily = () => {
    const newFamily: ThemeFamily = family === '1' ? '2' : '1'
    setFamily(newFamily)
    try {
      // Keep display mode the same, just swap variable set
      applyThemeState(theme, newFamily, { persist: true })
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: persist family failed', e)
    }
  }

  /**
   * Render gradient SVG for family toggle button
   * Shows the gradient of the opposite family (the one you'll switch to)
   */
  const renderFamilyGradientSVG = () => {
    if (family === '1') {
      // Currently in Family 1, show Family 2 gradient
      if (theme === 'light') {
        // Family 2 Light: Rose Pink (#fbc7d4) → Soft Violet (#9796f0)
        return (
          <svg className="family-gradient-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="family2-light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbc7d4" />
                <stop offset="100%" stopColor="#9796f0" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#family2-light-grad)" />
          </svg>
        )
      } else {
        // Family 2 Dark: Champagne (#E8D9C3) → Ocean Teal (#0A4B5F) → Champagne (#CBB89D)
        return (
          <svg className="family-gradient-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="family2-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E8D9C3" />
                <stop offset="50%" stopColor="#0A4B5F" />
                <stop offset="100%" stopColor="#CBB89D" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill="url(#family2-dark-grad)" />
          </svg>
        )
      }
    } else {
      // Currently in Family 2, show Family 1 gradient
      // Family 1: Emerald (#10B981) → Teal (#14B8A6) → Gold (#D4AF37)
      return (
        <svg className="family-gradient-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="family1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#14B8A6" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" fill="url(#family1-grad)" />
        </svg>
      )
    }
  }

  return (
    <div className="theme-switcher">
      <button
        onClick={toggleTheme}
        className="theme-switch"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <button
        onClick={toggleFamily}
        className="theme-family-switch"
        aria-label={`Switch to theme family ${family === '1' ? '2' : '1'}`}
      >
        {renderFamilyGradientSVG()}
      </button>
    </div>
  )
}
