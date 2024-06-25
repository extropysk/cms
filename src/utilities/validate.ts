import { Validate } from "payload/types";

export const validateUnique =
  (field: string): Validate =>
  (val) => {
    // return values from unique field
    const values = val?.map((row) => row[field]);
    // check if there are any duplicate values
    const hasDuplicates = new Set(values).size !== values?.length;

    if (hasDuplicates) return "Duplicate values in array";
    if (!hasDuplicates) return true;
  };
