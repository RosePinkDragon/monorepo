import { FormikValues } from "formik";
import { TFormSection } from "../types/formSection";

const getInitialValuesFromForm = (
  formSections: TFormSection[]
): FormikValues => {
  const initialValues: FormikValues = {};
  formSections?.forEach((section) => {
    section?.formFields?.forEach((field) => {
      if (field.initialValue) {
        initialValues[field.name] = field.initialValue;
      }
    });
  });
  return initialValues;
};

export default getInitialValuesFromForm;
