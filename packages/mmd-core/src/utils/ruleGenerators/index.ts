import * as Yup from "yup";

import { fieldSchemaGenerator } from "../validationSchemaGenerator";
import dateRuleGenerator from "./dateRuleGenerator";
import textRuleGenerator from "./textRuleGenerator";
import multipleAnswersRuleGenerator from "./multipleAnswersRuleGenerator";

import type { TFormField } from "~/types";
import type { FormikValues } from "formik";
import type { TMultiFields } from "~/types/formField";

export const textTypeFields: Array<TFormField["type"]> = [
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

/**
 * Generates a Yup validation rule based on the provided field and object.
 *
 * @param field - The field object containing information about the field.
 * @param obj - The FormikValues object containing the form values.
 * @returns A Yup validation rule for the field.
 */
export const baseRuleGenerator = (field: TFormField, obj: FormikValues) => {
  const { type: fieldType } = field;

  if (textTypeFields.includes(fieldType)) return textRuleGenerator(field);

  if (fieldType === "number") {
    return Yup.number()
      .typeError(`${field.label} must be a number`)
      .positive(`${field.label} must be positive`);
  }

  if (fieldType === "date") {
    return dateRuleGenerator(field as TFormField & { type: "date" });
  }

  if (fieldType === "arrayField") {
    const innerObjSchema: { [key: string]: any } = {};

    field.formFields.forEach((field) => {
      innerObjSchema[field.name] = fieldSchemaGenerator(field, obj);
    });

    return Yup.array()
      .of(Yup.object().shape(innerObjSchema))
      .min(field.min ?? 0, `Please add at least ${field.min ?? 0} items`)
      .max(field.max ?? 99, `Please add only upto ${field.max ?? 99} items`);
  }

  if (fieldType === "boolean") {
    const checkboxName = `${field.name}-check`;
    const isCheckboxChecked =
      Array.isArray(obj[checkboxName]) && obj[checkboxName].includes("checked");

    return Yup.string().when(`${field.name}-changer`, {
      is: isCheckboxChecked, // alternatively: (val) => val == true
      then: (sch) =>
        sch.required("This field is required. Please enter the details"),
      otherwise: (sch) => sch.notRequired().nullable(),
    });
  }

  if (selectableFieldTypes.includes(fieldType))
    return multipleAnswersRuleGenerator(field as TFormField & TMultiFields);

  return null;
};
