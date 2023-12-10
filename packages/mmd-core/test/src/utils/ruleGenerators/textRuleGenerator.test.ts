import * as Yup from "yup";

import { describe, expect, test } from "vitest";
import { TFormField } from "../../../../src";
import textRuleGenerator from "../../../../src/utils/ruleGenerators/textRuleGenerator";
import { TTextField } from "../../../../src/types/formField";

const createField = (
  overrides: Partial<TFormField & TTextField> = {}
): TFormField => {
  return {
    name: "example",
    label: "Example Label",
    type: "text",
    ...overrides,
  };
};

describe("textRuleGenerator function", () => {
  test("validates string for default field type", () => {
    const defaultField = createField();
    const rule = textRuleGenerator(defaultField);
    const validationResult = rule.isValidSync("Hello");
    expect(validationResult).toBe(true);
  });
  test("validates email for email field type", () => {
    const emailField = createField({ type: "email" });
    const rule = textRuleGenerator(emailField);
    const validationResult = rule.isValidSync("test@example.com");
    expect(validationResult).toBe(true);
  });

  test("validates string length for text or textArea field type with minLen and maxLen", () => {
    const textAreaField = createField({
      type: "textArea",
      minLen: 3,
      maxLen: 10,
    });
    const rule = textRuleGenerator(textAreaField);
    const validationResult1 = rule.isValidSync("abc");
    const validationResult2 = rule.isValidSync("abcdefghij");
    const validationResult3 = rule.isValidSync("abcdefghijk"); // too long

    expect(validationResult1).toBe(true);
    expect(validationResult2).toBe(true);
    expect(validationResult3).toBe(false);
  });

  test("validates phone number for tel field type", () => {
    const telField = createField({ type: "tel" });
    const rule = textRuleGenerator(telField);
    const validationResult1 = rule.isValidSync("1234567890"); // invalid format
    const validationResult2 = rule.isValidSync("+919876543210"); // valid format

    expect(validationResult1).toBe(false);
    expect(validationResult2).toBe(true);
  });
});
