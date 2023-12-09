import { TFormSchema } from "../types";

/**
 * Use this function to get a form field along with section details
 * @param schema Form Schema
 * @param key Element name to find
 * @returns An object containing the form field and section details
 */
export const getFieldWithSection = (schema: TFormSchema, key: string) => {
  const result = schema.sections
    .flatMap((section) =>
      section.formFields.map((formField) => ({
        formField,
        sectionName: section.name,
        isDependentOn: section.sectionDependentOn || null,
        dependentOnValue: section.enabledOnValue || null,
      }))
    )
    .find((field) => field.formField?.name === key);

  return result || null; // Return null if the field is not found in any section
};
