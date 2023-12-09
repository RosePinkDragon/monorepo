import { TFormSchema } from "@mmd/core";

const formData: TFormSchema = {
  name: "form name",
  sections: [
    {
      name: "section1Name",
      label: "section label",
      formFields: [
        {
          name: "field1Name",
          label: "field label",
          type: "text",
          required: true,
        },
        {
          name: "field1Name",
          label: "field 3 label",
          type: "date",
        },
      ],
    },
    {
      name: "section2Name",
      label: "section label",
      formFields: [
        {
          name: "fieldName",
          label: "field label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default formData;
