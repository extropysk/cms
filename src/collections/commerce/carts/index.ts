import type { CollectionConfig } from 'payload/types'
import { publicAndUser } from '../../../access/publicAndUser'
import { checkout } from './endpoints/checkout'
import { populatePrice } from './hooks/populatePrice'
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
  hooks: {
    beforeChange: [populatePrice],
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
      name: 'totalAmount',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'totalTaxAmount',
      type: 'number',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'currencyCode',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'totalQuantity',
      type: 'number',
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
