import { describe, expect, it } from "vitest";
import createValidationSchema from "../../../src/utils/validationSchemaGenerator";
import formData from "../../data/utilsTestForm";
import * as Yup from "yup";

describe("Validation Schema Generator", () => {
  it("should generate a validation schema without errors for valid data", () => {
    const validationSchema = createValidationSchema(formData);
    const validData = {
      field1Name: "Valid Text",
      field2Name: "John Doe",
      fieldName: "Valid Field",
    };

    return validationSchema.validate(validData).then((result) => {
      expect(result).toEqual(validData);
    });
  });

  it("should throw validation error for missing required field", async () => {
    const validationSchema = createValidationSchema(formData);
    const invalidData = {
      field1Name: undefined,
      field2Name: "John Doe",
      fieldName: "Another Valid Field",
    };

    // works
    return expect(
      validationSchema.validate(invalidData, { abortEarly: false })
    ).rejects.toThrowError("Please enter field 1 label");
  });

  it("should throws multiple validation error's for missing/improper fields", async () => {
    const validationSchema = createValidationSchema(formData);
    const invalidData = {
      field1Name: undefined,
      field2Name: "John Doe...",
      fieldName: "Another Valid Field",
    };

    try {
      await validationSchema.validate(invalidData, { abortEarly: false });
    } catch (error) {
      if (!(error instanceof Yup.ValidationError))
        throw Error("Unknown Error Occurred");

      const message: { [x: string]: string } = {};
      error.inner.forEach((err) => {
        message[err.path as string] = err.message;
      });

      expect(message).toEqual({
        field1Name: "Please enter field 1 label",
        field2Name: "Enter Proper Name",
      });
    }

    // works
  });

  it("should throw validation error for invalid text in a field", async () => {
    const validationSchema = createValidationSchema(formData);

    const invalidData = {
      field1Name: "Invalid Text123", // Only alphabets are allowed
      field2Name: "John Doe 123123 asdf as,./",
      fieldName: "Valid Field",
    };

    return expect(
      validationSchema.validate(invalidData, { abortEarly: false })
    ).rejects.toThrowError("Enter Proper Name");
  });

  // Add more test cases as needed for your specific validation rules
});
