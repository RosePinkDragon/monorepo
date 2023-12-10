import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { SectionHeading } from "../../../../src/FormGenerator/FormComponents";

describe("renders the section heading properly", () => {
  test("renders SectionHeading with the provided heading", () => {
    const headingText = "Test Heading";
    const { getByText } = render(<SectionHeading heading={headingText} />);

    const headingElement = getByText(headingText);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders SectionHeading with the provided heading and style", () => {
    const headingText = "Test Heading";
    const { getByText } = render(<SectionHeading heading={headingText} />);

    const headingElement = getByText(headingText);
    expect(headingElement).toMatchSnapshot();
    expect(headingElement).toBeInTheDocument();

    expect(headingElement).toHaveStyle({
      paddingBottom: "0.6rem",
      marginBottom: "0.4rem",
      position: "relative",
    });
  });
});
