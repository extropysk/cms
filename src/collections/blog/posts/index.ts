import type { CollectionConfig } from 'payload/types'
import richText from '../../../fields/richText'
import { slugField } from '../../../fields/slug'
import { authOrPublished } from './access/authOrPublished'
import { populateAuthors } from './hooks/populateAuthor'
import { populatePublishedAt } from './hooks/populatePublishedAt'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Blog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  hooks: {
    afterRead: [populateAuthors],
  },
  versions: true,
  access: {
    read: authOrPublished,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    richText({ name: 'content' }),
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [populatePublishedAt],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: 'populatedAuthors',
      type: 'array',
      admin: {
        readOnly: true,
        disabled: true,
      },
      access: {
        update: () => false,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField(),
  ],
}
