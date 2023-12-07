import { TextField } from "@mui/material";
import { TextFieldProps } from "../types/FormField";

const TextInput = ({ field }: { field: TextFieldProps }) => {
  const { name, label, type, required, placeholder } = field;

  return (
    <div>
      <TextField
        margin="normal"
        key={name}
        id={name}
        placeholder={placeholder}
        name={name}
        label={label}
        type={type}
        required={required}
      />
    </div>
  );
};

export default TextInput;
