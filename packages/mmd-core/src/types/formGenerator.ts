import type { FormikHelpers, FormikValues } from "formik";
import type { TFormSchema } from "./formSchema";
import type { AnyObject } from "yup";
import type { ReactElement } from "react";

export interface IFormGeneratorProps {
  formData: TFormSchema;
  initialFormValues?: FormikValues;
  isViewOnly?: boolean;
  initialFormErrors?: any;
  extendedSchema?: AnyObject;
  FormEndComponent?: React.JSX.Element | ReactElement | null;
  AfterFieldComponent?: React.FC<any> | ReactElement | null;
  submitHandler?: ({
    values,
    act,
  }: {
    values: FormikValues;
    act?: FormikHelpers<FormikValues>;
  }) => void;
}
