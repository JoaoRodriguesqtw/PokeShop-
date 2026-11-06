import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/Contato" element={<Contato/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;