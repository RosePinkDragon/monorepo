const isDisabledCheck = ({
  isDisabledField,
  dependentFieldValue,
  isDependentOn,
  dependentOnValues,
}: {
  isDisabledField?: boolean;
  dependentFieldValue?: string | number | boolean | Array<string | number>;
  isDependentOn?: string;
  dependentOnValues?: (string | number | boolean)[];
}): boolean => {
  if (isDisabledField) return true;

  if (isDependentOn) {
    if (!dependentFieldValue) return true;
    if (dependentOnValues) {
      if (Array.isArray(dependentFieldValue)) {
        return Boolean(
          !dependentFieldValue.some((x) => dependentOnValues.includes(x))
        );
      }
      return Boolean(!dependentOnValues.includes(dependentFieldValue));
    }

    //  this type of fields are not looking for any specific value
    if (Array.isArray(dependentFieldValue)) {
      return Boolean(!dependentFieldValue.includes(isDependentOn));
    }
    return isDependentOn ? Boolean(!dependentFieldValue) : false;
  }
  return false;
};

export default isDisabledCheck;
