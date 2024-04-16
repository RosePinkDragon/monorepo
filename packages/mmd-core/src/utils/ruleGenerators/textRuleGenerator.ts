import * as Yup from "yup";
import type { TFormField } from "~/types";

function textRuleGenerator(field: TFormField) {
  let rule = Yup.string();

  const { type: fieldType } = field;

  if (fieldType === "email") {
    rule = rule.email("A valid email is required");
  }
  if (fieldType === "text" || fieldType === "textArea") {
    if (field.minLen) {
      rule = rule.min(
        field.minLen,
        `Minimum Allowed length is ${field.minLen} characters`
      );
    }
    if (field.maxLen) {
      rule = rule.max(
        field.maxLen,
        `Maximum Allowed length is ${field.maxLen} characters`
      );
    }
  }
  if (fieldType === "tel") {
    rule = rule.matches(
      /^(\+91[\\-\s]?)?[0]?(91)?[789]\d{9}$/,
      "Please enter a valid number"
    );
  }

  return rule;
}

export default textRuleGenerator;
