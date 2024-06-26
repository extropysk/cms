import type { Field } from 'payload/types'

enum Currency {
  EUR = 'eur',
}

interface Options {
  required?: boolean
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
        },
      ],
    },
  ],
})
