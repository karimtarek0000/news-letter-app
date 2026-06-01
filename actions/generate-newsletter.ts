'use server'

import { buildNewsletterPrompt } from './buildNewletterPrompt'
import { prepareFeedsAndArticles } from './rss-feed'
import { getCurrentUser } from './user/getCurrentUser'
import { getUserSettingsByUserId } from './user/getUserSettingsByUserId'
import { buildArticleSummaries } from './utils/buildArticlesSummaries'

export async function generateNewsletterStream(feedIds: string[]) {
  try {
    const user = await getCurrentUser()
    const settings = await getUserSettingsByUserId(user?.id as string)
    const articles = await prepareFeedsAndArticles(feedIds)
    const articleSummaries = buildArticleSummaries(articles)

    // Ai
    const prompt = buildNewsletterPrompt({
      articleSummaries,
      articleCount: articles.length,
      settings,
    })

    return prompt
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(errorMessage)
  }
}
