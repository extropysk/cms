import type { CollectionConfig } from 'payload/types'
import { variantSelectField } from '../../../fields/priceSelect'
import { populateTotalAmount } from './hooks/populateTotalAmount'

export const Carts: CollectionConfig = {
  slug: 'carts',
  admin: {
    group: 'Shop',
    useAsTitle: 'name',
  },
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
            variantSelectField(),
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'quantity',
              type: 'number',
              required: true,
              min: 1,
              defaultValue: 1,
            },
          ],
        },
      ],
    },
  ],
}
