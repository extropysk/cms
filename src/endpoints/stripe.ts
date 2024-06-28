import { admins } from '../access/admins'
import { handler } from '../utilities/api'
import { stripe } from '../utilities/stripe'

export const getStripeProducts = handler(
  async () => {
    return await stripe.products.list({
      limit: 100,
    })
  },
  {
    access: admins,
  },
)

export const getStripeCustomers = handler(
  async () => {
    return await stripe.customers.list({
      limit: 100,
    })
  },
  {
    access: admins,
  },
)
