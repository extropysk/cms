import type { CollectionConfig } from "payload/types";
import { anyone } from "../../access/anyone";

export const Options: CollectionConfig = {
  slug: "options",
  admin: {
    group: "Shop",
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
    {
      name: "values",
      type: "text",
      hasMany: true,
      required: true,
    },
  ],
};
