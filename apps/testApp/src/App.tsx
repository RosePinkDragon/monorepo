import FormGenerator from "@mmd/core";
import formData from "./data/testForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useFormikContext } from "formik";
import { Button } from "@mui/material";

const FormSubmitBtn = () => {
  const { submitForm } = useFormikContext();

  return (
    <Button onClick={submitForm} variant="contained" color="primary">
      Hello Submimt
    </Button>
  );
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormGenerator
        isViewOnly={false}
        FormEndComponent={<FormSubmitBtn />}
        submitHandler={(e) => console.log(e)}
        formData={formData}
      />
    </LocalizationProvider>
  );
}

export default App;
