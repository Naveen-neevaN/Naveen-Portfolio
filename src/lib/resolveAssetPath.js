// Runtime asset path resolver used by client components.
// Normalizes Windows backslashes, removes accidental `public/` prefixes,
// handles leading `./` relative paths and a lightweight basePath heuristic
// (helpful when the site is hosted under a repo subpath e.g. GitHub Pages).
function resolveAssetPath(path) {
	if (!path) return ''
	if (typeof path !== 'string') return path

	// Absolute HTTP(S) URLs are returned as-is (encoded)
	if (/^https?:\/\//i.test(path)) return encodeURI(path)

	// Normalize separators and trim whitespace
	const normalized = path.replace(/\\/g, '/').trim()

	// Heuristic: detect a repository subpath from the current location pathname
	let basePath = ''
	try {
		if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BASE_PATH) {
			basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
		} else if (typeof window !== 'undefined' && window.location && typeof window.location.pathname === 'string') {
			const parts = window.location.pathname.split('/').filter(Boolean)
			if (parts.length && parts[0]) basePath = `/${parts[0]}`
		}
	} catch (e) {
		basePath = ''
	}

	// Root-prefixed paths: strip accidental /public/ and apply basePath if needed
	if (normalized.startsWith('/')) {
		const cleanedRoot = normalized.replace(/^\/\.?public\//, '/').replace(/\/{2,}/g, '/')
		if (basePath && cleanedRoot.startsWith(basePath + '/')) return encodeURI(cleanedRoot)
		return encodeURI((basePath + cleanedRoot).replace(/\/{2,}/g, '/'))
	}

	// Relative ./ paths
	if (normalized.startsWith('./')) {
		const cleaned = normalized.replace(/^\.\//, '')
		const candidate = ('/' + cleaned).replace(/^\/public\//, '/').replace(/\/{2,}/g, '/')
		const final = basePath && !candidate.startsWith(basePath + '/') ? (basePath + candidate).replace(/\/{2,}/g, '/') : candidate
		try {
			return encodeURI(final)
		} catch (e) {
			return final
		}
	}

	// Plain relative like 'images/foo.jpg'
	let cleaned = normalized.replace(/^\.\/?/, '').replace(/^public\//, '').replace(/^\.public\//, '').replace(/^\//, '')
	if (basePath) {
		const withoutLeading = basePath.replace(/^\//, '')
		if (cleaned.startsWith(withoutLeading + '/')) cleaned = cleaned.replace(withoutLeading + '/', '')
	}

	const raw = `${basePath}/${cleaned}`
	const final = raw.replace(/\/{2,}/g, '/')
	try {
		return encodeURI(final)
	} catch (e) {
		return final
	}
}

export default resolveAssetPath
export { resolveAssetPath }


