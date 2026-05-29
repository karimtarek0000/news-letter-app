'use client'

import { RefreshCw } from 'lucide-react'
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
import { useFeedDialog } from '@/hooks/feedDialog'
import FeedExceedLimit from './FeedExceedLimit'
import FeedForm from './FeedForm'
import FeedRemaining from './FeedRemaining'

interface AddFeedDialogProps {
  currentFeedCount: number
  feedLimit: number
  isPro: boolean
}

export default function AddFeedDialog({ currentFeedCount, feedLimit, isPro }: AddFeedDialogProps) {
  const { isAdding, open, setOpen, setNewFeedUrl, handleAddFeed } = useFeedDialog(
    currentFeedCount,
    feedLimit,
    isPro,
  )

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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new RSS Feed</DialogTitle>
        </DialogHeader>

        <FeedRemaining currentFeedCount={currentFeedCount} feedLimit={feedLimit} />

        <FeedExceedLimit isPro={isPro} currentFeedCount={currentFeedCount} feedLimit={feedLimit} />

        <FeedForm setNewFeedUrl={setNewFeedUrl} handleAddFeed={handleAddFeed}>
          <DialogFooter className="flex *:flex-1 justify-between">
            <DialogClose asChild>
              <Button variant="outline" disabled={isAdding}>
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isAdding}>
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
        </FeedForm>
      </DialogContent>
    </Dialog>
  )
}
