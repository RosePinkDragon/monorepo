import * as Yup from "yup";

import type { TFormField } from "~/types";

function dateRuleGenerator(field: TFormField & { type: "date" }) {
  let rule = Yup.date();
  if (field.afterDate) {
    rule = rule.min(
      Yup.ref(field.afterDate),
      `To date must be after ${field.afterDate}`
    );
  }

  if (field.beforeDate) {
    rule = rule.max(
      Yup.ref(field.beforeDate),
      `From date must be before ${field.beforeDate}`
    );
  }

  return rule;
}

export default dateRuleGenerator;
