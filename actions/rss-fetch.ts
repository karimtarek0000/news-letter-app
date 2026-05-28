'use server'

import { prisma } from '@/lib/prisma'
import { fetchAndParseFeed, preprocessUrl, validateFeedUrl } from './utils'

export async function validateAndAddFeed(userId: string, url: string) {
  try {
    // Preprocess URL
    const processedUrl = preprocessUrl(url)

    // 1) Validate RSS URL
    const isValid = await validateFeedUrl(processedUrl)

    if (!isValid) {
      throw new Error(
        'Invalid RSS feed URL or unable to fetch feed. Please check the URL and try again.',
      )
    }

    // 2) Check if feed already exists for this user
    const existingFeed = await prisma.rssFeed.findFirst({
      where: {
        userId,
        url: processedUrl,
      },
    })

    if (existingFeed) {
      return {
        success: false,
        error: 'This feed has already been added to your account.',
      }
    }

    // 3) Create Feed in DB
    const feed = await prisma.rssFeed.create({
      data: {
        userId,
        url: processedUrl,
      },
    })

    // 4) Try fetching initial articles + metadata
    try {
      const result = await fetchAndStoreFeed(feed.id)

      if (result.success && result.metadata) {
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
        articlesCreated: result.created || 0,
        articlesSkipped: result.skipped || 0,
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
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to add RSS feed. Please try again.',
    }
  }
}

export async function fetchAndStoreFeed(feedId: string) {
  try {
    // 1) Get feed info from database
    const feed = await prisma.rssFeed.findUnique({
      where: { id: feedId },
    })

    if (!feed) {
      throw new Error(`Feed with ID ${feedId} not found`)
    }

    // 2) Fetch and parse RSS feed convert from XML TO JSON
    const { metadata, articles } = await fetchAndParseFeed(feed.url, feedId)

    // console.log('✅ Feed parsed successfully, articles found:', articles.length)

    // 3) Prepare articles for database
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

    // 4) Store new articles (avoiding duplicates)
    const result = await bulkCreateRssArticles(articlesToCreate)

    // 5) Update last fetched time
    await updateFeedLastFetched(feedId)

    return {
      success: true,
      metadata,
      created: result.created,
      skipped: result.skipped,
      errors: result.errors,
    }
  } catch (error: any) {
    console.error('❌ Failed to fetch and store feed:', error)
    console.error('Error stack:', error.stack)

    return {
      success: false,
      error: error.message || 'Failed to process RSS feed',
    }
  }
}
