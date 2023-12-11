import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { expect } from "vitest";
import { TFormField, TFormSchema } from "../../../../src";
import { renderWithFormik } from "../FormSection.test";
import { SectionGrid } from "../../../../src/FormGenerator/FormComponents";

function setupUserEvent(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

const formData: TFormSchema = {
  name: "test form",
  sections: [
    {
      name: "section1",
      label: "section 1",
      formFields: [
        {
          name: "field1",
          label: "field 1",
          type: "text",
        },
      ],
    },
  ],
};
const currentFormFields: Array<TFormField> = [
  {
    name: "testArraySection",
    label: "array Section",
    type: "arrayField",
    formFields: [
      {
        name: "arrayField1",
        label: "field 1",
        colspan: 1,
        type: "text",
      },
      {
        name: "arrayField2",
        label: "field 2",
        type: "text",
      },
    ],
  },
];

describe("SectionGrid Component", () => {
  test("renders SectionGrid component correctly", () => {
    render(
      renderWithFormik(
        <SectionGrid
          name="testSection"
          elementSize={2}
          currentFormFields={formData.sections[0].formFields}
        />
      )
    );

    expect(screen.getByLabelText("field1")).toBeInTheDocument();
  });

  test("handles arrayField correctly", () => {
    setupUserEvent(
      <>
        {renderWithFormik(
          <SectionGrid
            name="testSection"
            elementSize={2}
            currentFormFields={currentFormFields}
          />
        )}
      </>
    );

    // Trigger add button
    fireEvent.click(screen.getByText("Add"));

    const inputElement = screen.getByLabelText(
      "testArraySection.0.arrayField1"
    );
    const inputElement2 = screen.getByLabelText(
      "testArraySection.0.arrayField2"
    );

    expect(inputElement).toBeInTheDocument();
    expect(inputElement2).toBeInTheDocument();

    // Trigger remove button
    fireEvent.click(screen.getByText("Remove"));
    expect(inputElement).not.toBeInTheDocument();
    expect(inputElement2).not.toBeInTheDocument();
  });
});
