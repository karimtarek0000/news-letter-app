import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { createOrUpdateUser } from '@/actions/createOrUpdateUser'
import { validateAndAddFeed } from '@/actions/rss-fetch'

export const useFeedDialog = (currentFeedCount: number, feedLimit: number, isPro: boolean) => {
  const { userId } = useAuth()
  const router = useRouter()

  const [newFeedUrl, setNewFeedUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [isAdding, startTransition] = useTransition()

  const validationForURL = () => {
    if (!newFeedUrl.trim()) {
      toast.error('Please enter a valid URL')
      return
    }
  }

  const validationForexceedLimit = () => {
    if (currentFeedCount >= feedLimit) {
      toast.error(
        isPro
          ? 'Feed limit reached'
          : 'Starter plan limited to 3 feeds. Upgrade to Pro for unlimited feeds.',
      )
      return
    }
  }

  const createNewFeed = async () => {
    startTransition(async () => {
      try {
        const user = await createOrUpdateUser(userId as string)
        const result = await validateAndAddFeed(user?.id as string, newFeedUrl.trim())

        if (result?.success) {
          toast.success('Feed added successfully ✅')
          router.refresh()
          setNewFeedUrl('')
          setOpen(false)
        } else {
          toast.error(result?.error)
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    })
  }

  const handleAddFeed = async () => {
    validationForURL()
    validationForexceedLimit()
    createNewFeed()
  }

  return { isAdding, open, setOpen, setNewFeedUrl, handleAddFeed }
}
