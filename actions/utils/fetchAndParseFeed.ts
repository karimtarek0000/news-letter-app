'use server'

import { extractArticles } from './extractArticles'
import { extractFeedMetaData } from './extractFeedMetaData'
import { parseFeedURL } from './parseFeedURL'

// Finaly fetch the feed
export async function fetchAndParseFeed(URL: string, feedId: string) {
  try {
    const feed = await parseFeedURL(URL)

    const metadata = extractFeedMetaData(feed)
    const articles = extractArticles(feed, feedId)

    return {
      metadata,
      articles,
      itemCount: feed.items.length,
    }
  } catch (error) {
    console.log('Failed to fetch and parse feed.', error)
    throw new Error('Failed to fetch and parse feed.')
  }
}
