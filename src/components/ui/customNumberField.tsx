import DefaultLabel from 'payload/dist/admin/components/forms/Label'

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { getSiblingData, useAllFormFields } from 'payload/components/forms'
import DefaultError from 'payload/dist/admin/components/forms/Error'
import FieldDescription from 'payload/dist/admin/components/forms/FieldDescription'
import 'payload/dist/admin/components/forms/field-types/Number/index.scss'
import { fieldBaseClass } from 'payload/dist/admin/components/forms/field-types/shared'
import useField from 'payload/dist/admin/components/forms/useField'
import withCondition from 'payload/dist/admin/components/forms/withCondition'
import { NumberField } from 'payload/dist/fields/config/types'
import { number } from 'payload/dist/fields/validations'
import { getTranslation } from 'payload/dist/utilities/getTranslation'

type Props = Omit<NumberField, 'type' | 'hasMany' | 'minRows' | 'maxRows'> & {
  path?: string
}

const Component: React.FC<Props> = ({
  name,
  custom,
  admin: {
    className,
    components: { Error, Label, afterInput, beforeInput } = {},
    condition,
    description,
    placeholder,
    readOnly,
    step,
    style,
    width,
  } = {},
  label,
  max,
  min,
  path: pathFromProps,
  required,
  validate = number,
}) => {
  const ErrorComp = Error || DefaultError
  const LabelComp = Label || DefaultLabel

  const { i18n } = useTranslation()

  const path = pathFromProps || name

  const memoizedValidate = useCallback(
    (value, options) => {
      return validate(value, { ...options, max, min, required })
    },
    [validate, min, max, required],
  )

  const { errorMessage, setValue, showError, value } = useField<number | number[]>({
    condition,
    path,
    validate: memoizedValidate,
  })

  const handleChange = useCallback(
    e => {
      const val = parseFloat(e.target.value)

      if (Number.isNaN(val)) {
        setValue('')
      } else {
        setValue(val)
      }
    },
    [setValue],
  )

  const [fields] = useAllFormFields()
  const siblingData = getSiblingData(fields, path)

  readOnly = readOnly || custom?.readOnly?.({ siblingData })

  return (
    <div
      className={[
        fieldBaseClass,
        'number',
        className,
        showError && 'error',
        readOnly && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <ErrorComp message={errorMessage} showError={showError} />
      <LabelComp htmlFor={`field-${path.replace(/\./g, '__')}`} label={label} required={required} />
      <div className="input-wrapper">
        {Array.isArray(beforeInput) && beforeInput.map((Component, i) => <Component key={i} />)}
        <input
          disabled={readOnly}
          id={`field-${path.replace(/\./g, '__')}`}
          max={max}
          min={min}
          name={path}
          onChange={handleChange}
          onWheel={e => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            e.target.blur()
          }}
          placeholder={getTranslation(placeholder, i18n)}
          step={step}
          type="number"
          value={typeof value === 'number' ? value : ''}
        />
        {Array.isArray(afterInput) && afterInput.map((Component, i) => <Component key={i} />)}
      </div>

      <FieldDescription description={description} value={value} />
    </div>
  )
}

export const CustomNumberField = withCondition(Component)
