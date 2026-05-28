import type Parser from 'rss-parser'
import type { ArticleData } from '@/types'
import { normalizeCategories } from './normalizeCategories'

// Extract all articles from the feed
export function extractArticles(feed: Parser.Output<unknown>, feedId: string): ArticleData[] {
  return feed.items?.map(item => {
    const itemAny = item as any

    // Use guid if available, fallback to link for deduplication
    const guid = item.guid || item.link || `${feedId}-${item.title}-${Date.now()}`

    // Extract publication date with fallbacks
    const pubDate = item.isoDate
      ? new Date(item.isoDate)
      : item.pubDate
        ? new Date(item.pubDate)
        : new Date()

    // Extract content - try various common RSS fields
    const content =
      item.content || itemAny['content:encoded'] || itemAny.description || itemAny.summary

    // Extract summary - prefer contentSnippet over description
    const summary = item.contentSnippet || itemAny.description || itemAny.summary

    // Extract author - try various common RSS fields
    const author = item.creator || itemAny.author || itemAny['dc:creator']

    // Normalize categories
    const rawCategories = (item.categories || itemAny.category || []) as RssCategory[]

    const categories = normalizeCategories(rawCategories)

    // Extract image from enclosure or media fields
    let imageUrl: string | undefined
    if (item.enclosure?.url && item.enclosure?.type?.startsWith('image/')) {
      imageUrl = item.enclosure.url
    } else if (itemAny['media:content']?.url) {
      imageUrl = itemAny['media:content'].url
    } else if (itemAny['media:thumbnail']?.url) {
      imageUrl = itemAny['media:thumbnail'].url
    }

    return {
      guid,
      title: item.title || 'Untitled',
      link: item.link || '',
      content,
      summary,
      pubDate,
      author,
      categories,
      imageUrl,
    }
  })
}
