import { Formik } from "formik";
import { useMemo } from "react";
import FormSection from "./FormSection";

import getInitialValuesFromForm from "../utils/getInitialValuesFromForm";
import { FormHeading } from "./FormComponents";
import { IFormGeneratorProps } from "../types/formGenerator";
import createValidationSchema from "../utils/validationSchemaGenerator";

const FormGenerator = ({
  formData,
  AfterFieldComponent,
  FormEndComponent,
  extendedSchema,
  initialFormErrors,
  initialFormValues,
  isViewOnly = false,
  submitHandler,
}: Readonly<IFormGeneratorProps>) => {
  const validationSchema = useMemo(
    () => createValidationSchema(formData, extendedSchema),
    [extendedSchema, formData]
  );

  const { sections: formSections } = formData;

  const genInitialValues = () => {
    const initialValuesFromForm = getInitialValuesFromForm(formSections);
    if (!initialFormValues) return initialValuesFromForm;
    return { ...initialFormValues, ...initialValuesFromForm };
  };

  const initialValues = genInitialValues();

  return (
    <Formik
      initialErrors={initialFormErrors}
      initialTouched={initialFormErrors}
      validateOnMount={Boolean(initialFormErrors)}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, act) => {
        if (isViewOnly || !submitHandler) {
          return console.log(
            "you are in view only mode or you have not passed submit handler"
          );
        }
        submitHandler({ values, act });
      }}
    >
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {formData.name && <FormHeading heading={formData.name} />}
          {formSections.map((section) => {
            if (
              section.enabledOnValue &&
              section.sectionDependentOn &&
              values[section.sectionDependentOn ?? ""] !==
                section.enabledOnValue
            ) {
              return null;
            }
            return (
              <FormSection
                {...section}
                key={section.name}
                isViewOnly={isViewOnly}
                AfterFieldComponent={AfterFieldComponent}
              />
            );
          })}
          {FormEndComponent}
        </form>
      )}
    </Formik>
  );
};

export default FormGenerator;
