import type { UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { Config } from 'payload/generated-types'
import type { AjaxError } from '../utilities/ajax'
import { ajax } from '../utilities/ajax'

type Collection = keyof Config['collections']

export const useFindById = <T>(
  collection: Collection,
  id?: string,
): UseQueryResult<T, AjaxError> => {
  const url = `/api/${collection}/${id}`

  return useQuery({
    queryKey: [collection, id],
    queryFn: () => ajax<T>('GET', url),
    enabled: !!id,
  })
}
