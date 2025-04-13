import { Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
//pages
import Login from "./pages/login";
function App() {
  return (
    <>
      <Sonner />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
