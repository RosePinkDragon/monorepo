import { useMemo } from "react";
import { getIn, useFormikContext } from "formik";
import isDisabledCheck from "~/utils/isDisabledCheck";

import type { FormikValues } from "formik";
import type { TFormField } from "~/types";

/**
 * Custom hook to get field data for a given form field.
 *
 * @param field - The form field object.
 * @returns An object containing the field value, error message, touched state, and disabled state.
 */
const useGetFieldData = (field: TFormField) => {
  const {
    errors,
    values,
    touched: touchedFormik,
    initialErrors,
  } = useFormikContext<FormikValues>();
  const { name: fieldName, isDependentOn, type } = field;

  const value = getIn(values, fieldName);
  const error = getIn(errors, fieldName) || false;
  const touched = getIn(touchedFormik, fieldName) || false;
  const initialFieldError = getIn(initialErrors, fieldName) || false;
  const parentValue =
    type === "boolean" ? getIn(values, field.name + "-checker") : null;
  const isDisabled = isDisabledCheck({
    isDisabledField: field.isDisabledField,
    isDependentOn: field.isDependentOn,
    dependentOnValues: field.dependentOnValues,
    dependentFieldValue: isDependentOn ? getIn(values, isDependentOn) : false,
  });

  return useMemo(() => {
    return {
      value,
      error: initialFieldError || error,
      touched: Boolean(initialFieldError) || Boolean(touched),
      isDisabled: isDisabled,
      parentValue,
    };
  }, [value, initialFieldError, error, touched, isDisabled]);
};

export default useGetFieldData;
