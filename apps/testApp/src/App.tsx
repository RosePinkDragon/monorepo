import FormGenerator from "@mmd/core";
import formData from "./data/testForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormGenerator
        isViewOnly={false}
        submitHandler={(e) => console.log(e)}
        formData={formData}
      />
    </LocalizationProvider>
  );
}

export default App;
