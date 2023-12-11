import { render } from "@testing-library/react";
import FieldGenerator, {
  componentRegistry,
  registerComponent,
} from "../../../../src/FormGenerator/FieldGenerator";
import { vi } from "vitest";
import { renderWithFormik } from "../FormSection.test";

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

// Test case for the useEffect in FieldGenerator
test("useEffect sets isDisabledField correctly based on dependentOnValues and isDependentOn", () => {
  const mockField = {
    name: "test field",
    label: "test label",
    dependentOnValues: ["dependentValue"],
    isDependentOn: "mockDependentValue",
    isDisabledField: false,
    type: "text",
  } as any;

  // Mock the setUpdatedField function
  const mockSetUpdatedField = vi.fn();

  // Render the FieldGenerator component
  renderWithFormik(
    <>
      render(
      <FieldGenerator field={mockField} />)
    </>
  );

  // Assert that setUpdatedField is called with the correct updated field
  expect(mockSetUpdatedField).toHaveBeenCalledWith({
    ...mockField,
    isDisabledField: false,
  });
});
