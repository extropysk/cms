import path from "path";

import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import seo from "@payloadcms/plugin-seo";
import { GenerateTitle } from "@payloadcms/plugin-seo/dist/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";
import { Posts } from "./collections/blog/posts";
import { Options } from "./collections/commerce/options";
import { Products } from "./collections/commerce/products";
import { Media } from "./collections/common/media";
import { Tags } from "./collections/common/tags";
import { Users } from "./collections/common/users";
import { QueryProvider } from "./components/queryProvider";

const generateTitle: GenerateTitle = () => {
  return "My Store";
};

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    components: {
      providers: [QueryProvider],
    },
    css: path.resolve(__dirname, "styles/global.scss"),
  },
  editor: lexicalEditor({}),
  collections: [Posts, Tags, Media, Users, Options, Products],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  plugins: [
    seo({
      collections: ["posts"],
      generateTitle,
      uploadsCollection: "media",
    }),
  ],
});
