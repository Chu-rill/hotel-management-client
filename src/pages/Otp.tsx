import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import useOtp from "../hooks/useOtp"; // Adjust path as needed
import { Link, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState<string>("");
  const email = sessionStorage.getItem("otpEmail"); // get from session
  const { loading, otp: validateOtp } = useOtp();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!email) {
      toast.error("Email session expired. Please sign up again.");
      return;
    }
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      await validateOtp({ email, OTP: otp });
      toast.success("OTP verified successfully!");
      // Optionally redirect or update auth state
      sessionStorage.removeItem("otpEmail"); // Clear session after use
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-black">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Enter OTP</h2>
            <p className="text-sm text-muted-foreground mt-1">
              A 6-digit code was sent to your email.
            </p>
          </div>

          <InputOTP maxLength={6} value={otp} onChange={(val) => setOtp(val)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={otp.length < 6 || loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
        <Link
          to="/resend-otp"
          className="text-hotel-navy font-medium hover:underline"
        >
          Resend OTP
        </Link>
      </Card>
    </div>
  );
};

export default OtpPage;
