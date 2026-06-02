'use client'

import { createContext, useState } from 'react'
import ConfirmDeleteFeed from '../dashboard/ConfirmDeleteFeed'

export const DialogContext = createContext<{
  isOpen: boolean
  data: string
  setNewData: (data: string) => void
  openAndCloseModal: (status: boolean) => void
}>({} as any)

const DialogControl = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<string>('')

  const setNewData = (data: string) => setData(data)
  const openAndCloseModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <DialogContext.Provider value={{ isOpen, data, setNewData, openAndCloseModal }}>
      {children}
      <ConfirmDeleteFeed />
    </DialogContext.Provider>
  )
}

export default DialogControl
