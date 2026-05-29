'use server'

import { prisma } from '@/lib/prisma'

export async function createOrUpdateUser(clerkUserId: string) {
  try {
    const userExist = await prisma.user.findUnique({
      where: { clerkUserId },
    })

    if (userExist) {
      return await prisma.user.update({
        where: { clerkUserId },
        data: {
          updatedAt: new Date(),
        },
      })
    }

    return await prisma.user.create({
      data: { clerkUserId },
    })
  } catch (error) {
    if (error instanceof Error) {
      throw {
        success: 400,
        message: error.message || 'Failed to create or update the user',
      }
    }
  }
}
