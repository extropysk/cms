import type { Block } from 'payload/types'
import { baseField } from './baseField'

export const CheckboxField: Block = baseField({
  slug: 'checkbox-field',
  type: 'checkbox',
})
