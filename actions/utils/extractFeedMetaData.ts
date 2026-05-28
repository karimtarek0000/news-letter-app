import type Parser from 'rss-parser'

import type { FeedMetadata } from '@/types'

// Extract all metadata from the feed
export function extractFeedMetadata(feed: Parser.Output<unknown>): FeedMetadata {
  const feedAny = feed as any
  return {
    title: feed.title || 'Untitled Feed',
    description: feed.description,
    link: feed.link,
    imageUrl: feed.image?.url || feedAny.itunes?.image,
    language: feedAny.language,
  }
}
