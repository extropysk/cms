import { SelectInput, getSiblingData, useAllFormFields, useField } from 'payload/components/forms'
import { SelectInputProps } from 'payload/dist/admin/components/forms/field-types/Select/Input'

import * as React from 'react'

export const CustomSelectInput: React.FC<SelectInputProps> = ({
  path,
  label,
  required,
  options,
  readOnly,
  custom,
}) => {
  const { value, setValue } = useField<string>({ path })

  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, path)

  return (
    <SelectInput
      label={label}
      path={path}
      name={path}
      required={required}
      options={options}
      value={value}
      readOnly={custom?.readOnly?.({ siblingData }) || readOnly}
      onChange={e => setValue(e?.value)}
    />
  )
}
