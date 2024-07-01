import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/dist/types'
import type { Product } from 'payload/generated-types'
import type Stripe from 'stripe'

const logs = true

export const productUpdated: StripeWebhookHandler<{
  data: {
    object: Stripe.Product
  }
}> = async args => {
  const { event, payload, stripe } = args

  const {
    id: stripeProductID,
    name: stripeProductName,
    description: stripeDescription,
  } = event.data.object

  if (logs) payload.logger.info(`Syncing Stripe product with ID: ${stripeProductID} to Payload...`)

  let payloadProduct: Product

  // First lookup the product in Payload
  try {
    if (logs) payload.logger.info(`- Looking up existing Payload product...`)

    const productQuery = await payload.find({
      collection: 'products',
      where: {
        stripeProductID: {
          equals: stripeProductID,
        },
      },
    })

    payloadProduct = productQuery.docs?.[0]

    if (payloadProduct) {
      if (logs)
        payload.logger.info(
          `- Found existing product with Stripe ID: ${stripeProductID}, syncing now...`,
        )
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(`Error finding product ${message}`)
  }

  // let prices: Stripe.Price[] = []

  // try {
  //   if (logs) payload.logger.info(`- Looking up all prices associated with this product...`)

  //   // find all stripe prices that are assigned to "payloadProductID"
  //   const res = await stripe.prices.list({
  //     product: stripeProductID,
  //     limit: 100,
  //   })
  //   prices = res.data
  // } catch (error: unknown) {
  //   payload.logger.error(`- Error looking up prices: ${error}`)
  // }

  try {
    if (logs) payload.logger.info(`- Updating document...`)

    // const variants = payloadProduct.variants.map(variant => {
    //   const price = prices.find(p => p.id === variant.price.stripePriceID)
    //   if (price) {
    //     variant.price = {
    //       currencyCode: price.currency as any,
    //       amount: price.unit_amount,
    //       stripePriceID: price.id,
    //     }
    //   }

    //   return variant
    // })

    // await payload.update({
    //   collection: 'products',
    //   id: payloadProduct.id,
    //   data: {
    //     title: stripeProductName,
    //     description: stripeDescription,
    //     variants,
    //   },
    // })

    if (logs) payload.logger.info(`✅ Successfully updated product.`)
  } catch (error: unknown) {
    payload.logger.error(`- Error updating product: ${error}`)
  }
}
