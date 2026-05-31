import { z } from 'zod'

export const newsLetterSchema = z.object({
  suggestedTitles: z.array(z.string()),
  suggestedSubjectLines: z.array(z.string()),
  body: z.string(),
})

export type GeneratedNewsletter = z.infer<typeof newsLetterSchema>
