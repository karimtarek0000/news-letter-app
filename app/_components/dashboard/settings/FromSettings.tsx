'use client'

import { Button } from '@/components/ui/button'
import { SettingsSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import BasicSettingsForm from './BasicSettingsForm'
import BrandingSettingsFrom from './BrandingSettingsFrom'
import InfoSettingsForm from './InfoSettingsForm'

const FromSettings = () => {
  const methods = useForm({
    resolver: zodResolver(SettingsSchema),
    mode: 'onChange',
    defaultValues: {
      newsletterName: '',
      description: '',
      targetAudience: '',
      defaultTone: '',
      companyName: '',
      industry: '',
      disclaimerText: '',
      senderName: '',
      senderEmail: '',
    },
  })

  const {
    handleSubmit,
    formState: { isDirty },
  } = methods

  const submit = (data: Record<string, unknown>) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <BasicSettingsForm />
        <BrandingSettingsFrom />
        <InfoSettingsForm />

        <Button disabled={!isDirty} type="submit">
          Save Settings
        </Button>
      </form>
    </FormProvider>
  )
}

export default FromSettings
