import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Controller, useFormContext } from 'react-hook-form'

interface InputControlProps {
  name: string
  type: string
}

const fields: Record<string, typeof Input | typeof Textarea> = {
  text: Input,
  textarea: Textarea,
}

const InputControl = ({ name, type }: InputControlProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const Field = fields[type] || Input

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Field ref={ref} value={value ?? ''} onChange={onChange} onBlur={onBlur} type={type} />
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name]?.message as string}</p>
      )}
    </>
  )
}

export default InputControl
