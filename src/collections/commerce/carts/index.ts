import type { CollectionConfig } from 'payload/types'
import { publicAndUser } from '../../../access/publicAndUser'
import { checkout } from './endpoints/checkout'
import { populateTotalAmount } from './hooks/populateTotalAmount'
import { VariantSelect } from './ui/variantSelect'

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: {
    group: 'Shop',
    useAsTitle: 'name',
  },
  access: {
    read: publicAndUser,
    create: publicAndUser,
    update: publicAndUser,
    delete: publicAndUser,
  },
  endpoints: [
    {
      path: '/:id/checkout',
      method: 'post',
      handler: checkout,
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      hooks: {
        beforeChange: [populateTotalAmount],
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      type: 'array',
      name: 'lines',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
              required: true,
            },
            {
              name: 'variant',
              type: 'text',
              required: true,
              admin: {
                components: {
                  Field: VariantSelect,
                },
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              required: true,
              defaultValue: 1,
              min: 1,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
  ],
}
