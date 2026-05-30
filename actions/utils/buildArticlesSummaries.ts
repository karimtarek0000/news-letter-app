import type { ArticleForPrompt } from '@/types'

export function buildArticleSummaries(articles: ArticleForPrompt[]): string {
  return articles
    .map((article, index) => {
      const summary =
        article.summary || article.content?.substring(0, 200) || 'No summary available'

      return `
   ${index + 1}. "${article.title}"
   Source: ${article.feed.title}
   Published: ${article.pubDate.toLocaleDateString()}
   Summary: ${summary}
   Link: ${article.link}
`
    })
    .join('\n')
}
