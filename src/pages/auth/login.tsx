import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import microsoftLogo from "@/assets/icons/microsoft-logo.png";
import googleLogo from "@/assets/icons/google.logo.png";
import loginWithGoogle from "@/lib/firebase/googleLogin";
import loginWithMicrosoft from "@/lib/firebase/microsoftLogin";
import { SignIn } from "@/lib/firebase/emailAndPasswordAuth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    try {
      const user = await SignIn(email, password);
      console.log("Login successful:", user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      console.log("Google login successful:", user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      const user = await loginWithMicrosoft();
      console.log("Microsoft login successful:", user);
    } catch (error) {
      console.error("Microsoft login failed:", error);
    }
  };

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="w-full max-w-md">
      <Card className="bg-white shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between gap-3">
            <div className="w-full flex-1">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none transition-colors duration-300 cursor-pointer"
              >
                <img src={googleLogo} className="w-4 h-4" />
                Google{" "}
              </button>
            </div>
            <div className="w-full flex-1">
              <button
                onClick={handleMicrosoftLogin}
                type="button"
                className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none transition-colors duration-300 cursor-pointer"
              >
                <img src={microsoftLogo} className="w-4 h-4" />
                Microsoft{" "}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 mb-3 text-sm text-gray-600 text-center">
            <span className="flex-1 h-[.5px] bg-gray-300"></span>
            <span className="text-gray-400">OR</span>
            <span className="flex-1 h-[.5px] bg-gray-300"></span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                required
                className="bg-gray-50 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border-gray-300 focus:border-gray-500 focus:ring-gray-500 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white"
              disabled={!email || !password}
            >
              Sign In
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pt-0">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-800 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    // </div>
  );
};

export default LoginPage;
