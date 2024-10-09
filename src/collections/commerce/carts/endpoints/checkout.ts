import type { Product } from 'payload/generated-types'
import { z } from 'zod'
import { handler } from '../../../../utilities/api'
import { stripe } from '../../../../utilities/stripe'

const SCHEMA = z.object({
  url: z.string().url(),
})

type Schema = z.infer<typeof SCHEMA>

export const checkout = handler<Schema>(
  async ({ params, payload, body }) => {
    const cart = await payload.findByID({
      collection: 'carts',
      id: params.id,
      depth: 1,
    })

    const session = await stripe.checkout.sessions.create({
      line_items: cart.lines.map(line => {
        const product = line.product as Product
        const variant = product.variants.find(v => v.id === line.variant)
        if (!variant) {
          throw new Error('Price not found')
        }

        return {
          price_data: {
            currency: variant.price.currencyCode,
            unit_amount: variant.price.amount * 100,
            product: product.stripeProductID,
          },

          quantity: line.quantity,
        }
      }),
      mode: 'payment',
      success_url: `${body.url}/?success=true`,
      cancel_url: `${body.url}/?canceled=true`,
    })

    return session
  },
  {
    schema: SCHEMA,
  },
)
