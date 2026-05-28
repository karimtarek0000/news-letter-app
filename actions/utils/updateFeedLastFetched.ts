'use server'

import { prisma } from '@/lib/prisma'

export async function updateFeedLastFetched(feedId: string) {
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
