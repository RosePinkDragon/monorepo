import * as Yup from "yup";
import type { TFormSchema } from "../types";
import { FormikValues } from "formik";
import { baseRuleGenerator } from "./ruleGenerators";

const baseSchemaGenerator = (schema: TFormSchema, obj: FormikValues) => {
  const baseSchema = schema.sections
    .flatMap((section) => section.formFields)
    .reduce<any>((accSection, field) => {
      const {
        name,
        label,
        required,
        regEx,
        errMsg,
        isDependentOn,
        dependentOnValues,
      } = field;
      let rule = baseRuleGenerator(field);
      if (
        dependentOnValues &&
        isDependentOn &&
        !dependentOnValues.includes(obj[isDependentOn])
      )
        return;

      if (!rule) rule = new Yup.MixedSchema<any>();

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

      if (rule) {
        console.log(rule, name);
        accSection[name] = rule;
      }

      return accSection;
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
