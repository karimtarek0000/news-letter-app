import { z } from 'zod'

export const newsLetterSchema = z.object({
  suggestedTitles: z.array(z.string()).length(5),
  suggestedSubjectLines: z.array(z.string()).length(5),
  body: z.string(),
})

export type GeneratedNewsletter = z.infer<typeof newsLetterSchema>
