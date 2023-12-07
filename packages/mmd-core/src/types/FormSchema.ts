import { FormField } from "./FormField";

export type FormSchema = {
  name: string;
  sections: Array<{
    name: string;
    label: string;
    fields: Array<FormField>;
  }>;
};
