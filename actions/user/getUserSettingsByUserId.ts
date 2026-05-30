'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export interface UserSettingsInput {
  // Basic Settings
  newsletterName?: string | null
  description?: string | null
  targetAudience?: string | null
  defaultTone?: string | null

  // Branding
  companyName?: string | null
  industry?: string | null

  // Additional Information
  disclaimerText?: string | null
  senderName?: string | null
  senderEmail?: string | null
}

/**
 * Fetch settings for the authenticated user
 */
export async function getCurrentUserSettings() {
  try {
    const { userId } = await auth()
    if (!userId) throw new Error('User not authenticated')

    const settings = await prisma.userSettings.findFirst({
      where: {
        user: { clerkUserId: userId },
      },
    })

    return settings
  } catch (error) {
    console.error('Failed to fetch user settings:', error)
    throw new Error('Failed to fetch user settings')
  }
}

/**
 * Fetch settings by internal DB userId
 */
export async function getUserSettingsByUserId(userId: string) {
  try {
    const settings = await prisma.userSettings.findUnique({
      where: { userId },
    })

    return settings
  } catch (error) {
    console.error('Failed to fetch settings by userId:', error)
    throw new Error('Failed to fetch user settings')
  }
}

/**
 * Create or update settings for current user
 */
export async function upsertUserSettings(data: UserSettingsInput) {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) throw new Error('User not authenticated')

    // Get DB user
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    })

    if (!user) throw new Error('User not found in database')

    // Check if settings exist
    const existing = await prisma.userSettings.findUnique({
      where: { userId: user.id },
    })

    let settings

    if (existing) {
      // Update settings
      settings = await prisma.userSettings.update({
        where: { userId: user.id },
        data: {
          newsletterName: data.newsletterName,
          description: data.description,
          targetAudience: data.targetAudience,
          defaultTone: data.defaultTone,
          companyName: data.companyName,
          industry: data.industry,
          disclaimerText: data.disclaimerText,
          senderName: data.senderName,
          senderEmail: data.senderEmail,
        },
      })
    } else {
      // Create settings
      settings = await prisma.userSettings.create({
        data: {
          userId: user.id,
          newsletterName: data.newsletterName,
          description: data.description,
          targetAudience: data.targetAudience,
          defaultTone: data.defaultTone,
          companyName: data.companyName,
          industry: data.industry,
          disclaimerText: data.disclaimerText,
          senderName: data.senderName,
          senderEmail: data.senderEmail,
        },
      })
    }

    return settings
  } catch (error) {
    console.error('Failed to upsert user settings:', error)
    throw new Error('Failed to save user settings')
  }
}

/**
 * Deletes settings for authenticated user
 */
export async function deleteUserSettings(): Promise<void> {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) throw new Error('User not authenticated')

    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    })
    if (!user) throw new Error('User not found in database')

    await prisma.userSettings.deleteMany({
      where: { userId: user.id },
    })
  } catch (error) {
    console.error('Failed to delete user settings:', error)
    throw new Error('Failed to delete user settings')
  }
}
