import type { Block } from 'payload/types'

export const BaseBlock: Block = {
  slug: '',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'default',
      type: 'text',
    },
    {
      name: 'required',
      type: 'checkbox',
    },
  ],
}
