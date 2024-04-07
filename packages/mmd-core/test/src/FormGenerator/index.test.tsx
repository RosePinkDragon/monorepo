import { Button } from "@mui/material";
import { describe, test, vi } from "vitest";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
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
  test("render fields correctly", () => {
    const { getByText, getByLabelText } = render(
      <FormGenerator formData={formGeneratorTestForm} isViewOnly={true} />
    );

    expect(getByText("form name")).toBeInTheDocument();

    expect(getByText("field 1 label")).toBeInTheDocument();
    expect(getByLabelText("field1Name").querySelector("input")).toBeDisabled();
  });
});

describe("FormGenerator component", () => {
  test("calls submitHandler when the form is submitted", async () => {
    const mockSubmitHandler = vi.fn();
    const { user } = setupUserEvent(
      <FormGenerator
        isViewOnly={false}
        formData={formGeneratorTestForm}
        submitHandler={mockSubmitHandler}
        FormEndComponent={<button type="submit">Submit</button>}
      />
    );

    // Fill in form fields
    const inputOne = screen.getByLabelText("field1Name").querySelector("input");
    const inputTwo = screen.getByLabelText("field2Name").querySelector("input");
    if (!inputOne || !inputTwo) return expect(true).toBe(false);

    // Submit the form
    await user.clear(inputOne).then(() => user.type(inputOne, "Value 1"));
    // await user.type(inputOne, "Value 1");
    await user.clear(inputTwo).then(() => user.type(inputTwo, "Value"));

    await new Promise((r) => setTimeout(r, 2000));

    await user.click(screen.getByText("Submit"));

    // Wait for the submit handler to be called
    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        act: expect.any(Object),
        values: expect.any(Object),
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
    act(() => {
      user.click(screen.getByText("Submit"));
    });

    // Wait for the submit handler to be called
    await waitFor(() => {
      expect(mockSubmitHandler).toHaveBeenCalledWith({
        act: expect.any(Object),
        values: {
          testValue: "someValue",
          field1Name: "initialValue1",
          field2Name: "initialValue2",
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
    test("does not show section on invalid value", async () => {
      const mockSubmitHandler = vi.fn();

      const { user } = setupUserEvent(
        <FormGenerator
          formData={formGeneratorTestForm}
          submitHandler={mockSubmitHandler}
          FormEndComponent={<button type="submit">Submit</button>}
        />
      );

      // Initial render should show only the Form Heading and section 1
      expect(screen.getByText("form name")).toBeInTheDocument();
      expect(screen.getByText("section label")).toBeInTheDocument();
      expect(screen.queryByText("section 2 label")).toBeNull();

      // Fill in form fields
      const inputOne = screen
        .getByLabelText("field1Name")
        .querySelector("input");
      if (!inputOne) return expect(true).toBe(false);

      await act(async () => {
        await user.clear(inputOne);
        await user.type(inputOne, "test");
      });

      await waitFor(() => {
        expect(screen.getByText("section label")).toBeInTheDocument();
        expect(screen.getByText("section 2 label")).toBeInTheDocument();
      });
    });
  });
});
