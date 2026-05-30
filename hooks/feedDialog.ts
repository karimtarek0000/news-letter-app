import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { validateAndAddFeed } from '@/actions/rss-fetch'
import { createOrUpdateUser } from '@/actions/user/user'

export const useFeedDialog = (currentFeedCount: number, feedLimit: number, isPro: boolean) => {
  const { userId } = useAuth()
  const router = useRouter()

  const [newFeedUrl, setNewFeedUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [isAdding, startTransition] = useTransition()

  const validationForURL = () => {
    let status = true
    if (!newFeedUrl.trim()) {
      toast.error('Please enter a valid URL')
      status = false
    }
    return status
  }

  const validationForexceedLimit = () => {
    let status = true
    if (currentFeedCount >= feedLimit) {
      toast.error(
        isPro
          ? 'Feed limit reached'
          : 'Starter plan limited to 3 feeds. Upgrade to Pro for unlimited feeds.',
      )
      status = false
    }
    return status
  }

  const createNewFeed = () => {
    return startTransition(async () => {
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

  const handleAddFeed = () => {
    const isValid = validationForURL()
    const isNotExceed = validationForexceedLimit()
    if (isValid && isNotExceed) {
      createNewFeed()
    }
  }

  return { isAdding, open, newFeedUrl, setOpen, setNewFeedUrl, handleAddFeed }
}
