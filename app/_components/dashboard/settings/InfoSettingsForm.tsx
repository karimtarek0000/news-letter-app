import { Label } from '@/components/ui/label'
import InputControl from '../../form/FieldControl'
import { settings } from '@/validations'

const InfoSettingsForm = () => {
  const infoForm = settings?.info

  return (
    <>
      <h2 className="text-xl font-semibold">Additional Information</h2>
      {infoForm?.map(info => (
        <div key={info.name} className="space-y-2">
          <Label className="block text-sm font-medium">{info.label}</Label>
          <InputControl name={info.name} type={info.type} />
        </div>
      ))}
    </>
  )
}

export default InfoSettingsForm
