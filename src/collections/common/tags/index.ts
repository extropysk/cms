import type { CollectionConfig } from "payload/types";
import { anyone } from "../../../access/anyone";

export const Tags: CollectionConfig = {
  slug: "tags",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: anyone,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};