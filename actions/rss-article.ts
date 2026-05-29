'use server'

import { prisma } from '@/lib/prisma'
import type { ArticleCreateData } from '@/types'

export async function bulkCreateRssArticles(articles: ArticleCreateData[]) {
  const results = await Promise.allSettled(articles.map(article => createRssArticle(article)))

  let created = 0
  let skipped = 0
  let errors = 0

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      created++
    } else {
      const error = result.reason
      if (error?.code === 'P2002') {
        skipped++
      } else {
        errors++
        console.error('Error creating article:', articles[index].guid, error)
      }
    }
  })

  return { created, skipped, errors }
}

export async function createRssArticle(data: ArticleCreateData) {
  try {
    // 1. Check if the article exist
    const existing = await prisma.rssArticle.findUnique({
      where: { guid: data.guid },
      select: { id: true, sourceFeedIds: true },
    })

    // 2. If article exist
    if (existing) {
      // 2.1 Article not exist in sourceFeedIds will add the id in sourceFeedIds
      if (!existing.sourceFeedIds.includes(data.feedId)) {
        return await prisma.rssArticle.update({
          where: { guid: data.guid },
          data: {
            sourceFeedIds: {
              push: data.feedId,
            },
          },
        })
      }

      // 2.3 Article exist will return it
      return await prisma.rssArticle.findUnique({
        where: { guid: data.guid },
      })
    }

    // 3. Create an article
    return await prisma.rssArticle.create({
      data: {
        feedId: data.feedId,
        guid: data.guid,
        sourceFeedIds: [data.feedId],
        title: data.title,
        link: data.link,
        content: data.content,
        pubDate: data.pubDate,
        author: data.author,
        categories: data.categories || [],
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
  }
}
