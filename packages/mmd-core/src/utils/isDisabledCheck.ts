/**
 * Checks if a field should be disabled based on certain conditions.
 * @param {Object} options - The options object.
 * @param {boolean} options.isDisabledField - Indicates if the field is disabled.
 * @param {string} options.isDependentOn - The field that the current field depends on.
 * @param {Array<string | number | boolean>} options.dependentOnValues - The values that the dependent field can have for the current field to be disabled.
 * @param {string | number | boolean | Array<string | number>} options.dependentFieldValue - The value of the dependent field.
 * @returns {boolean} - Returns true if the field should be disabled, false otherwise.
 */
const isDisabledCheck = ({
  isDisabledField,
  isDependentOn,
  dependentOnValues,
  dependentFieldValue,
}: {
  isDisabledField?: boolean;
  isDependentOn?: string;
  dependentOnValues?: (string | number | boolean)[];
  dependentFieldValue?: string | number | boolean | Array<string | number>;
}): boolean => {
  if (isDisabledField) return true;

  // if there is nothing to depend on, then the field should be not be disabled
  if (!isDependentOn) return false;

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

  // if the dependent field is an array and it is empty, then the field should be disabled
  if (Array.isArray(dependentFieldValue)) {
    return Boolean(dependentFieldValue.length === 0);
  }
  return Boolean(!dependentFieldValue);
};

export default isDisabledCheck;
