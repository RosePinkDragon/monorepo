import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { memo } from "react";

import Tooltips from "../FormComponents/Tooltips";

import type { BooleanCheckBoxFieldProps } from "~/types/memoizedInputTypes";

const BooleanComponentField = memo(
  ({
    name,
    label,
    isDisabledField,
    error,
    touched,
    tooltips,
    isDefaultChecked,
    handleChange,
    value,
  }: Readonly<BooleanCheckBoxFieldProps>) => {
    return (
      <>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            key={name}
            name={name}
            id={name}
            control={
              <Checkbox
                size="small"
                disabled={isDisabledField}
                id={name}
                defaultChecked={isDefaultChecked}
                name={name}
                onChange={handleChange}
                value={value}
              />
            }
            label={
              <Box margin={0} p={0}>
                {label && (
                  <InputLabel
                    sx={{
                      whiteSpace: "normal",
                    }}
                  >
                    {label}
                  </InputLabel>
                )}
              </Box>
            }
          />
          {tooltips && <Tooltips tooltips={tooltips} />}
        </Box>
        {touched && error && <FormHelperText error>{error}</FormHelperText>}
      </>
    );
  }
);

export default BooleanComponentField;
