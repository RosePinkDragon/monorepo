import FormGenerator from "@mmd/core";
import formData from "./data/testForm";

function App() {
  return (
    <FormGenerator
      isViewOnly={false}
      submitHandler={(e) => console.log(e)}
      formData={formData}
    />
  );
}

export default App;
