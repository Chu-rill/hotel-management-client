import axios from "./axios";
import { useState } from "react";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const signup = async (userData: SignupData) => {
    setLoading(true);
    try {
      const response = await axios.post("users/register", userData);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };
  return { loading, signup };
};

export default useSignup;
