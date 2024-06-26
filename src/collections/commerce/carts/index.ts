import type { CollectionConfig } from "payload/types";

export const Carts: CollectionConfig = {
  slug: "carts",
  admin: {
    group: "Shop",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      type: "array",
      name: "lines",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "product",
              type: "relationship",
              relationTo: "products",
            },
          ],
        },
      ],
    },
  ],
};
