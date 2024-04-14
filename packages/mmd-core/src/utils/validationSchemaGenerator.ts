import * as Yup from "yup";

import { baseRuleGenerator } from "./ruleGenerators";

import type { FormikValues } from "formik";
import type { TFormField, TFormSchema } from "~/types";

export const fieldSchemaGenerator = (field: TFormField, obj: FormikValues) => {
  const {
    name,
    label,
    type,
    required,
    regEx,
    errMsg,
    isDependentOn,
    dependentOnValues,
  } = field;

  let rule = baseRuleGenerator(field, obj);

  if (!rule) return;

  if (
    dependentOnValues &&
    isDependentOn &&
    !dependentOnValues.includes(obj[isDependentOn])
  )
    return null;

  if (required) {
    rule = rule.required(`Please enter ${label.toLowerCase()}`);
  }

  if (regEx) {
    rule = rule.test("regex", errMsg ?? "Invalid Field", (val) => {
      console.log(name, val);
      if (!val || val === "") return !required;
      const regex = new RegExp(regEx);
      return regex.test(val.toString());
    });
  }

  return rule ? rule : null;
};

// Helper function to check if a section should be enabled based on the dependent value
const matchesDependentValue = (
  actualValue: any,
  expectedValue: any
): boolean => {
  if (Array.isArray(expectedValue)) {
    return expectedValue.includes(actualValue);
  }
  return actualValue === expectedValue;
};

// Loops through all sections and form fields to generate the schema
const baseSchemaGenerator = (schema: TFormSchema, obj: FormikValues) => {
  return schema.sections.reduce((acc, section) => {
    if (section.sectionDependentOn && section.enabledOnValue !== undefined) {
      if (
        !matchesDependentValue(
          obj[section.sectionDependentOn],
          section.enabledOnValue
        )
      )
        return acc; // Skip section if it doesn't match the dependent value
    }

    const sectionRules = section.formFields.reduce((sectionAcc, field) => {
      const rule = fieldSchemaGenerator(field, obj);
      if (!rule) return sectionAcc;
      return { ...sectionAcc, [field.name]: rule };
    }, {});

    return { ...acc, ...sectionRules };
  }, {});
};

// Create Validation Schema
const createValidationSchema = (
  schema: TFormSchema,
  extendedSchema?: Yup.ObjectSchema<any>
) => {
  return Yup.lazy((obj: FormikValues) => {
    const baseSchema = Yup.object().shape(baseSchemaGenerator(schema, obj));
    if (extendedSchema) {
      return extendedSchema.concat(baseSchema);
    }
    return baseSchema;
  });
};

export default createValidationSchema;
