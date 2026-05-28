'use server'

import type Parser from 'rss-parser'

import type { FeedMetaData } from '@/types'

// Extract all metadata from the feed
export function extractFeedMetaData(feed: Parser.Output<unknown>): FeedMetaData {
  const feedData = feed as any

  return {
    title: feedData.title,
    description: feedData.description,
    link: feedData.link as string,
    imageUrl: feedData.image?.url,
    language: feedData.language,
  }
}
