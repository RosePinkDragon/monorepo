import Grid from "@mui/material/Unstable_Grid2";

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
            <FieldGenerator
              field={{
                ...field,
                isDisabledField: isViewOnly ? true : field.isDisabledField,
              }}
              AfterFieldComponent={AfterFieldComponent as any}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SectionGrid;
