import { Field } from "payload/types";
import { CustomSelectComponent } from "./component";

export const customSelectField = (): Field => ({
  name: "customSelectField",
  type: "text",
  admin: {
    components: {
      Field: CustomSelectComponent,
    },
  },
});
