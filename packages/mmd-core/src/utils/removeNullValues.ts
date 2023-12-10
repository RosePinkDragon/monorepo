import { FormikValues } from "formik";
import { omitBy, isNull } from "lodash";

const removeNullValues = (obj: FormikValues) => {
  return omitBy(obj, isNull);
};

export default removeNullValues;
