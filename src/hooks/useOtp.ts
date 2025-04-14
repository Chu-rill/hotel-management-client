import { useAuthContext } from "../context/AuthContext";
import axios from "./axios";
import { useState } from "react";

export type OTPDto = {
  email: string;
  OTP: string;
};

const useOtp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const otp = async (otpData: OTPDto) => {
    setLoading(true);
    try {
      const response = await axios.post("auth/validateOTP", otpData);
      console.log("OTP validation response:", response.data);
      if (response.data.token) {
        localStorage.setItem("user_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setAuthUser(response.data.data);
      }
      return response.data;
    } catch (error) {
      console.error("OTP validation error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return { loading, otp };
};

export default useOtp;
