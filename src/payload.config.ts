import path from 'path'
import { buildConfig } from 'payload/config'

import { Forms } from './collections/Forms'
import { Users } from './collections/Users'

export default buildConfig({
  collections: [Users, Forms],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
