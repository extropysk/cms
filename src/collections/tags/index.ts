import type { CollectionConfig } from "payload/types";
import { anyone } from "../../access/anyone";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
};
