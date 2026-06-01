import { Label } from '@/components/ui/label'
import { default as FieldControl, default as InputControl } from '../../form/FieldControl'
import { settings } from '@/validations'

const Fields = {
  text: InputControl,
  textarea: InputControl,
}

const BasicSettingsForm = () => {
  const settingsForm = settings?.setting

  return (
    <>
      <h1 className="text-3xl font-bold">Newsletter Settings</h1>
      {settingsForm.map(setting => (
        <div key={setting.name} className="space-y-2">
          <Label className="block text-sm font-medium">{setting.label}</Label>
          <FieldControl name={setting.name} type={setting.type} />
        </div>
      ))}
    </>
  )
}

export default BasicSettingsForm
