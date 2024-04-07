import { ReactElement, memo, useMemo } from "react";
import TextInput from "./TextField";
import { TFormField } from "../../types";
import useGetFieldData from "../hooks/useGetFieldData";
import DateInputField from "./DateField";
import FieldArrayType from "./FieldArray";

export type TComponentRegistry = {
  [key: string]: (data: any) => ReactElement | null;
};

export const componentRegistry: TComponentRegistry = {
  text: TextInput,
  date: DateInputField,
  arrayField: FieldArrayType,
};

export const registerComponent = (
  type: string,
  Component: ({ field }: { field: TFormField }) => ReactElement | null
) => {
  componentRegistry[type] = Component;
};

const FieldGenerator = ({
  field,
  AfterFieldComponent,
}: {
  field: TFormField;
  AfterFieldComponent?: ({
    field,
  }: {
    field: TFormField;
  }) => ReactElement | null;
}) => {
  const Component = componentRegistry[field.type];

  const { value, error, touched, isDisabled } = useGetFieldData(field);
  if (!Component) return null;

  return (
    <>
      <Component
        field={field}
        value={value}
        error={error}
        touched={touched}
        isDisabled={isDisabled}
      />
      {AfterFieldComponent && <AfterFieldComponent field={field} />}
    </>
  );
};

export default FieldGenerator;
