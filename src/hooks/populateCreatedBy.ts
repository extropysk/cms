import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

export const populateCreatedBy: BeforeChangeHook = ({ data, req, operation }) => {
  if (operation === 'create') {
    if (req.user) {
      data.createdBy = req.user.id
      return data
    }
  }

  return data
}
