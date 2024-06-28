import type { Access, Where } from 'payload/types'

export const publicAndUser: Access = ({ req: { user } }) => {
  const filters: Where[] = [
    {
      user: { exists: false },
    },
  ]

  if (user) {
    filters.push({ user: { equals: user.id } })
  }

  return {
    or: filters,
  }
}
