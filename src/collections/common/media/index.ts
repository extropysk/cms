import { LinkFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { anyone } from '../../../access/anyone'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../../media'),
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      editor: lexicalEditor({
        features: () => [LinkFeature({})],
      }),
      type: 'richText',
    },
  ],
}
