import { render } from "@testing-library/react";
import { test } from "vitest";

import FormGenerator from "../../../src/FormGenerator/index";
import formData from "../../data/testForm";

test("render correctly", () => {
  const { getByText } = render(<FormGenerator formData={formData} />);
  // eslint-disable-next-line no-undef
  expect(getByText("form name")).toBeInTheDocument();
});

test("render correctly", () => {
  const { getByText } = render(<FormGenerator formData={formData} />);
  // eslint-disable-next-line no-undef
  expect(getByText("field 1 label")).toBeInTheDocument();
});
