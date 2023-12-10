import * as Yup from "yup";
import { describe, expect, test } from "vitest";
import { TFormField } from "../../../../src";
import {
  baseRuleGenerator,
  selectableFieldTypes,
  textTypeFields,
} from "../../../../src/utils/ruleGenerators";
import { TTextField } from "../../../../src/types/formField";

const sampleData: {
  // eslint-disable-next-line no-unused-vars
  [key in TTextField["type"]]?: string;
} = {
  text: "validValue",
  textArea: "validValue",
  tel: "+91 9876543210",
  email: "test@west.com",
  password: "P@ssword123",
};

const createField = (overrides: Partial<TFormField> = {}): TFormField => {
  return {
    name: "example",
    label: "Example Label",
    type: "text",
    ...overrides,
  } as any;
};

describe("baseRuleGenerator function", () => {
  test.each(textTypeFields)("validates text type field: %s", (fieldType) => {
    const textTypeField = createField({ type: fieldType });
    const rule = baseRuleGenerator(textTypeField);

    if (rule) {
      const validationResult = rule.isValidSync(
        sampleData[fieldType as TTextField["type"]]
      );
      expect(validationResult).toBe(true);
    }
  });

  test("validates number type field", () => {
    const numberField = createField({ type: "number" });
    const rule = baseRuleGenerator(numberField);

    if (!rule) throw Error("Rule not created");

    expect(() =>
      Yup.object().shape({ example: rule }).validateSync({ example: 123 })
    ).not.toThrow();
    expect(() =>
      Yup.object().shape({ example: rule }).validateSync({ example: "invalid" })
    ).toThrow(Yup.ValidationError);
    expect(() =>
      Yup.object().shape({ example: rule }).validateSync({ example: -1 })
    ).toThrow(Yup.ValidationError);
  });

  test("validates date type field", () => {
    const dateField = createField({ type: "date" });
    const rule = baseRuleGenerator(dateField);
    if (!rule) return expect(true).toBe(false);
    expect(() =>
      Yup.object()
        .shape({ example: rule })
        .validateSync({ example: new Date() })
    ).not.toThrow();
    expect(() =>
      Yup.object().shape({ example: rule }).validateSync({ example: "invalid" })
    ).toThrow(Yup.ValidationError);
  });

  test("validates boolean type field", async () => {
    const booleanField = createField({ type: "boolean" });
    const rule = baseRuleGenerator(booleanField);

    if (rule) {
      // Assuming the boolean field rule depends on some condition
      const validationResult = await rule.validate("hello");
      expect(validationResult).toBe("hello");
    }
  });

  // TODO: update this test so it actually validated boolean fields
  test("should require field details when 'on' is included", () => {
    const booleanField = createField({ type: "boolean" });

    const rule = baseRuleGenerator(booleanField);
    if (!rule) return expect(true).toBe(false);

    // Assuming you are using Jest and Yup for validation
    const validationResult = rule.validateSync(booleanField.name);

    expect(validationResult).toBe(booleanField.name); // no validation error expected
  });

  test.skip("should not require field details when 'on' is not included", () => {
    const booleanField = createField({ type: "boolean" });
    const rule = baseRuleGenerator(booleanField);
    if (!rule) return expect(true).toBe(false);

    // Assuming you are using Jest and Yup for validation
    const validationResult = rule.validateSyncAt("exampleField-changer", {
      "exampleField-changer": ["off"],
    });

    expect(validationResult).toBeUndefined(); // no validation error expected
  });

  test.skip("should not require field details when 'on' is not present", () => {
    const booleanField = createField({ type: "boolean" });

    const rule = baseRuleGenerator(booleanField);

    if (!rule) return expect(true).toBe(false);
    // Assuming you are using Jest and Yup for validation
    const validationResult = rule.validateSyncAt("exampleField-changer", {});

    expect(validationResult).toBeUndefined(); // no validation error expected
  });

  test.each(selectableFieldTypes)(
    "validates selectable field type: %s",
    (fieldType) => {
      const selectableField = createField({ type: fieldType });
      const rule = baseRuleGenerator(selectableField);

      if (rule) {
        // Assuming the selectable field rule depends on some condition
        const validationResult = rule.isValidSync("validValue");
        expect(validationResult).toBe(true);
      }
    }
  );

  test.each(selectableFieldTypes)(
    "validates selectable field type: %s",
    (fieldType) => {
      const selectableField = createField({ type: fieldType });
      const rule = baseRuleGenerator(selectableField);

      if (rule) {
        const validationResult = rule.isValidSync("validValue");
        expect(validationResult).toBe(true);
      }
    }
  );

  test("returns null for unsupported field type", () => {
    const unsupportedField = createField({ type: "unsupported" as any });
    const rule = baseRuleGenerator(unsupportedField);

    expect(rule).toBeNull();
  });
});
