'use server'

import { prisma } from '@/lib/prisma'
import type { GeneratedNewsletter } from '@/validations'
import { getCurrentUser } from './user/getCurrentUser'

export async function createNewsletter(data: {
  userId: string
  suggestedTitles: string[]
  suggestedSubjectLines: string[]
  body: string
  feedsUsed: string[]
}) {
  try {
    const newsletter = await prisma.newsletter.create({
      data: {
        userId: data.userId,
        suggestedTitles: data.suggestedTitles,
        suggestedSubjectLines: data.suggestedSubjectLines,
        body: data.body,
        feedsUsed: data.feedsUsed,
      },
    })

    return newsletter
  } catch (error) {
    console.error('Failed to create newsletter:', error)
    throw new Error('Failed to create newsletter')
  }
}

export async function saveGeneratedNewsletter(params: {
  newsletter: GeneratedNewsletter
  feedIds: string[]
}) {
  // Get authenticated user
  const user = await getCurrentUser()

  // Save newsletter to database
  const savedNewsletter = await createNewsletter({
    userId: user?.id as string,
    suggestedTitles: params.newsletter.suggestedTitles,
    suggestedSubjectLines: params.newsletter.suggestedSubjectLines,
    body: params.newsletter.body,
    feedsUsed: params.feedIds,
  })

  return savedNewsletter
}
