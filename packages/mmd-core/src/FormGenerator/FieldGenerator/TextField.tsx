import { memo } from "react";
import { TextField } from "@mui/material";
import { FormikValues, useFormikContext } from "formik";
import { TFormField } from "../../types";
import { TTextField } from "../../types/formField";

export type TextInputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  isDisabledField?: boolean;
  value: string;
  type: string;
  required?: boolean;
  touched?: boolean;
  error?: string;
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
};

const TextInputField = memo(
  ({
    name,
    placeholder,
    label,
    isDisabledField,
    handleChange,
    value,
    type,
    required,
    touched,
    error,
  }: Readonly<TextInputFieldProps>) => {
    return (
      <>
        <TextField
          margin="normal"
          key={name}
          id={name}
          placeholder={placeholder}
          name={name}
          label={label}
          disabled={isDisabledField}
          onChange={handleChange}
          value={value}
          type={type}
          required={required}
          aria-label={name}
        />
        {touched && error && <p>{error}</p>}
      </>
    );
  }
);

const TextInput = ({
  field,
  value,
  error,
  touched,
  isDisabled,
}: {
  field: TFormField & TTextField;
  value: string;
  error: string;
  touched: boolean;
  isDisabled: boolean;
}) => {
  const { name, label, type, required, placeholder } = field;
  const { handleChange } = useFormikContext<FormikValues>();

  // console.log("isDisabled text :" + isDisabled);

  return (
    <TextInputField
      name={name}
      placeholder={placeholder}
      label={label}
      isDisabledField={isDisabled}
      handleChange={handleChange}
      value={value}
      type={type}
      required={required}
      touched={touched}
      error={error}
    />
  );
};

export default TextInput;
