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

  return data
}
