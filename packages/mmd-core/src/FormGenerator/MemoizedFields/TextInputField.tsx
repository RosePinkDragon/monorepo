import { Box, InputLabel, TextField } from "@mui/material";
import { memo } from "react";

import type { TextInputFieldProps } from "~/types/memoizedInputTypes";

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
    error,
    tooltips,
  }: Readonly<TextInputFieldProps>) => {
    return (
      <>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          {label && (
            <InputLabel
              sx={{
                whiteSpace: "normal",
              }}
            >
              {label}
            </InputLabel>
          )}
          {tooltips && <p>{tooltips}</p>}
        </Box>
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
        {error && <p>{error}</p>}
      </>
    );
  }
);

export default TextInputField;
