import AllBasicDetailsPage from "./components/pages/AllBasicDetails";
import BasicFormPage from "./components/pages/BasicFormPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<BasicFormPage />} />
        <Route path="/allBasicDetails" element={<AllBasicDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
