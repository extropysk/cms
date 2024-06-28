import { APIError } from 'payload/errors'
import type { Cart } from 'payload/generated-types'
import type { CollectionBeforeChangeHook } from 'payload/types'

export const populatePrice: CollectionBeforeChangeHook<Cart> = async ({
  data,
  req: { payload },
}) => {
  let currencyCode
  const products = await Promise.all(
    data.lines.map(line => {
      return typeof line.product === 'object'
        ? line.product
        : payload.findByID({
            collection: 'products',
            id: line.product,
          })
    }),
  )

  let totalAmount = 0
  data.lines.forEach(line => {
    const product =
      typeof line.product === 'object' ? line.product : products.find(p => p.id === line.product)
    const variant = product.variants.find(v => v.id === line.variant)
    totalAmount += line.quantity * variant.price.amount
    if (currencyCode) {
      if (currencyCode !== variant.price.currencyCode) {
        throw new APIError('multiple currencies', 400)
      }
    } else {
      currencyCode = variant.price.currencyCode
    }
  })

  data.totalAmount = totalAmount
  data.currencyCode = currencyCode
  data.totalTaxAmount = 0 * totalAmount
  return data
}
