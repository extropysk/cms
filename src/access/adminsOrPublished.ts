import type { Access } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'

export const adminsOrPublished: Access = ({ req: { user } }) => {
  if (user && checkRole(['admin'], user)) {
    return true
  }

  return {
    and: [
      {
        publishDate: {
          less_than: new Date().toJSON(),
        },
        _status: {
          not_equals: 'drafts',
        },
      },
    ],
  }
}
