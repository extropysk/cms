import {
  SelectInput,
  getSiblingData,
  useAllFormFields,
  useField,
} from "payload/components/forms";
import { Product } from "payload/generated-types";
import { SelectField } from "payload/types";
import * as React from "react";
import { useFindById } from "../../hooks/query";

type Props = SelectField & {
  path: string;
};

export const VariantSelectComponent: React.FC<Props> = ({
  path,
  label,
  required,
}) => {
  const { value, setValue } = useField<string>({ path });

  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, path);

  const { data } = useFindById<Product>("products", siblingData.product);
  return (
    <SelectInput
      label={label}
      path={path}
      name={path}
      required={required}
      options={(data?.variants ?? []).map((variant) => ({
        label: variant.title,
        value: variant.id,
      }))}
      value={value}
      onChange={(e) => setValue(e?.value)}
    />
  );
};
