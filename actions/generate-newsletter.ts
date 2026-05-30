'use server'

import { buildNewsletterPrompt } from './buildNewletterPrompt'
import { prepareFeedsAndArticles } from './rss-feed'
import { getCurrentUser } from './user/getCurrentUser'
import { getUserSettingsByUserId } from './user/getUserSettingsByUserId'
import { buildArticleSummaries } from './utils/buildArticlesSummaries'

export async function generateNewsletterStream(params: { feedIds: string[] }) {
  try {
    const user = await getCurrentUser()
    const settings = await getUserSettingsByUserId(user?.id as string)
    const articles = await prepareFeedsAndArticles(params.feedIds)
    const articleSummaries = buildArticleSummaries(articles)

    // Ai
    const prompt = buildNewsletterPrompt({
      articleSummaries,
      articleCount: articles.length,
      settings,
    })

    return prompt
  } catch (error) {
    throw new Error(error.message)
  }
}
