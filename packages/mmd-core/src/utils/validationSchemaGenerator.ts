import * as Yup from "yup";
import type { TFormSchema } from "../types";
import { FormikValues } from "formik";
import { getFieldWithSection } from "./getFieldWithSectionData";
import { baseRuleGenerator } from "./ruleGenerators";

const baseSchemaGenerator = (schema: TFormSchema, obj: FormikValues) => {
  const baseSchema = Object.keys(obj).reduce((prev, key) => {
    const fieldData = getFieldWithSection(schema, key);

    if (!fieldData) return prev;

    const { dependentOnValue, formField: field, isDependentOn } = fieldData;

    if (!field) return prev;

    if (
      dependentOnValue &&
      isDependentOn &&
      obj[isDependentOn] !== dependentOnValue
    )
      return prev;

    const { type: fieldType } = field;
    let rule = baseRuleGenerator(field);

    if (rule && field.required) {
      rule = rule.required(`Please enter ${field.label.toLowerCase()}`);

      if (fieldType !== "date" && field.regEx)
        rule = rule.test("regex", field.errMsg ?? "Invalid Field", (val) => {
          if (!val || val === "") return true;
          const regexFromField = new RegExp(field.regEx ?? "");
          return regexFromField.test(val.toString());
        });
    }
    if (rule) {
      return { ...prev, [key]: rule };
    }
    return prev;
  }, {});

  return Yup.object(baseSchema);
};

const createValidationSchema = (
  schema: TFormSchema,
  extendedSchema?: Yup.AnyObject
) => {
  return Yup.lazy((obj: FormikValues) => {
    const baseSchema = baseSchemaGenerator(schema, obj);
    if (extendedSchema) {
      return extendedSchema.concat(baseSchema);
    }
    return baseSchema;
  });
};

export default createValidationSchema;
