import type { NextRequest } from 'next/server'
import { getCurrentUser } from '@/actions/user/getCurrentUser'

export const maxDuration = 60

// Force rebuild of types
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { feedIds } = body

    // Basic validation
    if (!feedIds || !Array.isArray(feedIds) || feedIds.length === 0) {
      return Response.json(
        { error: 'feedIds is required and must be a non-empty array' },
        { status: 400 },
      )
    }

    // Make sure user is authenticated
    await getCurrentUser()

    return Response.json({
      ok: true,
      message: 'Feeds received, ready for generation.',
      feedsCount: feedIds.length,
    })
  } catch (error) {
    console.error('Error in prepare:', error)
    return Response.json({ error: 'Failed to prepare newsletter.' }, { status: 500 })
  }
}
