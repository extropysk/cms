import type { Block } from 'payload/types'

import { BaseBlock } from './BaseBlock'

export const BooleanBlock: Block = {
  slug: 'boolean-type',
  fields: BaseBlock.fields,
}
