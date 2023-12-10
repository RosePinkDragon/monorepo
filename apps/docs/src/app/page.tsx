"use client";

import FormGenerator from "@mmd/core";
import formData from "./data/testForm";

export default function Page() {
  return (
    <>
      <h1>Web</h1>
      <FormGenerator
        // isViewOnly={true}
        formData={formData}
        submitHandler={(s) => {
          console.log(s);
        }}
        FormEndComponent={<button type="submit">Submit</button>}
      />
    </>
  );
}
