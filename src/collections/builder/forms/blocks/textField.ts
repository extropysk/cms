import type { Block } from 'payload/types'
import { baseField } from './baseField'

export const TextField: Block = baseField({
  slug: 'text-field',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'minLength', type: 'number', min: 0 },
        { name: 'maxLength', type: 'number', min: 0 },
      ],
    },
    {
      name: 'pattern',
      type: 'text',
    },
  ],
})
