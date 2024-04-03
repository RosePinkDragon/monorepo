import { getIn, useFormikContext } from "formik";
import { useMemo } from "react";
import { TFormField } from "../../types";
import isDisabledCheck from "../../utils/isDisabledCheck";

import type { FormikValues } from "formik";

/**
 * Custom hook to get field data for a given form field.
 *
 * @param field - The form field object.
 * @returns An object containing the field value, error message, touched state, and disabled state.
 */
const useGetFieldData = (
  field: TFormField
): { value: any; error: string; touched: boolean; isDisabled: boolean } => {
  const {
    errors,
    values,
    touched: touchedFormik,
    initialErrors,
  } = useFormikContext<FormikValues>();

  const { name: fieldName, isDependentOn } = field;
  const value = getIn(values, fieldName);
  const error = getIn(errors, fieldName) || false;
  const touched = getIn(touchedFormik, fieldName) || false;
  const initialFieldError = getIn(initialErrors, fieldName) || false;
  const isDisabled = isDisabledCheck({
    isDisabledField: field.isDisabledField,
    dependentFieldValue: isDependentOn ? getIn(values, isDependentOn) : false,
    isDependentOn: field.isDependentOn,
    dependentOnValues: field.dependentOnValues,
  });

  return useMemo(() => {
    return {
      value,
      error: initialFieldError || error,
      touched: Boolean(initialFieldError) || Boolean(touched),
      isDisabled: isDisabled,
    };
  }, [value, initialFieldError, error, touched, isDisabled]);
};

export default useGetFieldData;
