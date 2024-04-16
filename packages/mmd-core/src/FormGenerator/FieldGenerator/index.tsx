import TextInput from "./TextField";
import DateInputField from "./DateField";
import FieldArrayType from "./FieldArray";
import BooleanField from "./BooleanField";

import useGetFieldData from "../hooks/useGetFieldData";

import type { ReactElement } from "react";
import type { TFormField } from "~/types";

export type TComponentRegistry = {
  [key: string]: (data: any) => ReactElement | null;
};

export const componentRegistry: TComponentRegistry = {
  text: TextInput,
  date: DateInputField,
  boolean: BooleanField,
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

  const { value, error, touched, isDisabled, parentValue } =
    useGetFieldData(field);

  if (!Component) return null;
  return (
    <>
      <Component
        field={field}
        value={value}
        error={error}
        touched={touched}
        isDisabled={isDisabled}
        parentValue={parentValue}
      />
      {AfterFieldComponent && <AfterFieldComponent field={field} />}
    </>
  );
};

export default FieldGenerator;
