import { TextField } from "@mui/material";
import { TextFieldProps } from "../../types/formField";
import { FormikValues, useFormikContext } from "formik";

const TextInput = ({ field }: { field: TextFieldProps }) => {
  const { name, label, type, required, placeholder } = field;
  const { values, handleChange, errors } = useFormikContext<FormikValues>();

  return (
    <div>
      <TextField
        margin="normal"
        key={name}
        id={name}
        placeholder={placeholder}
        name={name}
        label={label}
        onChange={handleChange}
        value={values[name]}
        type={type}
        required={required}
      />
      <p>{errors[name] || "no eror"}</p>
    </div>
  );
};

export default TextInput;
