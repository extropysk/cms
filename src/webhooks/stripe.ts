import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/dist/types'
import type { Product } from 'payload/generated-types'
import type Stripe from 'stripe'

const logs = true

export const productUpdated: StripeWebhookHandler<{
  data: {
    object: Stripe.Product
  }
}> = async args => {
  const { event, payload } = args

  const stripeProduct = event.data.object

  if (logs) payload.logger.info(`Syncing Stripe product with ID: ${stripeProduct.id} to Payload...`)

  let payloadProduct: Product

  // First lookup the product in Payload
  try {
    if (logs) payload.logger.info(`- Looking up existing Payload product...`)

    const productQuery = await payload.find({
      collection: 'products',
      where: {
        stripeProductID: {
          equals: stripeProduct.id,
        },
      },
      depth: 0,
    })

    payloadProduct = productQuery.docs?.[0]

    if (payloadProduct) {
      if (logs)
        payload.logger.info(
          `- Found existing product with Stripe ID: ${stripeProduct.id}, syncing now...`,
        )
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(`Error finding product ${message}`)
  }

  try {
    if (logs) payload.logger.info(`- Updating document...`)

    await payload.update({
      collection: 'products',
      id: payloadProduct.id,
      data: {
        title: stripeProduct.name,
        description: stripeProduct.description,
        disabled: !stripeProduct.active,
        skipSync: true,
      },
    })

    if (logs) payload.logger.info(`✅ Successfully updated product.`)
  } catch (error: unknown) {
    payload.logger.error(`- Error updating product: ${error}`)
  }
}

export const priceUpdated: StripeWebhookHandler<{
  data: {
    object: Stripe.Price
  }
}> = async args => {
  const { event, payload, stripe } = args

  const stripeProduct = event.data.object.product
  const stripeProductID = typeof stripeProduct === 'string' ? stripeProduct : stripeProduct.id

  if (logs)
    payload.logger.info(
      `🪝 A price was created or updated in Stripe on product ID: ${stripeProductID}, syncing to Payload...`,
    )

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
      depth: 0,
    })

    payloadProduct = productQuery.docs?.[0]

    if (payloadProduct) {
      if (logs)
        payload.logger.info(
          `- Found existing product with Stripe ID: ${stripeProductID}, saving price...`,
        )
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    payload.logger.error(`Error finding product ${msg}`)
  }

  try {
    // find all stripe prices that are assigned to "payloadProductID"
    const stripePrices = await stripe.prices.list({
      product: stripeProductID,
      limit: 100,
    })

    const variants = payloadProduct.variants.map(variant => {
      if (variant.price.stripePriceID) {
        const price = stripePrices.data.find(p => p.id === variant.price.stripePriceID)
        if (price) {
          variant.price = {
            currencyCode: price.currency as any,
            amount: price.unit_amount / 100,
            stripePriceID: price.id,
          }
        }
      }

      return variant
    })

    await payload.update({
      collection: 'products',
      id: payloadProduct.id,
      data: {
        variants,
        skipSync: true,
      },
    })

    if (logs) payload.logger.info(`✅ Successfully updated product price.`)
  } catch (error: unknown) {
    payload.logger.error(`- Error updating product price: ${error}`)
  }
}
