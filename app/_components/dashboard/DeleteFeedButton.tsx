'use client'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deleteRssFeed } from '@/actions/rss-feed'
import { Button } from '@/components/ui/button'

interface DeleteFeedButtonProps {
  feedId: string
  feedTitle: string
}

function DeleteFeedButton({ feedId, feedTitle }: DeleteFeedButtonProps) {
  const router = useRouter()
  const handleDelete = async () => {
    // Will change it letter
    if (!confirm(`Are you sure you want to delete ${feedTitle}`)) {
      return
    }

    try {
      await deleteRssFeed(feedId)
      toast.success('Feed deleted successfully')
      router.refresh()
    } catch (error) {
      console.error('Failed to delete feed:', error)
      toast.error('Failed to delete feed')
    }
  }

  return (
    <Button
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
      variant="ghost"
      size="icon"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

export default DeleteFeedButton
