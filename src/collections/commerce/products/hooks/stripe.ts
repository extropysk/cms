import type { Product } from 'payload/generated-types'
import type { CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload/types'
import { stripe } from '../../../../utilities/stripe'

export const syncProduct: CollectionBeforeChangeHook<Product> = async ({ data, operation }) => {
  if (operation === 'create' || !data.stripeProductID) {
    const stripeProduct = await stripe.products.create({
      name: data.title,
      active: !data.disabled,
    })
    data.stripeProductID = stripeProduct.id
  } else {
    await stripe.products.update(data.stripeProductID, {
      name: data.title,
      active: !data.disabled,
    })
  }

  data.variants = await Promise.all(
    data.variants.map(async variant => {
      if (operation === 'create' || !variant.price.stripePriceID) {
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

export const disableProduct: CollectionAfterDeleteHook<Product> = async ({ doc }) => {
  if (doc.stripeProductID) {
    await stripe.products.update(doc.stripeProductID, {
      active: false,
    })
  }
}
