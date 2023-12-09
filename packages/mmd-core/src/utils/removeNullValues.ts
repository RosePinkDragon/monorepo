import { FormikValues } from "formik";

const removeNullValues = (obj: FormikValues) => {
  const newObj: FormikValues = {};
  for (const key in obj) {
    if (obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export default removeNullValues;
