export function normalizeCategories(rawCategories: RssCategory[] | undefined): string[] {
  if (!Array.isArray(rawCategories)) {
    return []
  }

  return rawCategories
    .map(cat => {
      if (typeof cat === 'string') {
        return cat.trim()
      }

      if (typeof cat === 'object' && cat !== null && typeof cat._ === 'string') {
        return cat._.trim()
      }

      return ''
    })
    .filter(cat => cat.length > 0)
}
