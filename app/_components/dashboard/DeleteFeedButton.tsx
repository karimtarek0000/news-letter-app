'use client'

import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useContext } from 'react'
import { DialogContext } from '../dialog/DialogControl'

interface DeleteFeedButtonProps {
  feedId: string
}

function DeleteFeedButton({ feedId }: DeleteFeedButtonProps) {
  const { setNewData, openAndCloseModal } = useContext(DialogContext)

  const handleDelete = () => {
    openAndCloseModal(true)
    setNewData(feedId)
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
