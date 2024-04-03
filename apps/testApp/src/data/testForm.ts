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
          label: "field 1 label",
          type: "text",
          initialValue: "initialValueForField1",
          required: true,
          isDisabledField: false,
        },
        {
          name: "field2Name",
          label: "field 2 label",
          isDependentOn: "field1Name",
          dependentOnValues: ["testVal"],
          initialValue: "initialValueForField2",
          type: "text",
          regEx: "^[a-zA-Z ]*$",
          errMsg: "Enter Proper Name",
          required: true,
        },
      ],
    },
    // {
    //   name: "section2Name",
    //   label: "section label",
    //   // enabledOnValue: "test",
    //   // sectionDependentOn: "field1Name",
    //   formFields: [
    //     // {
    //     //   name: "fieldName",
    //     //   label: "field 1 label",
    //     //   type: "date",
    //     //   required: true,
    //     // },
    //     {
    //       name: "arrayfieldName",
    //       label: "arrat field 1 label",
    //       type: "arrayField",
    //       colspan: 3,
    //       formFields: [
    //         {
    //           name: "fieldNamearr1",
    //           label: "field 1 label arr",
    //           type: "text",
    //           required: true,
    //         },
    //       ],
    //       required: true,
    //     },
    //   ],
    // },
  ],
};

export default formData;
