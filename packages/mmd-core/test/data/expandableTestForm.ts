import { TFormSchema } from "../../src";

const expandableTestForm: TFormSchema = {
  name: "form name",
  sections: [
    {
      name: "section1Name",
      label: "section label",
      formFields: [
        {
          name: "field1Name",
          label: "field 1 label",
          type: "text",
          initialValue: "initialValueForField",
        },
      ],
    },
  ],
};

export default expandableTestForm;
