import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import type { CollectionConfig } from 'payload/types'
import { admins } from '../../../access/admins'
import { anyone } from '../../../access/anyone'
import { mediaField } from '../../../fields/media'
import { priceField } from '../../../fields/price'
import richText from '../../../fields/richText'
import { validateUnique } from '../../../utilities/validate'
import { OptionSelect } from './ui/optionSelect'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'Shop',
    useAsTitle: 'title',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
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
    richText({ name: 'description' }),
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
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
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  admin: {
                    components: {
                      Field: OptionSelect,
                    },
                  },
                },
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
    mediaField({}),
  ],
}
