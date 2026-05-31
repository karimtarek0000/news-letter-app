const SkeletonBlock = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} />
)

const FeedItemSkeleton = ({ descriptionLines = 2 }: { descriptionLines?: number }) => (
  <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
    <div className="flex items-center justify-between mb-2">
      <SkeletonBlock className="h-4 w-36" />
      <SkeletonBlock className="h-4 w-4 rounded" />
    </div>

    <SkeletonBlock className="h-3 w-64 mb-2.5" />

    {Array.from({ length: descriptionLines }).map((_, i) => (
      <SkeletonBlock
        key={i}
        className={`h-3 mb-2 ${i === descriptionLines - 1 ? 'w-3/4' : 'w-full'}`}
      />
    ))}

    <div className="flex items-center gap-4 mt-1">
      <SkeletonBlock className="h-3 w-16" />
      <SkeletonBlock className="h-3 w-32" />
    </div>
  </div>
)

export default function RssNewsletterSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Left panel — RSS Feeds */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="space-y-2">
            <SkeletonBlock className="h-5 w-28" />
            <SkeletonBlock className="h-3 w-44" />
          </div>
          <SkeletonBlock className="h-9 w-24 rounded-lg" />
        </div>

        {/* Feed items */}
        <div className="space-y-3">
          <FeedItemSkeleton descriptionLines={1} />
          <FeedItemSkeleton descriptionLines={3} />
        </div>
      </div>

      {/* Right panel — Generate Newsletter */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
        {/* Title */}
        <SkeletonBlock className="h-6 w-44 mb-5" />

        {/* Select Feeds header row */}
        <div className="flex items-center justify-between mb-3">
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-20" />
        </div>

        {/* Checkbox list */}
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 space-y-3 mb-4">
          <div className="flex items-center gap-2.5">
            <SkeletonBlock className="h-4 w-4 shrink-0 rounded" />
            <SkeletonBlock className="h-3.5 w-64" />
          </div>
          <div className="flex items-center gap-2.5">
            <SkeletonBlock className="h-4 w-4 shrink-0 rounded" />
            <SkeletonBlock className="h-3.5 w-48" />
          </div>
        </div>

        {/* "N of N feeds selected" */}
        <div className="flex justify-center mb-4">
          <SkeletonBlock className="h-3 w-32" />
        </div>

        {/* Generate button */}
        <div className="flex justify-center">
          <SkeletonBlock className="h-10 w-44 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
