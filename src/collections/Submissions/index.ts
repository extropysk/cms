import type { CollectionConfig } from 'payload/types'

import { adminsOrCreatedBy } from '../../access/adminsOrCreatedBy'
import { populateCreatedBy } from '../../hooks/populateCreatedBy'
import { validateData } from './hooks/validateData'

export const Submissions: CollectionConfig = {
  slug: 'submissions',
  admin: {
    defaultColumns: ['createdBy', 'form'],
    group: 'Forms',
  },
  access: {
    read: adminsOrCreatedBy,
    update: adminsOrCreatedBy,
    delete: adminsOrCreatedBy,
  },
  hooks: {
    beforeChange: [populateCreatedBy, validateData],
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'data',
      type: 'json',
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: data => Boolean(data?.createdBy),
      },
    },
  ],
}
