export interface RssFeed {
  id: string
  url: string
  title: string | null
  description: string | null
  lastFetched: Date | null
  _count?: {
    articles: number
  }
}

export interface FeedMetaData {
  title: string
  description: string
  link: string
  imageUrl: string
  language: string
}
