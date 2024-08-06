import type { Block } from 'payload/types'
import { baseField } from './baseField'

export const SelectField: Block = baseField({
  slug: 'select-field',
  fields: [
    {
      name: 'options',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
  ],
})
