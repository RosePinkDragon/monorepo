import type { FormikErrors, FormikHelpers, FormikValues } from "formik";
import type { TFormSchema } from "./formSchema";
import type { AnyObject } from "yup";
import type { ReactElement } from "react";

export type IFormGeneratorProps =
  | {
      formData: TFormSchema;
      initialFormValues?: FormikValues;
      isViewOnly?: false; // Setting isViewOnly to false by default
      initialFormErrors?: FormikErrors<FormikValues>;
      extendedSchema?: AnyObject;
      FormEndComponent?: React.JSX.Element | ReactElement | null;
      AfterFieldComponent?: React.FC<any> | ReactElement | null;
      submitHandler: ({
        values,
        act,
      }: {
        values: FormikValues;
        act?: FormikHelpers<FormikValues>;
      }) => void;
    }
  | {
      formData: TFormSchema;
      initialFormValues?: FormikValues;
      isViewOnly: true; // Setting isViewOnly to true explicitly
      initialFormErrors?: any;
      extendedSchema?: AnyObject;
      FormEndComponent?: React.JSX.Element | ReactElement | null;
      AfterFieldComponent?: React.FC<any> | ReactElement | null;
      submitHandler?: never; // Making submitHandler optional when isViewOnly is true
    };
