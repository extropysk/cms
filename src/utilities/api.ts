import type { Response } from 'express'
import type { Access } from 'payload/config'

import { APIError, ValidationError } from 'payload/errors'
import type { User } from 'payload/generated-types'
import type { PayloadRequest } from 'payload/types'
import type z from 'zod'
import { ZodError } from 'zod'

interface Request<B> extends PayloadRequest<User> {
  body: B
}

type Callback<B, R = unknown> = (req: Request<B>) => Promise<R>

interface Options {
  access?: Access
  schema?: z.AnyZodObject
}

export const handler = <B, R = unknown>(
  callback: Callback<B, R>,
  { access, schema }: Options = {},
) => {
  return async (req: Request<B>, res: Response) => {
    const id = req.params.id

    try {
      if (access) {
        if (!req.user) {
          throw new APIError('Unauthorized', 403)
        }
        if ((await access({ req, id })) === false) {
          throw new APIError('Forbidden', 403)
        }
      }

      if (schema) {
        req.body = schema.parse(req.body) as B
      }

      const data = await callback(req)
      res.json(data)
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).json({ errors: error.issues })
      } else if (error instanceof ValidationError) {
        const errors = error.isPublic ? error.data : undefined
        res.status(error.status).json({ message: error.message, errors })
      } else if (error instanceof APIError) {
        res.status(error.status).json({ message: error.message })
      } else {
        req.payload.logger.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
      }
    }
  }
}
