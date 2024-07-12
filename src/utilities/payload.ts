import { Payload } from '@extropysk/payload'
import type { Config } from 'payload/generated-types'

export const payload = new Payload<Config['collections']>()
