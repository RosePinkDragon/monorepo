import { DatePicker } from "@mui/x-date-pickers";
import { FormikValues, useFormikContext } from "formik";
import { TFormField } from "../../types";
import { TDateField } from "../../types/formField";

const DateInputField = ({
  field,
  value,
  error,
  touched,
}: {
  field: TFormField & TDateField;
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
