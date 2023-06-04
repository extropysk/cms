import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'

export const adminsOrCreatedBy: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  if (user) {
    return {
      createdBy: {
        equals: user.id,
      },
    }
  }

  return false
}
