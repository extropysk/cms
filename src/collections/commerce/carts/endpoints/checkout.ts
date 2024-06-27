import { handler } from '../../../../utilities/api'

export const getCheckout = handler(
  async ({ params, payload }) => {
    const cart = await payload.findByID({
      collection: 'carts',
      id: params.id,
      depth: 1,
    })

    return cart
  },
  {
    access: () => true,
  },
)
