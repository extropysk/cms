import type { Field } from 'payload/types'
import { AmountInput } from './ui/amountInput'
import { CurrencyCodeSelect } from './ui/currencyCodeSelect'

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

          admin: {
            components: { Field: AmountInput },
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
          admin: {
            components: { Field: CurrencyCodeSelect },
          },
        },
        {
          name: 'synced',
          type: 'checkbox',
          admin: {
            // disabled: true,
          },
        },
      ],
    },
  ],
})
