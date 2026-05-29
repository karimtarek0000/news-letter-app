'use client'

import { useAuth } from '@clerk/nextjs'
import { RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { createOrUpdateUser } from '@/actions/createOrUpdateUser'
import { validateAndAddFeed } from '@/actions/rss-fetch'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddFeedDialogProps {
  currentFeedCount: number
  feedLimit: number
  isPro: boolean
}

export default function AddFeedDialog({ currentFeedCount, feedLimit, isPro }: AddFeedDialogProps) {
  const { userId } = useAuth()
  const router = useRouter()

  const [newFeedUrl, setNewFeedUrl] = useState('')
  const [open, setOpen] = useState(false)
  const [isAdding, startTransition] = useTransition()

  const handleAddFeed = async () => {
    if (!newFeedUrl.trim()) {
      toast.error('Please enter a valid URL')
      return
    }

    if (currentFeedCount >= feedLimit) {
      toast.error(
        isPro
          ? 'Feed limit reached'
          : 'Starter plan limited to 3 feeds. Upgrade to Pro for unlimited feeds.',
      )
      return
    }

    startTransition(async () => {
      try {
        const user = await createOrUpdateUser(userId as string)
        const result = await validateAndAddFeed(user.id, newFeedUrl.trim())

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

  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        if (isAdding) return
        setOpen(val)
      }}
    >
      <DialogTrigger
        className="bg-linear-to-r from-emerald-500 to-emerald-600  text-white p-2 rounded-md"
        disabled={isAdding}
      >
        Add Feed
      </DialogTrigger>

      <DialogContent
        onInteractOutside={e => {
          if (isAdding) e.preventDefault()
        }}
        onEscapeKeyDown={e => {
          if (isAdding) e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Add a new RSS Feed</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Current feeds: {currentFeedCount}/{feedLimit}
        </p>

        {!isPro && currentFeedCount >= feedLimit && (
          <p className="text-red-500 text-sm mt-2">
            You reached the limit for free plan. Upgrade to add more!
          </p>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="feed-url">RSS Feed URL</Label>
            <Input
              id="feed-url"
              type="text"
              placeholder="example.com/feed.xml or https://example.com/feed.xml"
              onChange={e => setNewFeedUrl(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleAddFeed()
                }
              }}
            />
          </div>
        </div>

        <DialogFooter className="flex *:flex-1 justify-between">
          <DialogClose asChild>
            <Button variant="outline" disabled={isAdding}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleAddFeed} disabled={isAdding}>
            {isAdding ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              'Add Feed'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
