import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { memo } from "react";
import Tooltips from "../FormComponents/Tooltips";

export const SelectInputField = memo(function SelectInputField({
  name,
  label,
  currentValue,
  touched,
  error,
  required,
  isDisabled,
  placeholder,
  loading,
  fieldOptions,
  changeHandler,
  tooltips,
}: any) {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems={"center"}>
        {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
        {tooltips && <Tooltips tooltips={tooltips} />}
      </Box>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={currentValue ? currentValue.toString() : ""}
        onChange={changeHandler}
        error={touched && Boolean(error)}
        required={required}
        disabled={isDisabled}
        sx={{
          width: "100%",
        }}
      >
        <MenuItem dense value="">
          {placeholder ?? `Select a value`}
        </MenuItem>
        {loading ?? !fieldOptions ? (
          <MenuItem dense value="">
            Please Enter A Value
          </MenuItem>
        ) : (
          fieldOptions?.map((option: { value: string; label: string }) => (
            <MenuItem dense key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
        )}
      </Select>
      {touched && error && <FormHelperText error>{error}</FormHelperText>}
    </>
  );
});
