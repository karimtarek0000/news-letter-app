import { Output, streamText } from 'ai'
import type { NextRequest } from 'next/server'
import { z } from 'zod'
import { buildNewsletterPrompt } from '@/actions/buildNewletterPrompt'
import { prepareFeedsAndArticles } from '@/actions/rss-feed'
import { getCurrentUser } from '@/actions/user/getCurrentUser'
import { getUserSettingsByUserId } from '@/actions/user/getUserSettingsByUserId'
import { buildArticleSummaries } from '@/actions/utils/buildArticlesSummaries'

export const maxDuration = 300 // 5 minutes for Vercel Pro

/**
 * Newsletter generation result schema
 */
const NewsletterSchema = z.object({
  suggestedTitles: z.array(z.string()).length(5),
  suggestedSubjectLines: z.array(z.string()).length(5),
  body: z.string(),
  // topAnnouncements: z.array(z.string()).length(5),
  // additionalInfo: z.string().optional(),
})

/**
 * POST /api/newsletter/generate-stream
 *
 * Streams newsletter generation in real-time using Vercel AI SDK.
 * The AI SDK handles all streaming complexity automatically.
 *
 * @returns AI SDK text stream response
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { feedIds } = body

    // Validate required parameters
    if (!feedIds || !Array.isArray(feedIds) || feedIds.length === 0) {
      return Response.json(
        { error: 'feedIds is required and must be a non-empty array' },
        { status: 400 },
      )
    }

    // Get authenticated user and settings
    const user = await getCurrentUser()
    const settings = await getUserSettingsByUserId(user?.id as string)
    const articles = await prepareFeedsAndArticles(feedIds)

    // Build the AI prompt
    const articleSummaries = buildArticleSummaries(articles)
    const prompt = buildNewsletterPrompt({
      articleSummaries,
      articleCount: articles.length,
      settings,
    })

    // Stream newsletter generation with AI SDK
    // const result = streamObject({
    //   model: openai('gpt-4o'),
    //   schema: NewsletterSchema,
    //   prompt,
    //   onFinish: async () => {
    //     // Optional: Add any post-generation logic here
    //   },
    // })
    // const result = streamText({
    //   model: openai('gpt-4o'),
    //   output: Output.object({ schema: NewsletterSchema }),
    //   prompt,
    //   onFinish: async () => {
    //     // Optional: Add any post-generation logic here
    //   },
    // })

    // Return AI SDK's native stream response
    // return result.toTextStreamResponse()
    //  return NextResponse.json({
    //    ok: true,
    //    message: 'Done',
    //    data: prompt,
    //  })
  } catch (error) {
    console.error('Error in generate-stream:', error)

    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return Response.json(
      { error: `Failed to generate newsletter: ${errorMessage}` },
      { status: 500 },
    )
  }
}
