import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import type { CollectionConfig } from 'payload/types'
import { anyone } from '../../../access/anyone'
import { optionSelectField } from '../../../fields/optionSelect'
import { priceField } from '../../../fields/price'
import { validateUnique } from '../../../utilities/validate'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Shop',
    useAsTitle: 'name',
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'variants',
      type: 'array',
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'disabled',
              type: 'checkbox',
              admin: {
                className: 'field-flex-end',
              },
            },
          ],
        },
        priceField({ required: true }),
        {
          name: 'selectedOptions',
          type: 'array',
          validate: validateUnique('operation'),
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'option',
                  type: 'relationship',
                  relationTo: 'options',
                  required: true,
                },
                optionSelectField(),
              ],
            },
          ],
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Slide ${String(index).padStart(2, '0')}`
          },
        },
      },
    },
  ],
}
