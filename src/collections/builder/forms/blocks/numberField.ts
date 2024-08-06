import type { Block } from 'payload/types'
import { baseField } from './baseField'

export const NumberField: Block = baseField({
  slug: 'number-field',
  type: 'number',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'min', type: 'number', min: 0 },
        { name: 'max', type: 'number', min: 0 },
      ],
    },
  ],
})
