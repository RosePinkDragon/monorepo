import { fireEvent, render, screen } from "@testing-library/react";
import FieldGenerator, {
  componentRegistry,
  registerComponent,
} from "../../../../src/FormGenerator/FieldGenerator";
import { renderWithFormik } from "../FormSection.test";
import { TFormField } from "../../../../src";
import { TTextField } from "../../../../src/types/formField";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";

function setupUserEvent(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

// Test case for registerComponent function
describe("it registers the component properly", () => {
  test("registerComponent registers a component correctly", () => {
    // Mock component and type
    const mockComponent = () => null;
    const mockType = "mockType";

    // Register the mock component
    registerComponent(mockType, mockComponent);

    // Assert that the component is registered correctly
    expect(componentRegistry[mockType]).toEqual(mockComponent);
  });
});

describe("it disables dependent fields correctly", () => {
  // Test case for the useEffect in FieldGenerator
  test("it disables textfield correctly", async () => {
    const mockField: TFormField & TTextField = {
      name: "testField1",
      label: "test label",
      dependentOnValues: ["dependentValue"],
      isDependentOn: "testField2",
      isDisabledField: false,
      type: "text",
    };

    const mockField2: TFormField & TTextField = {
      name: "testField2",
      label: "test label 2",
      isDisabledField: false,
      type: "text",
    };

    // Render the FieldGenerator component

    setupUserEvent(
      <>
        {renderWithFormik(
          <>
            <FieldGenerator field={mockField} />
            <FieldGenerator field={mockField2} />
          </>
        )}
      </>
    );

    const disabledField = screen
      .getByLabelText("testField1")
      .querySelector("input");

    expect(disabledField).toBeDisabled();

    const inputTwo = screen.getByLabelText("testField2").querySelector("input");
    if (!inputTwo) return expect(true).toBe(false);
    fireEvent.change(inputTwo, { target: { value: "testVal" } });
    expect(disabledField).toBeDisabled();
  });
});
