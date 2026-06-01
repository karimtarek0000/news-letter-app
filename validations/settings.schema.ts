import { z } from 'zod'

export const settings = {
  setting: [
    {
      name: 'newsletterName',
      type: 'text',
      label: 'Newsletter Name',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'targetAudience',
      type: 'text',
      label: 'Target Audience',
    },
    {
      name: 'defaultTone',
      type: 'text',
      label: 'Default Tone',
    },
  ],
  branding: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
    },
    {
      name: 'industry',
      type: 'text',
      label: 'Industry',
    },
  ],
  info: [
    {
      name: 'disclaimerText',
      type: 'textarea',
      label: 'Disclaimer Text',
    },
    {
      name: 'senderName',
      type: 'text',
      label: 'Sender Name',
    },
    {
      name: 'senderEmail',
      type: 'email',
      label: 'Sender Email',
    },
  ],
}

export const SettingsSchema = z.object({
  newsletterName: z.string().optional(),
  description: z.string().optional(),
  targetAudience: z.string().optional(),
  defaultTone: z.string().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
  disclaimerText: z.string().optional(),
  senderName: z.string().optional(),
  senderEmail: z
    .string()
    .optional()
    .refine(val => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Invalid email address',
    }),
})
