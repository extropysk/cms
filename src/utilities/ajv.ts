import type { ErrorObject, Schema } from 'ajv'
import Ajv from 'ajv'
const ajv = new Ajv()

export const validate = (schema: Schema, data: any): ErrorObject[] => {
  const validator = ajv.compile(schema)
  const valid = validator(data)
  if (!valid) {
    return validator.errors
  } else {
    return []
  }
}
