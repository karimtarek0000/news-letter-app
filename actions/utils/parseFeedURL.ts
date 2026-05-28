'use server'
import Parser from 'rss-parser'

const parser = new Parser()

// Transform data from XML to JSON
export async function parseFeedURL(URL: string) {
  try {
    return await parser.parseURL(URL)
  } catch (error) {
    throw new Error(` ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
