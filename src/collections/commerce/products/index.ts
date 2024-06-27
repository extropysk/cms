import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types'
import type { CollectionConfig } from 'payload/types'
import { admins } from '../../../access/admins'
import { anyone } from '../../../access/anyone'
import { mediaField } from '../../../fields/media'
import { priceField } from '../../../fields/price'
import richText from '../../../fields/richText'
import { validateUnique } from '../../../utilities/validate'
import { syncProduct } from './hooks/stripe'
import { OptionSelect } from './ui/optionSelect'
import { StripeProduct } from './ui/stripeProduct'

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
  hooks: {
    beforeChange: [syncProduct],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Detail',
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
            mediaField({}),
          ],
        },
        {
          label: 'Prices',
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
          ],
        },
      ],
    },
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
      name: 'stripeProductID',
      label: 'Stripe Product',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        components: {
          Field: StripeProduct,
        },
      },
    },
  ],
}
