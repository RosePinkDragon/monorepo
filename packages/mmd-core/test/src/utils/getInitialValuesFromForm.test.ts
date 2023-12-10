import { describe, expect, test } from "vitest";

import getInitialValuesFromForm from "../../../src/utils/getInitialValuesFromForm";
import formData from "../../data/testForm";

describe("getInitialValuesFromForm", () => {
  test("should return initial values for fields with initialValues", () => {
    const formSections = formData.sections;
    const initialValues = getInitialValuesFromForm(formSections);

    expect(initialValues).toEqual({
      field1Name: "initialValueForField1",
      field2Name: "initialValueForField2",
    });
  });

  test("should return an empty object if no fields have initialValues", () => {
    const formSections = formData.sections.map((section) => ({
      ...section,
      formFields: section.formFields.map((field) => ({
        ...field,
        initialValue: undefined,
      })),
    }));

    const initialValues = getInitialValuesFromForm(formSections);

    expect(initialValues).toEqual({});
  });

  test("should handle missing or undefined formSections gracefully", () => {
    const initialValues = getInitialValuesFromForm(undefined as any);

    expect(initialValues).toEqual({});
  });
});
