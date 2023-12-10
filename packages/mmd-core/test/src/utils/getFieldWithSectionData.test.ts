import { getFieldWithSection } from "../../../src/utils/getFieldWithSectionData";
import formData from "../../data/utilsTestForm";
import { describe, expect, test } from "vitest";

describe("getFieldWithSection", () => {
  test("should return the correct field and section details for an existing field", () => {
    const result = getFieldWithSection(formData, "field1Name");
    expect(result).toEqual({
      formField: {
        initialValue: "initialValueForField1",
        name: "field1Name",
        label: "field 1 label",
        type: "text",
        required: true,
      },
      sectionName: "section1Name",
      isDependentOn: null,
      dependentOnValue: null,
    });
  });

  test("should return null for a non-existing field", () => {
    const result = getFieldWithSection(formData, "nonExistentField");
    expect(result).toBeNull();
  });

  test("should handle dependent sections correctly", () => {
    const result = getFieldWithSection(formData, "fieldName");
    expect(result).toEqual({
      formField: {
        name: "fieldName",
        label: "field 1 label",
        type: "text",
        required: true,
      },
      sectionName: "section2Name",
      isDependentOn: "field1Name",
      dependentOnValue: "test",
    });
  });
});
