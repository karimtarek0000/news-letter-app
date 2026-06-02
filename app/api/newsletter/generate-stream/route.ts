import { generateNewsletterStream } from '@/actions/generate-newsletter'
import { newsLetterSchema } from '@/validations'
import { cohere } from '@ai-sdk/cohere'
import { Output, streamText } from 'ai'
import type { NextRequest } from 'next/server'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { feedIds } = body

    if (!feedIds || !Array.isArray(feedIds) || !feedIds.length) {
      return Response.json(
        { error: 'feedIds is required and must be a non-empty array' },
        { status: 400 },
      )
    }

    const prompt = await generateNewsletterStream(feedIds)

    const result = streamText({
      model: cohere('command-r-08-2024'),
      output: Output.object({ schema: newsLetterSchema }),
      prompt,
      onFinish: async () => {},
    })

    return result.toTextStreamResponse()
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return Response.json(
      { error: `Failed to generate newsletter: ${errorMessage}` },
      { status: 500 },
    )
  }
}
