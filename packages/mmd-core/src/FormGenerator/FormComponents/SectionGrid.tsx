import { Box, Button, FormHelperText, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FaPlus, FaTrash } from "react-icons/fa";
import { FieldArray, FormikValues, useFormikContext } from "formik";

import { TFormField } from "../../types";
import FieldGenerator from "../FieldGenerator";

interface SectiongridProps {
  name: string;
  isDisabledSection?: boolean;
  elementSize: number;
  AfterFieldComponent?: React.FC<any> | null;
  isInitialLoading?: boolean;
  isViewOnly?: boolean;
  currentFormFields: TFormField[];
}

const SectionGrid: React.FC<SectiongridProps> = ({
  name,
  isDisabledSection,
  elementSize,
  AfterFieldComponent,
  currentFormFields,
  isViewOnly,
}) => {
  const { values, errors } = useFormikContext<FormikValues>();
  return (
    <Grid
      component="fieldset"
      border="none"
      disabled={isDisabledSection}
      container
      spacing={2}
      key={name}
      py={4}
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {currentFormFields?.map((field) => {
        const fieldSize = field.colspan
          ? field.colspan * elementSize
          : elementSize;

        return (
          <Grid key={field.name} xs={12} sm={fieldSize} md={6} lg={fieldSize}>
            {field.type === "arrayField" ? (
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

                    {values[field.name]?.length > 0 &&
                      values[field.name].map((_: object, valIdx: number) => (
                        <>
                          <Box
                            key={`${field.name}_${valIdx}`}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            marginY={2}
                          >
                            <Typography>
                              {`${field.label} ${valIdx + 1}`}
                            </Typography>
                            {!isViewOnly && (
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
                            sm={fieldSize}
                            md={6}
                            lg={fieldSize}
                            container
                            spacing={2}
                            rowSpacing={1}
                          >
                            {field.formFields?.map((innerField) => {
                              const newName = `${field.name}.${valIdx}.${innerField.name}`;
                              return (
                                <Grid
                                  key={field.name}
                                  xs={12 / 3}
                                  sm={fieldSize / 3}
                                  md={6 / 3}
                                  lg={fieldSize / 3}
                                >
                                  <FieldGenerator
                                    field={{
                                      ...innerField,
                                      name: newName,
                                      isDisabledField: isViewOnly
                                        ? true
                                        : field.isDisabledField,
                                    }}
                                    AfterFieldComponent={
                                      AfterFieldComponent as any
                                    }
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </>
                      ))}
                    {!isViewOnly && (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <FormHelperText error>
                          {errors[field.name]?.toString()}
                        </FormHelperText>
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
            ) : (
              <FieldGenerator
                field={{
                  ...field,
                  isDisabledField: isViewOnly ? true : field.isDisabledField,
                }}
                AfterFieldComponent={AfterFieldComponent as any}
              />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SectionGrid;
