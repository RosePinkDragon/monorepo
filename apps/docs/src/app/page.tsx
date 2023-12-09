import FormGenerator from "@mmd/core";
import formData from "./data/testForm";

export default function Page() {
  return (
    <>
      <h1>Web</h1>
      <FormGenerator formData={formData} />
    </>
  );
}
