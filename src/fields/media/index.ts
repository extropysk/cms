import type { Field } from 'payload/types'

interface Options {
  name?: string
  required?: boolean
}

export const mediaField = ({ name, required }: Options): Field => ({
  name: name ?? 'media',
  type: 'upload',
  relationTo: 'media',
  required,
})
