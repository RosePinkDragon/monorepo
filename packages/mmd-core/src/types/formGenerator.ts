import type { FormikErrors, FormikHelpers, FormikValues } from "formik";
import type { TFormSchema } from "./formSchema";
import * as Yup from "yup";
import type { ReactElement } from "react";

export type IFormGeneratorProps = {
  formData: TFormSchema;
  initialFormValues?: FormikValues;
  initialFormErrors?: FormikErrors<FormikValues>;
  extendedSchema?: Yup.ObjectSchema<any>;
  FormEndComponent?: React.JSX.Element | ReactElement | null;
  AfterFieldComponent?: React.FC<any> | ReactElement | null;
} & (
  | {
      isViewOnly?: false; // Setting isViewOnly to false by default
      submitHandler: ({
        values,
        act,
      }: {
        values: FormikValues;
        act?: FormikHelpers<FormikValues>;
      }) => void;
    }
  | {
      isViewOnly: true; // Setting isViewOnly to true explicitly
      submitHandler: never; // Making submitHandler optional when isViewOnly is true
    }
);
