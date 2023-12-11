import { Button } from "@mui/material";
import { describe, it, test, vi } from "vitest";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

import FormGenerator from "../../../src/FormGenerator/index";
import formGeneratorTestForm from "../../data/formGeneratorTestForm";

function setupUserEvent(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

describe("It renders the form correctly", () => {
  test("render correctly", () => {
    const { getByText } = render(
      <FormGenerator formData={formGeneratorTestForm} isViewOnly={true} />
    );

    expect(getByText("form name")).toBeInTheDocument();

    expect(getByText("field 1 label")).toBeInTheDocument();
  });
});

describe("FormGenerator component", () => {
  test("calls submitHandler when the form is submitted", async () => {
    const mockSubmitHandler = vi.fn();
    const { user } = setupUserEvent(
      <FormGenerator
        formData={formGeneratorTestForm}
        submitHandler={mockSubmitHandler}
        FormEndComponent={<button type="submit">Submit</button>}
      />
    );

    // Fill in form fields
    const inputOne = screen.getByLabelText("field1Name").querySelector("input");
    const inputTwo = screen.getByLabelText("field2Name").querySelector("input");
    if (!inputOne || !inputTwo) return expect(true).toBe(false);
    fireEvent.change(inputOne, { target: { value: "Value 1" } });
    fireEvent.change(inputTwo, { target: { value: "Value" } });

    // Submit the form
    user.click(screen.getByText("Submit"));

    // Wait for the submit handler to be called
    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        act: expect.any(Object),
        values: { field1Name: "Value 1", field2Name: "Value" },
      });
    });
  });

  test("calls submitHandler with the passed initial values and merges the given values", async () => {
    const mockSubmitHandler = vi.fn();
    const { user } = setupUserEvent(
      <FormGenerator
        formData={formGeneratorTestForm}
        submitHandler={mockSubmitHandler}
        initialFormValues={{
          testValue: "someValue",
        }}
        FormEndComponent={<button type="submit">Submit</button>}
      />
    );

    // Submit the form
    user.click(screen.getByText("Submit"));

    // Wait for the submit handler to be called
    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        act: expect.any(Object),
        values: {
          testValue: "someValue",
          field1Name: "initialValueForField",
          field2Name: "initialValueForField",
        },
      });
    });
  });

  test("does not submit the form in view-only mode", async () => {
    const mockSubmitHandler = vi.fn();
    const { getByText } = render(
      <FormGenerator
        formData={formGeneratorTestForm}
        submitHandler={mockSubmitHandler as any}
        isViewOnly={true}
        FormEndComponent={<Button type="submit">Submit</Button>}
      />
    );

    fireEvent.click(getByText("Submit"));

    // Ensure submit handler is not called
    expect(mockSubmitHandler).not.toHaveBeenCalled();
  });

  describe("renders form sections based on the condition", () => {
    test("does not show section on invalid value", () => {
      const mockSubmitHandler = vi.fn();

      const { user } = setupUserEvent(
        <FormGenerator
          formData={formGeneratorTestForm}
          submitHandler={mockSubmitHandler}
          FormEndComponent={<button type="submit">Submit</button>}
        />
      );

      // Initial render should show only the Form Heading
      expect(screen.getByText("form name")).toBeInTheDocument();
      expect(screen.getByText("section label")).toBeInTheDocument();
      expect(screen.queryByText("section 2 label")).toBeNull();

      // Fill in form fields
      const inputOne = screen
        .getByLabelText("field1Name")
        .querySelector("input");

      if (!inputOne) return expect(true).toBe(false);
      fireEvent.change(inputOne, { target: { value: "test" } });

      // After updating the dependentField, Section 2 should be rendered
      expect(screen.getByText("section label")).toBeInTheDocument();
      expect(screen.queryByText("section 2 label")).toBeInTheDocument();
    });
  });
});
