import type { NewsletterPromptParams } from '@/types'

function buildSettingsContext(settings?: NewsletterPromptParams['settings']): string {
  if (!settings) return ''

  const lines: string[] = []
  const add = (label: string, value?: string | null) => {
    if (value) lines.push(`${label}: ${value}`)
  }

  // Basic settings
  add('Newsletter Name', settings.newsletterName)
  add('Description', settings.description)
  add('Target Audience', settings.targetAudience)
  add('Tone', settings.defaultTone)

  // Branding
  add('Company', settings.companyName)
  add('Industry', settings.industry)

  // Sender info
  add('Sender Name', settings.senderName)
  add('Sender Email', settings.senderEmail)

  // Disclaimer only
  if (settings.disclaimerText) {
    lines.push(`Required disclaimer text: "${settings.disclaimerText}"`)
  }

  return lines.length > 0 ? `SETTINGS:\n${lines.join('\n')}\n\n` : ''
}

// SETTINGS:
// Newsletter Name: Daily Tech Pulse
// Tone: Professional
// Company: OpenAI
// Sender Name: Walaa
// Required disclaimer text: "This is for educational use only"
/**
 * Newsletter body requirements (simplified)
 */
function buildBodyRequirements(params: NewsletterPromptParams): string[] {
  const requirements = [
    'Strong opening hook',
    'Use headings (##, ###) for structure',
    'Highlight key stories with context',
    'Group related stories thematically',
    'Use **bold** and *italics* for emphasis',
    'Include blockquotes (>) for key quotes',
    'Maintain professional, engaging tone',
    'End with a forward-looking conclusion',
  ]

  // Add disclaimer requirement if exists
  if (params.settings?.disclaimerText) {
    requirements.push(
      'Near the end, include the required disclaimer text naturally without labels such as "Disclaimer:"',
    )
  }

  return requirements
}

/**
 * Important notes to guide the AI
 */
function buildImportantNotes(params: NewsletterPromptParams): string[] {
  const notes = [
    'Use all newsletter settings above (tone, company information, sender name, etc.)',
    'Ensure content fits the target audience',
    'Follow the tone and brand voice described in the settings',
  ]

  if (params.settings?.disclaimerText) {
    notes.push('Include the required disclaimer text near the end without adding labels')
  }

  return notes
}

/**
 * FINAL NEWSLETTER PROMPT BUILDER (clean + simple)
 */
export function buildNewsletterPrompt(params: NewsletterPromptParams): string {
  const settingsContext = buildSettingsContext(params.settings)
  const bodyRequirements = buildBodyRequirements(params)
  const importantNotes = buildImportantNotes(params)

  const promptSections = [
    'You are an expert newsletter writer. Create a professional, engaging newsletter from these RSS articles.',
    '',
    settingsContext,

    `ARTICLES (${params.articleCount} total):`,
    params.articleSummaries,
    '',

    'Create a newsletter with:',
    '',
    '1. **5 Newsletter Titles**',
    '2. **5 Email Subject Lines**',
    '3. **Newsletter Body** (Markdown):',
    ...bodyRequirements.map(r => `   - ${r}`),
    '4. **5 Top Announcements**',
    '5. **Additional Information Section**',
    '',
    'IMPORTANT:',
    ...importantNotes.map(note => `- ${note}`),
    '',
    'Return response as structured JSON.',
  ]

  return promptSections.join('\n')
}
