/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { BaseParams } from '@extropysk/payload'
import { useQuery } from '@tanstack/react-query'
import type { Config } from 'payload/generated-types'
import { payload } from '../utilities/payload'

type Collection = keyof Config['collections']

export const useFindByID = <Key extends Collection>(
  collection: Key,
  id?: string,
  params?: BaseParams,
) => {
  return useQuery({
    queryKey: [collection, id, params],
    queryFn: () => payload.findByID(collection, id, params),
    enabled: !!id,
  })
}
