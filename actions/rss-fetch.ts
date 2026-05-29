'use server'

import Parser from 'rss-parser'
import { prisma } from '@/lib/prisma'
import type { ArticleData, FeedMetadata, RssFeed } from '@/types'
import { bulkCreateRssArticles } from './rss-article'
import { normalizeCategories, preprocessUrl } from './utils'

const parser = new Parser()

// Validate on the url to make sure the URL valid
async function validateFeedUrl(URL: string): Promise<boolean> {
  try {
    await parser.parseURL(URL)
    return true
  } catch {
    throw new Error('The URL is not valid.')
  }
}

// Getting the feed as object
async function parseFeedURL(URL: string) {
  try {
    return await parser.parseURL(URL)
  } catch (error) {
    throw new Error(` ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

async function prepareArticlesAndMetaData(feed: RssFeed) {
  try {
    const result = await fetchAndStoreFeed(feed.id)

    if (result?.success && result?.metadata) {
      await prisma.rssFeed.update({
        where: { id: feed.id },
        data: {
          title: result.metadata.title,
          description: result.metadata.description,
          link: result.metadata.link,
          imageUrl: result.metadata.imageUrl,
          language: result.metadata.language,
        },
      })
    }

    return {
      success: true,
      feed,
      articlesCreated: result?.created || 0,
      articlesSkipped: result?.skipped || 0,
    }
  } catch {
    throw {
      success: true,
      feed,
      articlesCreated: 0,
      articlesSkipped: 0,
      warning: 'Feed added but initial fetch failed. It will be updated on the next refresh.',
    }
  }
}

async function fetchAndStoreFeed(feedId: string) {
  try {
    // 1. Get feed info from database
    const feed = await prisma.rssFeed.findUnique({
      where: { id: feedId },
    })

    if (!feed) {
      throw new Error(`Feed with ID ${feedId} not found`)
    }

    // 2. Fetch and parse RSS feed convert from XML TO JSON
    const { metadata, articles } = await fetchAndParseFeed(feed.url, feedId)

    // 3. Prepare articles for database
    const articlesToCreate = articles.map((article: ArticleData) => ({
      feedId: feed.id,
      guid: article.guid,
      title: article.title,
      link: article.link,
      content: article.content,
      summary: article.summary,
      pubDate: article.pubDate,
      author: article.author,
      categories: article.categories,
      imageUrl: article.imageUrl,
    }))

    // 4. Store new articles (avoiding duplicates)
    const result = await bulkCreateRssArticles(articlesToCreate)

    // 5. Update last fetched time
    await updateFeedLastFetched(feedId)

    return {
      success: true,
      metadata,
      created: result.created,
      skipped: result.skipped,
      errors: result.errors,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Failed to process RSS feed',
      }
    }
  }
}

async function updateFeedLastFetched(feedId: string) {
  try {
    return await prisma.rssFeed.update({
      where: {
        id: feedId,
      },
      data: {
        lastFetched: new Date(),
      },
    })
  } catch (error) {
    console.log('Failed to update feed lastFetched', error)
    throw error
  }
}

function extractFeedMetadata(feed: Parser.Output<unknown>): FeedMetadata {
  const feedAny = feed as any
  return {
    title: feed.title || 'Untitled Feed',
    description: feed.description,
    link: feed.link,
    imageUrl: feed.image?.url || feedAny.itunes?.image,
    language: feedAny.language,
  }
}

function extractArticles(feed: Parser.Output<unknown>, feedId: string): ArticleData[] {
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

// Gathring all data (metadata + articles)
async function fetchAndParseFeed(URL: string, feedId: string) {
  try {
    const feed = await parseFeedURL(URL)

    const metadata = extractFeedMetadata(feed)
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

export async function validateAndAddFeed(userId: string, url: string) {
  try {
    // 1. Preprocess URL
    const processedUrl = preprocessUrl(url)

    // 2. Validate RSS URL
    await validateFeedUrl(processedUrl)

    // 3. Check if feed already exists for this user
    const existingFeed = await prisma.rssFeed.findFirst({
      where: {
        userId,
        url: processedUrl,
      },
    })

    if (existingFeed) {
      throw new Error('This feed has already been added to your account.')
    }

    // 4. Create Feed in DB
    const feed = await prisma.rssFeed.create({
      data: {
        userId,
        url: processedUrl,
      },
    })

    if (!feed.id) {
      throw new Error('The feed not created try again add new one.')
    }

    // 5. Try fetching initial articles + metadata
    return await prepareArticlesAndMetaData(feed)
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Failed to add RSS feed. Please try again.',
      }
    }
  }
}
