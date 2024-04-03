import { renderHook } from "@testing-library/react";
import { TFormField } from "../../../../src";
import useGetFieldData from "../../../../src/FormGenerator/hooks/useGetFieldData";
import { vi } from "vitest";

const field: TFormField = {
  name: "field1",
  label: "field 1 label",
  type: "text",
};

const data = vi.hoisted(() => ({
  values: {
    field1: "fieldValue",
    field2Name: "field2Value",
    // Add other form values as needed
  },
  errors: {},
  touched: {},
  initialErrors: {},
}));

const formikContextHoisted = vi.hoisted(() =>
  vi.fn().mockReturnValueOnce(data)
);

vi.mock("formik", async () => {
  const actual = await vi.importActual("formik");

  return {
    ...actual,
    useFormikContext: formikContextHoisted,
  };
});

describe("getFieldData", () => {
  it("returns proper values", () => {
    const {
      result: { current },
    } = renderHook(() => useGetFieldData(field));

    const { error, isDisabled, touched, value } = current;

    expect(error).toBe(false);
    expect(isDisabled).toBe(false);
    expect(touched).toBe(false);
    expect(value).toBe("fieldValue");
  });
});
