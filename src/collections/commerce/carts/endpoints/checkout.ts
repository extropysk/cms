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
        const variant = (line.product as Product).variants.find(v => v.id === line.variant)
        if (!variant?.price?.stripePriceID) {
          throw new Error('Price ID not found')
        }

        return {
          price: variant.price.stripePriceID,
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
