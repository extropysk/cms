import type { Product } from 'payload/generated-types'
import type { CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload/types'
import { stripe } from '../../../../utilities/stripe'

export const syncProduct: CollectionBeforeChangeHook<Product> = async ({ data, operation }) => {
  if (operation === 'create' || !data.stripeProductID) {
    const stripeProduct = await stripe.products.create({
      name: data.title,
      active: !data.disabled,
      description: data.description,
    })
    data.stripeProductID = stripeProduct.id
  } else {
    await stripe.products.update(data.stripeProductID, {
      name: data.title,
      active: !data.disabled,
      description: data.description,
    })
  }

  return data
}

export const disableProduct: CollectionAfterDeleteHook<Product> = async ({ doc }) => {
  if (doc.stripeProductID) {
    await stripe.products.update(doc.stripeProductID, {
      active: false,
    })
  }
}
