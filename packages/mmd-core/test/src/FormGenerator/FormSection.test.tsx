import { ReactElement } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import expandableTestForm from "../../data/expandableTestForm";
import FormSection from "../../../src/FormGenerator/FormSection";
import { describe, vitest } from "vitest";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import userEvent from "@testing-library/user-event";

function setupUserEvent(jsx: ReactElement) {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...render(jsx),
  };
}

/**
 * returns an element with formik
 * @param chilren ReactElement
 * @param formikProps FormikConfig<FormikValues>
 * @returns Element with formik context
 */
export const renderWithFormik = (
  chilren: ReactElement,
  formikProps: FormikConfig<FormikValues> = {
    // Add your Formik props here
    initialValues: {},
    onSubmit: vitest.fn(),
  }
) => {
  return (
    <Formik {...formikProps}>
      <Form>{chilren}</Form>
    </Formik>
  );
};

describe("renders form section as expected", () => {
  const formSection = expandableTestForm.sections[0];

  test("expands and collapses Accordion when isExpandableSection is true", () => {
    setupUserEvent(
      <>
        {renderWithFormik(
          <FormSection
            {...formSection}
            isExpandableSection={true}
            noOfCols={2}
          />,
          {
            // Add your Formik props here
            initialValues: {},
            onSubmit: vitest.fn(),
          }
        )}
      </>
    );
    const accordionButton = screen.getByRole("button");
    expect(accordionButton).toBeInTheDocument();

    expect(screen.getByLabelText("field 1 label")).not.toBeVisible();
    fireEvent.click(accordionButton);
    expect(screen.getByLabelText("field 1 label")).toBeVisible();
  });
});
