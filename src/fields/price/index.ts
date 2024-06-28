import type { Field } from 'payload/types'
import { CustomNumberField } from '../../components/ui/customNumberField'
import { CustomSelectInput } from '../../components/ui/customSelectInput'

enum Currency {
  EUR = 'eur',
}

interface Options {
  required?: boolean
}

const readOnly = ({ siblingData }: { siblingData: any }): boolean => {
  return !!siblingData.stripePriceID
}

export const priceField = ({ required }: Options): Field => ({
  name: 'price',
  type: 'group',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'amount',
          type: 'number',
          required,
          min: 0,
          custom: {
            readOnly,
          },
          admin: {
            components: { Field: CustomNumberField },
          },
        },
        {
          name: 'currencyCode',
          type: 'select',
          required,
          defaultValue: Currency.EUR,
          options: Object.values(Currency).map(currency => ({
            label: currency,
            value: currency,
          })),
          custom: {
            readOnly,
          },
          admin: {
            components: { Field: CustomSelectInput },
          },
        },
        {
          name: 'stripePriceID',
          type: 'text',
          admin: {
            hidden: true,
            readOnly: true,
          },
        },
      ],
    },
  ],
})
