import React from "react";
import { useFormikContext } from "formik";

import TextInputField from "../MemoizedFields/TextInputField";
import BooleanComponentField from "../MemoizedFields/BooleanFieldCheckBox";

import type { FormikValues } from "formik";
import type { TFormField } from "~/types";

const BooleanField = ({
  field,
  value,
  error,
  isDisabled,
  parentValue,
}: {
  field: TFormField & { type: "boolean" };
  value: string;
  error: string;
  isDisabled: boolean;
  parentValue?: Array<"on">;
}) => {
  const { name, label, required, tooltips, isDisabledField, placeholder } =
    field;

  const { handleChange, setFieldValue } = useFormikContext<FormikValues>();

  const booleanHandleChange = (e: React.ChangeEvent<any>) => {
    if (parentValue instanceof Array && parentValue.length === 0) {
      setFieldValue(`${name}-changer`, ["on"]);
    } else {
      setFieldValue(name, "");
      handleChange(e);
    }
  };

  const isDisbaledTextField =
    Array.isArray(parentValue) && parentValue.includes("on");

  return (
    <>
      <BooleanComponentField
        tooltips={tooltips}
        name={`${name}-changer`}
        handleChange={booleanHandleChange}
        required={required}
        label={label}
        isDisabledField={isDisabled}
        value={parentValue}
        isDefaultChecked={
          Array.isArray(parentValue) && parentValue.includes("on")
        }
      />
      <TextInputField
        type="text"
        placeholder={placeholder}
        handleChange={handleChange}
        required={parentValue && parentValue.toString() === "on"}
        value={value}
        isDisabledField={isDisabledField || !isDisbaledTextField}
        name={name}
        error={error}
      />
    </>
  );
};

export default BooleanField;
