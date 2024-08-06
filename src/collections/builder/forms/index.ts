import type { CollectionConfig } from 'payload/types'
import { admins } from '../../../access/admins'
import { anyone } from '../../../access/anyone'
import { fieldBlocks } from './blocks'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    group: 'Builder',
  },
  access: {
    read: anyone,
    create: admins,
    update: admins,
    delete: admins,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'fields',
      blocks: fieldBlocks,
      required: true,
      type: 'blocks',
    },
  ],
}
