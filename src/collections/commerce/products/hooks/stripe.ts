import type { Product } from 'payload/generated-types'
import type { CollectionBeforeChangeHook } from 'payload/types'
import { stripe } from '../../../../utilities/stripe'

export const syncProduct: CollectionBeforeChangeHook<Product> = async ({ data }) => {
  if (data.stripeProductID) {
    await stripe.products.update(data.stripeProductID, {
      name: data.title,
      active: !data.disabled,
    })
  } else {
    const stripeProduct = await stripe.products.create({
      name: data.title,
      active: !data.disabled,
    })
    data.stripeProductID = stripeProduct.id
  }

  data.variants = await Promise.all(
    data.variants.map(async variant => {
      if (!variant.price.stripePriceID) {
        const price = await stripe.prices.create({
          currency: variant.price.currencyCode,
          unit_amount: variant.price.amount * 100,
          product: data.stripeProductID,
        })
        variant.price.stripePriceID = price.id
      }

      return variant
    }),
  )

  return data
}
