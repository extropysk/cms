import { createId } from '@paralleldrive/cuid2'
import type { FieldHook } from 'payload/types'

export const populateId: FieldHook = async ({ operation, value }) => {
  if (operation === 'create') {
    return createId()
  }

  return value
}
