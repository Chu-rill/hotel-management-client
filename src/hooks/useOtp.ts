import axios from "./axios";
import { useState } from "react";

export type OTPDto = {
  email: string;
  OTP: string;
};

const useOtp = () => {
  const [loading, setLoading] = useState(false);

  const otp = async (otpData: OTPDto) => {
    setLoading(true);
    try {
      const response = await axios.post("auth/validateOTP", otpData);
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
