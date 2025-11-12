'use client';

import { useEffect, useState } from 'react';
import './ThemeSwitch.css';

type Theme = 'light' | 'dark'
type ThemeFamily = '1' | '2'

/**
 * ThemeSwitch now renders two buttons:
 * - display theme toggle (light / dark) — toggles within current family
 * - family toggle (family 1 / family 2) — swaps entire variable set
 *
 * Family 1 is the existing defaults and must not be changed.
 */
export const ThemeSwitch = (): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');
  const [family, setFamily] = useState<ThemeFamily>('1');

  // Apply DOM attributes
  const apply = (t: Theme, f: ThemeFamily) => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', t)
    // Use data-theme-family attribute: '1' (default) or '2' (new family)
    document.documentElement.setAttribute('data-theme-family', f)
  }

  // Init from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = typeof window !== 'undefined' ? (localStorage.getItem('theme') as Theme | null) : null
      const savedFamily = typeof window !== 'undefined' ? (localStorage.getItem('themeFamily') as ThemeFamily | null) : null

      const prefersDark = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false

      const initialTheme: Theme = (savedTheme as Theme) || (prefersDark ? 'dark' : 'light')
      const initialFamily: ThemeFamily = (savedFamily as ThemeFamily) || '1'

      setTheme(initialTheme)
      setFamily(initialFamily)
      apply(initialTheme, initialFamily)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: init failed', e)
      // fallback
      apply(theme, family)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Toggle light/dark within current family
  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    try {
      apply(newTheme, family)
      if (typeof window !== 'undefined') localStorage.setItem('theme', newTheme)
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
      apply(theme, newFamily)
      if (typeof window !== 'undefined') localStorage.setItem('themeFamily', newFamily)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: persist family failed', e)
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
        {family === '1' ? '🎭' : '🎨'}
      </button>
    </div>
  )
}