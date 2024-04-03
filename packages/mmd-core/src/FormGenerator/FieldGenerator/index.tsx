import { ReactElement } from "react";
import TextInput from "./TextField";
import { TFormField } from "../../types";
import useGetFieldData from "../hooks/useGetFieldData";
import DateInputField from "./DateField";

export type TComponentRegistryProps = {
  field: any;
  value: string;
  error: string;
  touched: boolean;
  isDisabled: boolean;
};

export type TComponentRegistry = {
  [key: string]: (data: TComponentRegistryProps) => ReactElement | null;
};

export const componentRegistry: TComponentRegistry = {
  text: TextInput,
  date: DateInputField,
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
