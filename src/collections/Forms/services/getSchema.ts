import payload from 'payload'
import type { Form } from 'payload/generated-types'

const toSchema = ({ fields }: Form): { required: string[]; properties: object } => {
  const required: string[] = []
  const properties = {}
  fields.forEach(field => {
    if (field.required) {
      required.push(field.key)
    }

    properties[field.key] = {
      title: field.title,
      description: field.description,
      default: field.default,
      type: field.blockType.split(/[-_]+/).shift(),
    }
  })

  return { required, properties }
}

export const getSchema = async (id: string): Promise<object> => {
  try {
    const res = await payload.findByID({
      collection: 'forms',
      id,
    })

    const { properties, required } = toSchema(res)
    return {
      title: res.title,
      description: res.description,
      type: res.type,
      properties,
      required,
    }
  } catch (error: unknown) {
    return null
  }
}
