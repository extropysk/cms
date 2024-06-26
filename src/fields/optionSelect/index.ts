import type { Field } from 'payload/types'
import { OptionSelectComponent } from './component'

export const optionSelectField = (): Field => ({
  name: 'value',
  type: 'text',
  required: true,
  admin: {
    components: {
      Field: OptionSelectComponent,
    },
  },
})
