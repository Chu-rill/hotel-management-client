import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import useLogin from "../hooks/useLogin";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { loading, login } = useLogin();
  const [showPassword, setShowPassword] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggleShow = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await login(values);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid credentials or network error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 dark:bg-black">
      <div className="w-full max-w-md">
        <Card className=" bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-3xl font-serif text-primary">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-300 dark:text-gray-300 light:text-gray-600">
              Sign in to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200 dark:text-gray-200 light:text-gray-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="your.email@example.com"
                            className="pl-10 bg-black/30 dark:bg-black/30 light:bg-white border-gray-600 dark:border-gray-600 light:border-gray-300 focus:border-primary text-white dark:text-white light:text-gray-900 transition-colors duration-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel className="text-gray-200 dark:text-gray-200 light:text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            type={showPassword ? "password" : "text"}
                            placeholder="••••••••"
                            className="pl-10 bg-black/30 dark:bg-black/30 light:bg-white border-gray-600 dark:border-gray-600 light:border-gray-300 focus:border-primary text-white dark:text-white light:text-gray-900 transition-colors duration-300"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      {showPassword ? (
                        <FaRegEyeSlash
                          className=" absolute right-4 top-[50%] w-6 h-6  hover:cursor-pointer"
                          onClick={toggleShow}
                        />
                      ) : (
                        <FaRegEye
                          className=" absolute right-4 top-[50%] w-6 h-6  hover:cursor-pointer"
                          onClick={toggleShow}
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col items-center space-y-2 border-t border-gray-700 dark:border-gray-700 light:border-gray-200 pt-4 transition-colors duration-300">
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up now
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
