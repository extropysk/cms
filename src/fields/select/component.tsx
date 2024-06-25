import {
  SelectInput,
  getSiblingData,
  useAllFormFields,
  useField,
} from "payload/components/forms";
import { Option } from "payload/generated-types";
import * as React from "react";
import { useCollectionQuery, useFindById } from "../../hooks/query";

export const CustomSelectComponent: React.FC<{ path: string }> = ({ path }) => {
  const { value, setValue } = useField<string>({ path });
  //   const [options, setOptions] = React.useState([]);

  const [fields] = useAllFormFields();
  const siblingData = getSiblingData(fields, path);
  //   console.log(siblingData);

  //   // Fetch options on component mount
  //   React.useEffect(() => {
  //     const fetchOptions = async () => {
  //       try {
  //         const response = await fetch("https://restcountries.com/v3.1/all");
  //         const data = await response.json();

  //         const countryOptions = data.map((country) => {
  //           return {
  //             label: `${country.name.common + " " + country.flag}`,
  //             value: country.name.common,
  //           };
  //         });

  //         setOptions(
  //           countryOptions.sort((a, b) => a.label.localeCompare(b.label))
  //         );
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchOptions();
  //   }, []);

  const { data: options } = useCollectionQuery();

  const { data: option } = useFindById<Option>("options", siblingData.option);

  return (
    <div>
      <label className="field-label">Custom Select</label>
      <SelectInput
        path={path}
        name={path}
        options={(option?.values ?? []).map((value) => ({
          label: value,
          value,
        }))}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
