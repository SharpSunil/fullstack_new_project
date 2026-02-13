import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import PopupPage from "./pages/PopupPage";
import './App.scss'
import Final_popup from "./components/final-popup/Final_popup";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
       
        <Route path="/response/:id" element={<PopupPage />} />
         <Route path="/popup" element={<Final_popup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
