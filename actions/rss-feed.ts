'use server'

import { prisma } from '@/lib/prisma'
import type { RssFeed } from '@/types'

export async function getRssFeedsByUserId(userId: string): Promise<RssFeed[]> {
  try {
    return await prisma.rssFeed.findMany({
      where: { userId },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    })
  } catch (error) {
    console.log('Failed to fetch RSS feeds', error)
    throw new Error('Failed to fetch RSS feeds')
  }
}

export async function deleteRssFeed(feedId: string) {
  try {
    // 1. Check if feed exists
    const feed = await prisma.rssFeed.findUnique({
      where: { id: feedId },
      include: {
        _count: {
          select: { articles: true },
        },
      },
    })

    if (!feed) {
      throw new Error('This feed not found')
    }

    // 2. Delete all articles associated with this feed
    const deletedArticles = await prisma.rssArticle.deleteMany({
      where: {
        feedId: feedId,
      },
    })

    // 3. Now delete the RSS Feed itself
    await prisma.rssFeed.delete({
      where: { id: feedId },
    })

    return {
      success: true,
      deletedArticles: deletedArticles.count,
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
  }
}
