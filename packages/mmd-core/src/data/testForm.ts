import { FormSchema } from "@mmd/core";

const formData: FormSchema = {
  name: "form name",
  sections: [
    {
      name: "section1Name",
      label: "section label",
      fields: [
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
      fields: [
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
