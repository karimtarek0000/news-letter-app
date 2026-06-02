import { Sparkles } from 'lucide-react'

const NewletterGenerateSkeleton = () => {
  return (
    <div className="flex items-center gap-2 text-base mb-5">
      <div className="inline-flex size-8 items-center justify-center rounded-md bg-linear-to-br from-emerald-600 to-emerald-600 text-white animate-pulse">
        <Sparkles className="h-4 w-4" />
      </div>
      <span className="font-medium">generate newsletter...</span>
    </div>
  )
}

export default NewletterGenerateSkeleton
