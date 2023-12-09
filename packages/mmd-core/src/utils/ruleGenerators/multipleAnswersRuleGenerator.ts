import * as Yup from "yup";
import type { TFormField } from "../../types";
import { TMultiFields } from "../../types/formField";

function multipleAnswersRuleGenerator(field: TFormField & TMultiFields) {
  const { type: fieldType } = field;

  let rule;

  const results = field.options?.map(({ value }) => value) ?? [];

  // return if no result
  if (results.length < 1) return rule;

  if (fieldType === "multi-select" || fieldType === "checkbox") {
    rule = Yup.array().of(Yup.mixed().oneOf(results));
  }

  if (fieldType === "select" || fieldType === "radio") {
    rule = Yup.mixed().oneOf(results, "Invalid Option");
  }
  return rule;
}

export default multipleAnswersRuleGenerator;
