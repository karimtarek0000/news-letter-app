'use server'

import { prisma } from '@/lib/prisma'
import type { ArticleData } from '@/types'
import { fetchAndParseFeed, preprocessUrl, updateFeedLastFetched, validateFeedUrl } from './utils'
import { bulkCreateRssArticles } from './utils/bulkCreateRssArticles'

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
      return {
        success: true,
        feed,
        articlesCreated: 0,
        articlesSkipped: 0,
        warning: 'Feed added but initial fetch failed. It will be updated on the next refresh.',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message || 'Failed to add RSS feed. Please try again.',
      }
    }
  }
}

export async function fetchAndStoreFeed(feedId: string) {
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
