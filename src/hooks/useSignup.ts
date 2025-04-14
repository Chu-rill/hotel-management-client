// import { SignupResponse } from "../types";
import axios from "./axios";
import { useState } from "react";

export interface SignupData {
  username: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (userData: SignupData) => {
    setLoading(true);
    try {
      const data = await axios.post("/auth/signup", userData);
      console.log("Signup response:", data);
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
