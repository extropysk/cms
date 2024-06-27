import { SelectInput, useField } from 'payload/components/forms'
import { SelectInputProps } from 'payload/dist/admin/components/forms/field-types/Select/Input'

import * as React from 'react'

export const CurrencyCodeSelect: React.FC<SelectInputProps> = ({
  path,
  label,
  required,
  options,
  readOnly,
}) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <SelectInput
      label={label}
      path={path}
      name={path}
      required={required}
      options={options}
      value={value}
      readOnly={readOnly}
      onChange={e => setValue(e?.value)}
    />
  )
}
