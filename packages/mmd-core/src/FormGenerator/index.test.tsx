import { render } from "@testing-library/react";
import { test } from "vitest";

import FormGenerator from "./index";
import formData from "../data/testForm";

test("render correctly", () => {
  const { getByText } = render(<FormGenerator formData={formData} />);
  // eslint-disable-next-line no-undef
  expect(getByText("Submit")).toBeInTheDocument();
});

test("render correctly", () => {
  const { getByRole } = render(<FormGenerator formData={formData} />);
  // eslint-disable-next-line no-undef
  expect(getByRole("button")).toBeInTheDocument();
});
