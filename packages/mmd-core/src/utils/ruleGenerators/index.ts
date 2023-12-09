import dateRuleGenerator from "./dateRuleGenerator";
import textRuleGenerator from "./textRuleGenerator";
import multipleAnswersRuleGenerator from "./multipleAnswersRuleGenerator";
import * as Yup from "yup";

import { TFormField } from "../../types";
import { TMultiFields } from "../../types/formField";

export const textTypeFields: Array<TFormField["type"]> = [
  "text",
  "textArea",
  "text",
  "textArea",
  "tel",
  "email",
  "password",
];

export const selectableFieldTypes: Array<TFormField["type"]> = [
  "checkbox",
  "multi-select",
  "radio",
  "select",
];

export const baseRuleGenerator = (field: TFormField) => {
  const { type: fieldType } = field;

  if (textTypeFields.includes(fieldType)) return textRuleGenerator(field);

  if (fieldType === "number") {
    return Yup.number()
      .typeError(`${field.label} must be a number`)
      .positive(`${field.label} must be positive`);
  }

  if (fieldType === "date") {
    return dateRuleGenerator();
  }

  if (fieldType === "boolean") {
    return Yup.string().when(`${field.name}-changer`, {
      is: (val: string[]) => val?.includes("on"), // alternatively: (val) => val == true
      then: (sch) =>
        sch.required("This field is required. Please enter the details"),
      otherwise: (sch) => sch.notRequired().nullable(),
    });
  }

  if (selectableFieldTypes.includes(fieldType))
    return multipleAnswersRuleGenerator(field as TFormField & TMultiFields);

  return null;
};
