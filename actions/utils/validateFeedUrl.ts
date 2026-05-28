'use server'
import Parser from 'rss-parser'

const parser = new Parser()

// Validate on the url to make sure the URL valid
export async function validateFeedUrl(URL: string): Promise<boolean> {
  try {
    await parser.parseURL(URL)
    return true
  } catch {
    throw new Error('The URL is not valid.')
  }
}
