import { DatePicker } from "@mui/x-date-pickers";
import { useFormikContext } from "formik";

import type { FormikValues } from "formik";
import type { TFormField } from "~/types";

const DateInputField = ({
  field,
  value,
  error,
  touched,
}: {
  field: TFormField & { type: "date" };
  value: string;
  error: string;
  touched: boolean;
}) => {
  const { setFieldValue } = useFormikContext<FormikValues>();

  return (
    <DatePicker
      label="Controlled picker"
      value={value ?? ""}
      onChange={(newValue) => setFieldValue(field.name, newValue)}
    />
  );
};

export default DateInputField;
