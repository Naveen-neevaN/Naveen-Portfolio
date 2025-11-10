// Runtime asset path resolver used by client components.
// Normalizes Windows backslashes, removes accidental `public/` prefixes,
// handles leading `./` relative paths and a lightweight basePath heuristic
// (helpful when the site is hosted under a repo subpath e.g. GitHub Pages).
export function resolveAssetPath(path) {
  if (!path) return ''
  if (typeof path !== 'string') return path

  // Absolute HTTP(S) URLs are returned as-is (encoded)
  if (/^https?:\/\//i.test(path)) return encodeURI(path)

  // Normalize separators and trim whitespace
  const normalized = path.replace(/\\/g, '/').trim()

  // If path starts with a root '/', keep it but remove accidental '/public/' prefix
  if (normalized.startsWith('/')) {
    try {
      return encodeURI(normalized.replace(/^\/public\//, '/').replace(/\/{2,}/g, '/'))
    } catch (e) {
      return normalized.replace(/^\/public\//, '/').replace(/\/{2,}/g, '/')
    }
  }

  // Handle './...' relative paths by stripping the leading './'
  if (normalized.startsWith('./')) {
    const cleaned = normalized.replace(/^\.\//, '')
    const candidate = ('/' + cleaned).replace(/^\/public\//, '/').replace(/\/{2,}/g, '/')
    try {
      return encodeURI(candidate)
    } catch (e) {
      return candidate
    }
  }

  // Heuristic: detect a repository subpath from the current location pathname
  // e.g., when served at https://username.github.io/RepoName/
  let basePath = ''
  try {
    // Prefer an explicit public env var (set at build time via next.config.js)
    if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BASE_PATH) {
      basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
    } else if (typeof window !== 'undefined' && window.location && typeof window.location.pathname === 'string') {
      const parts = window.location.pathname.split('/').filter(Boolean)
      if (parts.length && parts[0]) basePath = `/${parts[0]}`
    }
  } catch (e) {
    basePath = ''
  }

  // Remove any leading ./ or public/ or leading slash remnants
  const cleaned = normalized.replace(/^\.\/?/, '').replace(/^public\//, '').replace(/^\//, '')
  const raw = `${basePath}/${cleaned}`
  const final = raw.replace(/\\/g, '/').replace(/\/{2,}/g, '/')
  try {
    return encodeURI(final)
  } catch (e) {
    return final
  }
}

export default resolveAssetPath
