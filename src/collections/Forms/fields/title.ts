import type { Field } from 'payload/types'

export const title: Field = {
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
}
