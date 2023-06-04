import type { BeforeChangeHook } from 'payload/dist/collections/config/types'
import APIError from 'payload/dist/errors/APIError'

import { validate } from '../../../utilities/ajv'
import { getSchema } from '../../Forms/services/getSchema'

export const validateData: BeforeChangeHook = async ({ data }) => {
  const schema = await getSchema(data.form)
  const errors = validate(schema, data.data)
  if (errors.length) {
    throw new APIError('', 400, errors)
  }

  return data
}
