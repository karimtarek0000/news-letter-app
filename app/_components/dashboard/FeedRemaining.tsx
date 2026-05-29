const FeedRemaining = ({
  currentFeedCount,
  feedLimit,
}: {
  currentFeedCount: number
  feedLimit: number
}) => {
  return (
    <p className="text-sm text-muted-foreground">
      Current feeds: {currentFeedCount}/{feedLimit}
    </p>
  )
}

export default FeedRemaining
