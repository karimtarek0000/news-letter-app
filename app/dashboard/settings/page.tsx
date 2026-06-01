import FromSettings from '@/app/_components/dashboard/settings/FromSettings'

export default async function Page() {
  // ----------------------
  // Load user settings on mount
  // ----------------------
  //   useEffect(() => {
  //     async function loadSettings() {
  //       try {
  //         const settings = await getCurrentUserSettings()
  //         if (settings) {
  //           setForm({
  //             newsletterName: settings.newsletterName || '',
  //             description: settings.description || '',
  //             targetAudience: settings.targetAudience || '',
  //             defaultTone: settings.defaultTone || '',
  //             companyName: settings.companyName || '',
  //             industry: settings.industry || '',
  //             disclaimerText: settings.disclaimerText || '',
  //             senderName: settings.senderName || '',
  //             senderEmail: settings.senderEmail || '',
  //           })
  //         }
  //       } catch (error) {
  //         toast.error('Failed to load settings')
  //       }
  //       setLoading(false)
  //     }

  //     loadSettings()
  //   }, [])

  //   // ----------------------
  //   // Handle save
  //   // ----------------------
  //   async function handleSave() {
  //     try {
  //       setSaving(true)

  //       const validated = SettingsSchema.parse(form)

  //       await upsertUserSettings(validated)

  //       toast.success('Settings saved successfully!')
  //     } catch (error: any) {
  //       toast.error(error.message || 'Failed to save settings')
  //     } finally {
  //       setSaving(false)
  //     }
  //   }

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-3">
      <FromSettings />
    </div>
  )
}
