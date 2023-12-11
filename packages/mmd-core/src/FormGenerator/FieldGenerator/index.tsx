import { ReactElement, useEffect, useState } from "react";
import TextInput from "./TextField";
import { TFormField } from "../../types";
import { FormikValues, useFormikContext } from "formik";

export type TComponentRegistry = {
  [key: string]: ({ field }: { field: any }) => ReactElement | null;
};

export const componentRegistry: TComponentRegistry = {
  text: TextInput,
  date: TextInput,
  arrayField: TextInput,
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
  const { values } = useFormikContext<FormikValues>();

  const [updatedField, setUpdatedField] = useState(field);

  useEffect(() => {
    setUpdatedField(field);
  }, [field]);

  useEffect(() => {
    if (field.dependentOnValues && field.isDependentOn && field.isDependentOn) {
      if (!field.dependentOnValues.includes(values[field.isDependentOn]))
        setUpdatedField({ ...field, isDisabledField: true });
    }
  }, []);

  if (!Component) return null;

  return (
    <>
      <Component field={updatedField} />
      {AfterFieldComponent && <AfterFieldComponent field={updatedField} />}
    </>
  );
};

export default FieldGenerator;
