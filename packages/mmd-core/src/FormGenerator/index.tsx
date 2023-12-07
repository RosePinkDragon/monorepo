import { FormSchema } from "../types/FormSchema";
import { Form, Formik, FormikValues } from "formik";

export interface FormGeneratorProps {
  formData: FormSchema;
  initialValues?: FormikValues;
}

export function FormGenerator({
  formData,
  initialValues,
}: Readonly<FormGeneratorProps>) {
  return (
    <Formik
      initialValues={initialValues ?? {}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

FormGenerator.displayName = "FormGenerator";
