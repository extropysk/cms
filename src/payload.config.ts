import path from 'path'

import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import seo from '@payloadcms/plugin-seo'
import type { GenerateTitle } from '@payloadcms/plugin-seo/dist/types'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import { Posts } from './collections/blog/posts'
import { Forms } from './collections/builder/forms'
import { Carts } from './collections/commerce/carts'
import { Options } from './collections/commerce/options'
import { Products } from './collections/commerce/products'
import { Categories } from './collections/common/categories'
import { Media } from './collections/common/media'
import { Users } from './collections/common/users'
import { QueryProvider } from './components/providers/queryProvider'
import { getStripeCustomers, getStripeProducts } from './endpoints/stripe'

const generateTitle: GenerateTitle = () => {
  return 'My Store'
}

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      providers: [QueryProvider],
    },
    css: path.resolve(__dirname, 'styles/global.scss'),
  },
  endpoints: [
    {
      path: '/stripe/products',
      method: 'get',
      handler: getStripeProducts,
    },
    {
      path: '/stripe/customers',
      method: 'get',
      handler: getStripeCustomers,
    },
  ],
  editor: lexicalEditor({}),
  collections: [Forms, Posts, Categories, Media, Users, Options, Products, Carts],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  cors: '*',
  csrf: [],
  rateLimit: {
    trustProxy: true,
  },
  plugins: [
    seo({
      collections: ['posts'],
      generateTitle,
      uploadsCollection: 'media',
    }),
  ],
})
