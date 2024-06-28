import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type Stripe from 'stripe'
import type { AjaxError } from '../utilities/ajax'
import { ajax } from '../utilities/ajax'

export const useStripeProducts = (): UseQueryResult<
  Stripe.Response<Stripe.ApiList<Stripe.Customer>>,
  AjaxError
> => {
  return useQuery({
    queryKey: ['stripeProducts'],
    queryFn: () =>
      ajax<Stripe.Response<Stripe.ApiList<Stripe.Customer>>>('GET', '/api/stripe/products'),
  })
}
