import type { Block } from 'payload/types'

import { BaseBlock } from './BaseBlock'

export const NumberBlock: Block = {
  slug: 'number-type',
  fields: BaseBlock.fields,
}
