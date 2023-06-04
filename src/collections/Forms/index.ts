import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import { BooleanBlock } from './blocks/BooleanBlock'
import { IntegerBlock } from './blocks/IntegerBlock'
import { NumberBlock } from './blocks/NumberBlock'
import { StringBlock } from './blocks/StringBlock'
import { getSchema } from './services/getSchema'

export const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
    group: 'Forms',
  },
  access: {
    create: admins,
    read: anyone,
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
      name: 'description',
      type: 'text',
    },
    {
      name: 'type',
      type: 'text',
      defaultValue: 'object',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'fields',
      type: 'blocks',
      required: true,
      blocks: [StringBlock, NumberBlock, IntegerBlock, BooleanBlock],
    },
  ],
  endpoints: [
    {
      path: '/:id/schema',
      method: 'get',
      handler: async (req, res) => {
        const result = await getSchema(req.params.id)
        if (result) {
          res.status(200).send(result)
        } else {
          res.status(404).send({ error: 'NotFound' })
        }
      },
    },
  ],
}
