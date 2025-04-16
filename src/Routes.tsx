import { Routes, Route, Navigate } from "react-router-dom";
//pages
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpPage from "./pages/Otp";
import ResendOtpPage from "./pages/ResendOtpPage";
import NotFoundPage from "./pages/NotFound";
import HotelDetailsPage from "./pages/Hotel";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/AboutPage";
import RoomDetailsPage from "./pages/Room";
import { useAuthContext } from "./context/AuthContext";
function AppRoutes() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/otp"
          element={authUser ? <Navigate to="/" /> : <OtpPage />}
        />
        <Route
          path="/resend-otp"
          element={authUser ? <Navigate to="/" /> : <ResendOtpPage />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/contact"
          element={authUser ? <ContactPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/hotel/:hotelId"
          element={authUser ? <HotelDetailsPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={authUser ? <AboutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/hotels/:hotelId/rooms/:roomNumber"
          element={authUser ? <RoomDetailsPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
