import axios from "./axios";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";

export interface LoginCredentials {
  email: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const response = await axios.post("auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("user_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setAuthUser(response.data.data);
      }
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
