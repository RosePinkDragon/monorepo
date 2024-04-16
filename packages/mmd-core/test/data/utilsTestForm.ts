import type { TFormSchema } from "~/types";

const formData: TFormSchema = {
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
          initialValue: "initialValueForField1",
          required: true,
        },
        {
          name: "field2Name",
          label: "field 3 label",
          initialValue: "initialValueForField2",
          type: "text",
          regEx: "^[a-zA-Z ]*$",
          errMsg: "Enter Proper Name",
          required: true,
        },
      ],
    },
    {
      name: "section2Name",
      label: "section label",
      enabledOnValue: "test",
      sectionDependentOn: "field1Name",
      formFields: [
        {
          name: "fieldName",
          label: "field 1 label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default formData;
