import type { Block } from 'payload/types'

import { BaseBlock } from './BaseBlock'

export const IntegerBlock: Block = {
  slug: 'integer-type',
  fields: BaseBlock.fields,
}
