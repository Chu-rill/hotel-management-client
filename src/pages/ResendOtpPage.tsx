import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import axios from "../hooks/axios"; // Adjust path based on your project

const ResendOtpPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleResend = async () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("auth/resendOTP", { email });
      toast.success(response.data?.message || "OTP resent successfully!");

      setDisabled(true);
      setTimeout(() => setDisabled(false), 60000); // disable for 1 minute
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm p-6 shadow-lg">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Resend OTP</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your email to receive a new OTP code.
            </p>
          </div>

          <Input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleResend}
            disabled={loading || disabled}
          >
            {loading
              ? "Sending..."
              : disabled
              ? "Wait before retrying"
              : "Resend OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResendOtpPage;
