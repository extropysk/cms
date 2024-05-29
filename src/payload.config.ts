import path from "path";

import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import seo from "@payloadcms/plugin-seo";
import { GenerateTitle } from "@payloadcms/plugin-seo/dist/types";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload/config";
import { Media } from "./collections/media";
import { Posts } from "./collections/posts";
import { Tags } from "./collections/tags";
import { Users } from "./collections/users";

const generateTitle: GenerateTitle = () => {
  return "My Store";
};

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [Users, Tags, Posts, Media],
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
