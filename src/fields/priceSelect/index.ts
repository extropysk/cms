import type { Field } from 'payload/types'
import { VariantSelectComponent } from './component'

export const variantSelectField = (): Field => ({
  name: 'variant',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: VariantSelectComponent,
    },
  },
})
