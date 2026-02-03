import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PopupPage from "./pages/PopupPage";
import './App.scss'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/response/:id" element={<PopupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
