import type { Block, Field } from 'payload/types'

interface Options {
  slug: string
  type?: 'text' | 'number' | 'checkbox'
  fields?: Field[]
}

export const baseField = ({ slug, type = 'text', fields = [] }: Options): Block => ({
  slug,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'default',
          type: type as any,
        },
        {
          name: 'required',
          type: 'checkbox',
          admin: {
            className: 'field-flex-end',
          },
        },
      ],
    },
    ...fields,
  ],
})
