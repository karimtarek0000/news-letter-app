import { saveGeneratedNewsletter } from '@/actions/saveGeneratedNewsletter'
import { GeneratedNewsletter, newsLetterSchema } from '@/validations'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const useNewsLetterGeneration = () => {
  const searchParams = useSearchParams()
  const feedIds = searchParams.get('feedIds')
  const hasStartedRef = useRef(false)

  let params: { feedIds: string[] } | null = null

  if (feedIds) {
    params = { feedIds: JSON.parse(feedIds) }
  }

  const { object, submit, isLoading } = useObject({
    api: '/api/newsletter/generate-stream',
    schema: newsLetterSchema,
    onFinish(event) {
      toast.success(`Newsletter generated sucessfuly`)
    },
  })

  const newsletter = object as GeneratedNewsletter

  const handleSaveNewsLetter = async () => {
    if (!params || !newsletter) return

    try {
      await saveGeneratedNewsletter({
        newsletter: newsletter as GeneratedNewsletter,
        feedIds: params.feedIds as string[],
      })

      toast.success('Newsletter saved to history')
    } catch (error) {
      toast.error('Failed to save newsletter')
    }
  }

  useEffect(() => {
    if (!params || hasStartedRef.current) return

    hasStartedRef.current = true

    submit(params)
  }, [params, submit])

  return { isLoading, newsletter, handleSaveNewsLetter }
}
