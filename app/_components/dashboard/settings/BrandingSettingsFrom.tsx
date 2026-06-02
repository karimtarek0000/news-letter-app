import { Label } from '@/components/ui/label'
import InputControl from '../../form/FieldControl'
import { settings } from '@/validations'

const BrandingSettingsFrom = () => {
  const brandingForm = settings?.branding

  return (
    <>
      <h2 className="text-xl font-semibold">Additional Information</h2>
      {brandingForm.map(brand => (
        <div key={brand.name} className="space-y-2">
          <Label className="block text-sm font-medium">{brand.label}</Label>
          <InputControl name={brand.name} type={brand.type} />
        </div>
      ))}
    </>
  )
}

export default BrandingSettingsFrom
