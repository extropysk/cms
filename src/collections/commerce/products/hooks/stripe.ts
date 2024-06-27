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
      variant.price.synced = true
      // if(variant.price.)
      // const price = prices.find(p => p.nickname === variant.id)
      // if (!price) {
      //   console.log('TEST')
      //   await stripe.prices.create({
      //     currency: variant.price.currencyCode,
      //     unit_amount: variant.price.amount * 100,
      //     nickname: variant.id,
      //     product: data.stripeProductID,
      //   })
      // }
      return variant
    }),
  )

  return data
}
