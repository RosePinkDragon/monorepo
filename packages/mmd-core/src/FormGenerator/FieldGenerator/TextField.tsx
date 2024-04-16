import { useState } from "react";
import { debounce } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import { TFormField } from "~/types";
import { TTextField } from "~/types/formField";
import TextInputField from "../MemoizedFields/TextInputField";

const TextInput = ({
  field,
  value,
  error,
  isDisabled,
}: {
  field: TFormField & TTextField;
  value: string;
  error: string;
  isDisabled: boolean;
}) => {
  const [inputValue, setInputValue] = useState(value);

  const { name, label, type, required, placeholder, tooltips } = field;

  const { handleChange, touched } = useFormikContext<FormikValues>();
  const debouncedInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedInput(event);
  };

  return (
    <TextInputField
      name={name}
      placeholder={placeholder}
      label={label}
      isDisabledField={isDisabled}
      handleChange={handleInputChange}
      value={inputValue}
      type={type}
      required={required}
      touched={Boolean(touched[name])}
      error={error}
      tooltips={tooltips}
    />
  );
};

export default TextInput;
