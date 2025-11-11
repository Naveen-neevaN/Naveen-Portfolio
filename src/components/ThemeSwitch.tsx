'use client';

import { useEffect, useState } from 'react';
import './ThemeSwitch.css';

type Theme = 'light' | 'dark'

export const ThemeSwitch = (): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    try {
      // Check for saved theme preference or system preference
      const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
      const prefersDark = typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false

      const initialTheme: Theme = (savedTheme as Theme) || (prefersDark ? 'dark' : 'light')
      setTheme(initialTheme)
      if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', initialTheme)
    } catch (e) {
      // Safe fallback — do nothing if access to localStorage is blocked
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: failed to read theme', e)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    try {
      if (typeof document !== 'undefined') document.documentElement.setAttribute('data-theme', newTheme)
      if (typeof window !== 'undefined') localStorage.setItem('theme', newTheme)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') console.warn('ThemeSwitch: failed to persist theme', e)
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-switch"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}