export const THEME_STORAGE_KEY = 'theme'
export const THEME_FAMILY_STORAGE_KEY = 'themeFamily'
export const REDUCED_MOTION_STORAGE_KEY = 'reducedMotion'
export const REDUCED_MOTION_EVENT = 'reduced-motion-change'

export const DEFAULT_THEME = 'light'
export const DEFAULT_THEME_FAMILY = '1'

export function normalizeTheme(value) {
  return value === 'dark' || value === 'light' ? value : DEFAULT_THEME
}

export function normalizeThemeFamily(value) {
  return value === '2' || value === '1' ? value : DEFAULT_THEME_FAMILY
}

export function getInitialThemeState() {
  if (typeof window === 'undefined') {
    return { theme: DEFAULT_THEME, family: DEFAULT_THEME_FAMILY }
  }

  let savedTheme = null
  let savedFamily = null

  try {
    savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    savedFamily = window.localStorage.getItem(THEME_FAMILY_STORAGE_KEY)
  } catch (error) {
    savedTheme = null
    savedFamily = null
  }

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const theme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : prefersDark
      ? 'dark'
      : DEFAULT_THEME

  return {
    theme,
    family: normalizeThemeFamily(savedFamily),
  }
}

export function applyThemeState(theme, family, options = {}) {
  if (typeof document === 'undefined') return

  const nextTheme = normalizeTheme(theme)
  const nextFamily = normalizeThemeFamily(family)
  document.documentElement.setAttribute('data-theme', nextTheme)
  document.documentElement.setAttribute('data-theme-family', nextFamily)

  if (options.persist && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
      window.localStorage.setItem(THEME_FAMILY_STORAGE_KEY, nextFamily)
    } catch (error) {
      // Ignore storage failures in private or locked-down browser contexts.
    }
  }
}

export function readReducedMotionPreference() {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('reduced-motion')) return true

  try {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(REDUCED_MOTION_STORAGE_KEY) : null
    if (saved === 'true') return true
    if (saved === 'false') return false
  } catch (error) {
    // Fall through to system preference.
  }

  return Boolean(typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}

export function applyReducedMotionPreference(reduced, options = {}) {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle('reduced-motion', Boolean(reduced))

  if (options.persist && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(REDUCED_MOTION_STORAGE_KEY, reduced ? 'true' : 'false')
    } catch (error) {
      // Ignore storage failures.
    }
  }

  if (options.notify) {
    document.dispatchEvent(new CustomEvent(REDUCED_MOTION_EVENT, { detail: { reduced: Boolean(reduced) } }))
  }
}

export const themeInitScript = `
(() => {
  const themeKey = '${THEME_STORAGE_KEY}';
  const familyKey = '${THEME_FAMILY_STORAGE_KEY}';
  const motionKey = '${REDUCED_MOTION_STORAGE_KEY}';
  const root = document.documentElement;

  let theme;
  let family;
  let reducedMotion;

  try {
    theme = localStorage.getItem(themeKey);
    family = localStorage.getItem(familyKey);
    reducedMotion = localStorage.getItem(motionKey);
  } catch (error) {}

  if (theme !== 'dark' && theme !== 'light') {
    theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : '${DEFAULT_THEME}';
  }

  if (family !== '2' && family !== '1') family = '${DEFAULT_THEME_FAMILY}';

  root.setAttribute('data-theme', theme);
  root.setAttribute('data-theme-family', family);

  const systemReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion === 'true' || (reducedMotion !== 'false' && systemReduced)) {
    root.classList.add('reduced-motion');
  }
})();
`
