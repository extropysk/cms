import type { CollectionConfig } from 'payload/types'
import { admins } from '../../../access/admins'
import { anyone } from '../../../access/anyone'

export const Options: CollectionConfig = {
  slug: 'options',
  admin: {
    group: 'Shop',
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    {
      name: 'values',
      type: 'array',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'text',
              name: 'value',
              required: true,
            },
            {
              type: 'text',
              name: 'label',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
