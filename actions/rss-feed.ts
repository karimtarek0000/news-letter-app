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
