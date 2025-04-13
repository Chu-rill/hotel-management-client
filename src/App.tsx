import { Routes, Route } from "react-router-dom";
import { Toaster as Sonner } from "./components/ui/sonner";
//pages
import Login from "./pages/login";
import Signup from "./pages/signup";
function App() {
  return (
    <>
      <Sonner />
      <Routes>
        <Route path="/home" element={<div>Home</div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
