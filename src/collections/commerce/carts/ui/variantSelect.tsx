import { SelectInput, getSiblingData, useAllFormFields, useField } from 'payload/components/forms'
import { SelectInputProps } from 'payload/dist/admin/components/forms/field-types/Select/Input'
import { Product } from 'payload/generated-types'
import * as React from 'react'
import { useFindById } from '../../../../hooks/query'

export const VariantSelect: React.FC<SelectInputProps> = ({ path, label, required }) => {
  const { value, setValue } = useField<string>({ path })

  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, path)

  const { data } = useFindById<Product>('products', siblingData.product)
  return (
    <SelectInput
      label={label}
      path={path}
      name={path}
      required={required}
      options={(data?.variants ?? []).map(variant => ({
        label: `${variant.price.amount} ${variant.price.currencyCode}`,
        value: variant.id,
      }))}
      value={value}
      onChange={e => setValue(e?.value)}
    />
  )
}
