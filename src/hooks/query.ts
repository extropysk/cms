import { useQuery } from "@tanstack/react-query";
import { Config } from "payload/generated-types";
import { ajax } from "../utilities/ajax";

const get = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();

  const countryOptions = data.map((country) => {
    return {
      label: `${country.name.common + " " + country.flag}`,
      value: country.name.common,
    };
  });
  countryOptions.sort((a, b) => a.label.localeCompare(b.label));
  return countryOptions;
};

export const useCollectionQuery = () => {
  return useQuery({ queryKey: ["todos"], queryFn: get });
};

type Collection = keyof Config["collections"];

export const useFindById = <T>(collection: Collection, id?: string) => {
  const url = `/api/${collection}/${id}`;

  return useQuery({
    queryKey: [collection, id],
    queryFn: () => ajax<T>("GET", url),
    enabled: !!id,
  });
};
