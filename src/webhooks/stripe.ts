import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/dist/types'
import type { Product } from 'payload/generated-types'
import type Stripe from 'stripe'

const logs = false

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
      },
    })

    if (logs) payload.logger.info(`✅ Successfully updated product.`)
  } catch (error: unknown) {
    payload.logger.error(`- Error updating product: ${error}`)
  }
}
