interface FeedExceedLimitProps {
  isPro: boolean
  currentFeedCount: number
  feedLimit: number
}

const FeedExceedLimit = ({ isPro, currentFeedCount, feedLimit }: FeedExceedLimitProps) => {
  const isExceeded = !isPro && currentFeedCount >= feedLimit

  return (
    isExceeded && (
      <p className="text-red-500 text-sm mt-2">
        You reached the limit for free plan. Upgrade to add more!
      </p>
    )
  )
}

export default FeedExceedLimit
