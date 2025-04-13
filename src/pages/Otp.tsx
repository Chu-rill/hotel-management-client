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

const OtpPage = () => {
  const [otp, setOtp] = useState<string>("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    // Replace with real backend verification
    toast.success(`OTP ${otp} verified successfully!`);
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
            disabled={otp.length < 6}
          >
            Verify OTP
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpPage;
