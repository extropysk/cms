import type { Block } from 'payload/types'

import { title } from '../fields/title'

export const IntegerBlock: Block = {
  slug: 'integer-type',
  fields: [
    title,
    {
      name: 'description',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minimum',
          type: 'number',
        },
        {
          name: 'maximum',
          type: 'number',
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
    },
  ],
}
