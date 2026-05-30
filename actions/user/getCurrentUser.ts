'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

async function getUserByClerkId(clerkUserId: string) {
  try {
    return await prisma.user.findUnique({
      where: { clerkUserId },
    })
  } catch {
    throw new Error('This user not found')
  }
}

export async function getCurrentUser() {
  try {
    const { userId } = await auth()

    if (!userId) {
      throw new Error('User not exist')
    }

    const user = await getUserByClerkId(userId)

    if (!user) {
      throw new Error('User not found in database')
    }

    return user
  } catch (error) {
    throw new Error(error.message)
  }
}
