'use client'

import { deleteRssFeed } from '@/actions/rss-feed'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useTransition } from 'react'
import { toast } from 'sonner'
import { DialogContext } from '../dialog/DialogControl'

export default function ConfirmDeleteFeed() {
  const { isOpen, data: feedId, openAndCloseModal } = useContext(DialogContext)

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteRssFeed(feedId as string)
        openAndCloseModal(false)
        toast.success('Feed deleted successfully')
        router.refresh()
      } catch (error) {
        console.error('Failed to delete feed:', error)
        toast.error('Failed to delete feed')
      }
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={val => {
        if (isPending) return
        openAndCloseModal(val)
      }}
    >
      <DialogContent className="top-[1%] translate-y-0 text-center">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">Confirm for delete RSS Feed</DialogTitle>
        </DialogHeader>

        <DialogDescription>Are you sure you want to delete this RSS feed?</DialogDescription>

        <DialogFooter className="flex *:flex-1 justify-between">
          <DialogClose asChild>
            <Button variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </DialogClose>

          <Button disabled={isPending} onClick={handleDelete} variant="destructive">
            {isPending ? (
              <>
                <Trash2 className="h-4 w-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete Feed'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
