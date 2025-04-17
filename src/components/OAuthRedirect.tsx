import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuthContext } from "../context/AuthContext";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      const decodedToken = jwtDecode<any>(token); // Adjust type as needed

      const authUser = {
        id: decodedToken.id,
        userName: decodedToken.username,
        email: decodedToken.email,
      }; // Map fields to match AuthUser type

      localStorage.setItem("user", JSON.stringify(authUser));
      localStorage.setItem("user_token", token);
      setAuthUser(authUser);
      // You might want to fetch user info here or redirect to home
      navigate("/"); // or wherever you want to go after login
    } else {
      navigate("/login"); // fallback
    }
  }, []);

  return <p>Redirecting...</p>;
};

export default OAuthRedirect;
