import Grid from "@mui/material/Unstable_Grid2";
import { Typography, Box, Button, FormHelperText } from "@mui/material";
import { FaTrash, FaPlus } from "react-icons/fa";
import FieldGenerator from ".";
import { FieldArray } from "formik";
import { TFormField } from "../../types";
import { TArrayField } from "../../types/formField";
import { ReactNode } from "react";

const FieldArrayType = ({
  field,
  value,
  error,
  touched,
  isDisabled,
  AfterFieldComponent,
}: {
  field: TFormField & TArrayField;
  value: Record<string, any>[];
  error: string;
  touched: boolean;
  isDisabled: boolean;
  AfterFieldComponent: ReactNode;
}) => {
  return (
    <FieldArray key={field.name} name={field.name}>
      {({ push, remove }) => (
        <>
          <Typography
            color="primary"
            fontWeight="bold"
            variant="h5"
            marginBottom={2}
          >
            {field.label}
          </Typography>

          {value?.length > 0 &&
            value.map((_: object, valIdx: number) => (
              <>
                <Box
                  key={`${field.name}_${valIdx}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  marginY={2}
                >
                  <Typography>{`${field.label} ${valIdx + 1}`}</Typography>
                  {!isDisabled && (
                    <Button
                      size="small"
                      type="button"
                      color="error"
                      startIcon={<FaTrash />}
                      variant="contained"
                      className="secondary"
                      onClick={() => remove(valIdx)}
                    >
                      Remove
                    </Button>
                  )}
                </Box>
                <Grid
                  key={field.name}
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  container
                  spacing={2}
                  rowSpacing={1}
                >
                  {field.formFields?.map((innerField) => {
                    const newName = `${field.name}.${valIdx}.${innerField.name}`;
                    return (
                      <Grid key={field.name} xs={12} sm={12} md={6} lg={6}>
                        <FieldGenerator
                          field={{
                            ...innerField,
                            name: newName,
                            isDisabledField: isDisabled
                              ? true
                              : field.isDisabledField,
                          }}
                          AfterFieldComponent={AfterFieldComponent as any}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ))}
          {!isDisabled && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormHelperText error>{error}</FormHelperText>
              <Button
                sx={{
                  marginTop: "5px",
                }}
                size="small"
                type="button"
                variant="contained"
                onClick={() => push({})}
                startIcon={<FaPlus />}
              >
                Add
              </Button>
            </Box>
          )}
        </>
      )}
    </FieldArray>
  );
};

export default FieldArrayType;
