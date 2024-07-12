import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type Stripe from 'stripe'
import { payload } from '../utilities/payload'

export const useStripeProducts = (): UseQueryResult<
  Stripe.Response<Stripe.ApiList<Stripe.Customer>>
> => {
  return useQuery({
    queryKey: ['stripeProducts'],
    queryFn: () =>
      payload.request<Stripe.Response<Stripe.ApiList<Stripe.Customer>>>('stripe/products', 'GET'),
  })
}
