import { describe, expect, test } from "vitest";
import * as Yup from "yup";
import dateRuleGenerator from "../../../../src/utils/ruleGenerators/dateRuleGenerator";

describe("dateRuleGenerator function", () => {
  test("returns a Yup date validation schema", () => {
    const dateRule = dateRuleGenerator();
    expect(dateRule).toBeInstanceOf(Yup.date);
  });

  test("validates a valid date", () => {
    const dateRule = dateRuleGenerator();
    const validDate = new Date();
    expect(dateRule.isValidSync(validDate)).toBe(true);
  });

  test("does not validate an invalid date", () => {
    const dateRule = dateRuleGenerator();
    const invalidDate = "This is not a date";
    expect(dateRule.isValidSync(invalidDate)).toBe(false);
  });

  // Add more test cases as needed
});
