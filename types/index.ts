import type { UserSettings } from '@/lib/generated/prisma'

export * from './rss-feeds.type'
/**
 * Data required to create an RSS article
 */
export interface ArticleCreateData {
  feedId: string
  guid: string
  title: string
  link: string
  content?: string
  summary?: string
  pubDate: Date
  author?: string
  categories?: string[]
  imageUrl?: string
}

/**
 * Result of bulk article creation operation
 */
export interface BulkOperationResult {
  created: number
  skipped: number
  errors: number
}

/**
 * Feed metadata extracted from RSS feed
 */
export interface FeedMetadata {
  title: string
  description?: string
  link?: string
  imageUrl?: string
  language?: string
}

/**
 * Article data extracted from RSS feed item
 */
export interface ArticleData {
  guid: string
  title: string
  link: string
  content?: string
  summary?: string
  pubDate: Date
  author?: string
  categories: string[]
  imageUrl?: string
}

/**
 * Parameters for feed preparation
 */
export interface ArticleForPrompt {
  title: string
  feed: { title: string | null }
  pubDate: Date
  summary?: string | null
  content?: string | null
  link: string
}

export interface NewsletterPromptParams {
  articleSummaries: string
  articleCount: number

  settings?: UserSettings | null
}
