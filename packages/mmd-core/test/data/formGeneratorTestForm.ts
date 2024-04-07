import { TFormSchema } from "../../src";

const formGeneratorTestForm: TFormSchema = {
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
          initialValue: "initialValue1",
          required: true,
        },
        {
          name: "field2Name",
          label: "field 3 label",
          initialValue: "initialValue2",
          type: "text",
          // regEx: "^[a-zA-Z ]*$",
          errMsg: "Enter Proper Name",
          required: true,
        },
      ],
    },
    {
      name: "section2Name",
      label: "section 2 label",
      enabledOnValue: "test",
      sectionDependentOn: "field1Name",
      formFields: [
        {
          name: "fieldName",
          label: "field 1 label",
          type: "text",
        },
      ],
    },
  ],
};

export default formGeneratorTestForm;
