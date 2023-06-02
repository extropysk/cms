import type { Block } from 'payload/types'

import { BaseBlock } from './BaseBlock'

export const StringBlock: Block = {
  slug: 'string-type',
  fields: BaseBlock.fields,
}
