import type { Block } from 'payload/types'

import { title } from '../fields/title'

export const StringBlock: Block = {
  slug: 'string-type',
  fields: [
    title,
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'format',
      type: 'select',
      options: [
        {
          label: 'email',
          value: 'email',
        },
        {
          label: 'uri',
          value: 'uri',
        },
        {
          label: 'data-url',
          value: 'data-url',
        },
        {
          label: 'date',
          value: 'date',
        },
        {
          label: 'date-time',
          value: 'date-time',
        },
        {
          label: 'time',
          value: 'time',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'minLength',
          type: 'number',
          min: 0,
          admin: {
            step: 1,
          },
        },
        {
          name: 'maxLength',
          type: 'number',
          min: 0,
          admin: {
            step: 1,
          },
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
    },
    {
      name: 'oneOf',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'const',
              type: 'text',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
