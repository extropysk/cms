import {
  SelectInput,
  getSiblingData,
  useAllFormFields,
  useField,
} from "payload/components/forms";
import { Option } from "payload/generated-types";
import { SelectField } from "payload/types";
import * as React from "react";
import { useFindById } from "../../hooks/query";

type Props = SelectField & {
  path: string;
};

export const OptionSelectComponent: React.FC<Props> = ({
  path,
  label,
  required,
}) => {
  const { value, setValue } = useField<string>({ path });

  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, path);

  const { data } = useFindById<Option>("options", siblingData.option);

  return (
    <SelectInput
      label={label}
      path={path}
      name={path}
      required={required}
      options={(data?.values ?? []).map(({ label, value }) => ({
        label: label ?? value,
        value,
      }))}
      value={value}
      onChange={(e) => setValue(e?.value)}
    />
  );
};
