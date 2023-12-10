import { describe, expect, test } from "vitest";
import * as Yup from "yup";
import { TFormField } from "../../../../src";
import multipleAnswersRuleGenerator from "../../../../src/utils/ruleGenerators/multipleAnswersRuleGenerator";
import { TMultiFields } from "../../../../src/types/formField";

const createField = (
  overrides: Partial<TFormField & TMultiFields> = {}
): TFormField & TMultiFields => {
  return {
    name: "test",
    label: "Test Label",
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    type: "select",
    ...overrides,
  };
};

describe("multipleAnswersRuleGenerator function", () => {
  test("returns undefined for invalid field type", () => {
    const invalidFieldType = createField({ type: "invalid-type" as any });
    const rule = multipleAnswersRuleGenerator(invalidFieldType);
    expect(rule).toBeUndefined();
  });

  test("assigns default empty array to 'results' if field options are undefined", () => {
    const fieldWithNoOptions = createField({ options: undefined });
    const rule = multipleAnswersRuleGenerator(fieldWithNoOptions);

    // Ensure the 'results' line is covered
    expect(rule).toBeUndefined();
  });

  test("generates array validation rule for multi-select or checkbox", () => {
    const multiSelectField = createField({ type: "multi-select" });
    const checkboxField = createField({ type: "checkbox" });

    const multiSelectRule = multipleAnswersRuleGenerator(multiSelectField);
    const checkboxRule = multipleAnswersRuleGenerator(checkboxField);

    if (!multiSelectRule || !checkboxRule)
      throw Error("Rule not generated, please check");

    expect(() =>
      Yup.object()
        .shape({ example: multiSelectRule })
        .validateSync({ example: ["option1", "option3"] })
    ).not.toThrow();

    expect(() =>
      Yup.object()
        .shape({ example: checkboxRule })
        .validateSync({ example: ["option1"] })
    ).not.toThrow();
  });

  test("generates mixed validation rule for select or radio", () => {
    const selectField = createField({ type: "select" });
    const radioField = createField({ type: "radio" });

    const selectRule = multipleAnswersRuleGenerator(selectField);
    const radioRule = multipleAnswersRuleGenerator(radioField);

    if (!selectRule || !radioRule)
      throw Error("Rule not generated, please check");

    expect(() =>
      Yup.object()
        .shape({ example: selectRule })
        .validateSync({ example: "option1" })
    ).not.toThrow();
    expect(() =>
      Yup.object()
        .shape({ example: radioRule })
        .validateSync({ example: "option2" })
    ).not.toThrow();
  });

  test("returns undefined for fields with no options", () => {
    const fieldWithNoOptions = createField({ options: [] });
    const rule = multipleAnswersRuleGenerator(fieldWithNoOptions);
    expect(rule).toBeUndefined();
  });
});
