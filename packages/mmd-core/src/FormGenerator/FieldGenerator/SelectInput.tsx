import { FormikValues, getIn, useFormikContext } from "formik";

import type { TFormField } from "~/types";
import { SelectInputField } from "../MemoizedFields/SelectInputField";
import useSetFieldOptions from "../hooks/useSetFieldOptions";
import usePrevious from "../hooks/usePrevious";
import { useEffect } from "react";

const SelectInput = ({
  field,
  value,
  error,
  isDisabled,
}: {
  field: TFormField & { type: "select" };
  value: string;
  error: string;
  isDisabled: boolean;
}) => {
  const { values, touched, handleChange, setFieldValue, setFieldTouched } =
    useFormikContext<FormikValues>();

  const { name, label, isDependentOn, required, tooltips, placeholder } = field;

  const { fieldOptions, loading } = useSetFieldOptions({ field });

  const dependentFieldValue = isDependentOn ? getIn(values, isDependentOn) : "";

  const prevValue = usePrevious(value);
  const prevDependentFieldValue = usePrevious(dependentFieldValue);
  const isDependentTouched = isDependentOn
    ? Boolean(getIn(touched, isDependentOn))
    : false;

  useEffect(() => {
    /**
     * THE BELOW IF SHOULD BE LAST RESORT
     *
     * State Update Queueing: setFieldValue is part of a batched state update,
     * it might not immediately reflect changes in the values object.
     * React sometimes batches state updates for performance reasons.
     * To force an immediate update, you might consider using setTimeout with a delay of 0.
     * but this is a hacky way and we dont want to use that🤮
     *
     */

    // This set's the value to the available value in first field
    if (
      fieldOptions.length === 1 &&
      prevValue !== fieldOptions[0]?.value &&
      fieldOptions[0]?.value
    ) {
      setTimeout(() => {
        setFieldValue(name, fieldOptions[0]?.value);
      }, 0);
      return;
    }

    // set value to null if the dependent field changes
    if (isDependentTouched && prevDependentFieldValue !== dependentFieldValue)
      setFieldValue(name, "");
  }, [
    dependentFieldValue,
    fieldOptions,
    isDependentTouched,
    name,
    prevDependentFieldValue,
    prevValue,
    setFieldValue,
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeHanler = (e: any) => {
    setFieldTouched(e.target.name);
    handleChange(e);
  };

  return (
    <SelectInputField
      name={name}
      label={label}
      currentValue={value}
      error={error}
      required={required}
      touched={!!getIn(touched, name)}
      isDisabled={isDisabled}
      loading={loading}
      fieldOptions={fieldOptions}
      changeHandler={changeHanler}
      tooltips={tooltips}
      placeholder={placeholder}
    />
  );
};

export default SelectInput;
