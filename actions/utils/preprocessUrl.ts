export function preprocessUrl(url: string): string {
  let processedUrl = url.trim()

  // Add https:// if no protocol specified
  if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://')) {
    processedUrl = `https://${processedUrl}`
  }

  return processedUrl
}
