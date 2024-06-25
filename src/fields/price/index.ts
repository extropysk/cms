import { Field } from "payload/types";

enum Currency {
  EUR = "eur",
}

type Options = {
  required?: boolean;
};

export const priceField = ({ required }: Options): Field => ({
  name: "price",
  type: "group",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "amount",
          type: "number",
          required,
        },
        {
          name: "currencyCode",
          type: "select",
          required,
          defaultValue: Currency.EUR,
          options: Object.values(Currency).map((currency) => ({
            label: currency,
            value: currency,
          })),
        },
      ],
    },
  ],
});
