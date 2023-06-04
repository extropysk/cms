import type { Block } from 'payload/types'

import { title } from '../fields/title'

export const BooleanBlock: Block = {
  slug: 'boolean-type',
  fields: [
    title,
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'required',
      type: 'checkbox',
    },
  ],
}
