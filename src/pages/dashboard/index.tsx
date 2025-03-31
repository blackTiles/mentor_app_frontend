import { useState } from "react";
import { SignOut } from "@/lib/firebase/emailAndPasswordAuth";
import { CheckCircle, User, Users, Mail, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

type Role = "student" | "mentor";

const EmailVerificationPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Simulate email verification
  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      user.reload().then(() => {
        const emailVerified = user.emailVerified;
        setIsVerified(emailVerified);
      });
    }
  });

  if (!isVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md bg-white shadow-lg">
          <CardHeader className="flex flex-col items-center space-y-2 pb-2">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
              <Mail className="h-6 w-6 text-gray-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 text-center">
              Verification Email Sent
            </CardTitle>
            <CardDescription className="text-gray-500 text-center">
              We've sent a verification link to your email address
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                Please check your inbox and click on the verification link to
                complete your account setup. If you don't see the email in your
                inbox, please check your spam folder.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3 px-6 pb-6 pt-0">
            <Button className="w-full bg-gray-700 hover:bg-gray-800">
              Resend Verification Email
            </Button>
            <Button
              onClick={SignOut}
              variant="outline"
              className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              Back to Login
            </Button>

            {/* For demo purposes only - to simulate verification */}
            {/* <div className="pt-4 border-t border-gray-200 mt-4">
              <Button
                variant="link"
                className="text-gray-500 text-sm w-full"
                onClick={handleVerify}
              >
                Demo: Simulate Email Verification
              </Button>
            </div> */}
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 text-center">
            Email Verified!
          </CardTitle>
          <CardDescription className="text-gray-500 text-center">
            Please select how you'd like to use our platform
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 py-4">
          <Alert className="bg-green-50 border-green-200 mb-6">
            <AlertDescription className="text-green-700 text-sm">
              Your email has been successfully verified. One more step to
              complete your account setup.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className={`flex flex-col items-center justify-center h-32 p-4 border-2 hover:bg-gray-50 ${
                selectedRole === "student"
                  ? "border-gray-700 bg-gray-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleRoleSelect("student")}
            >
              <User className="h-8 w-8 mb-2 text-gray-600" />
              <span className="font-medium text-gray-800">Student</span>
              <span className="text-xs text-gray-500 mt-1">
                Join as a learner
              </span>
            </Button>

            <Button
              variant="outline"
              className={`flex flex-col items-center justify-center h-32 p-4 border-2 hover:bg-gray-50 ${
                selectedRole === "mentor"
                  ? "border-gray-700 bg-gray-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleRoleSelect("mentor")}
            >
              <Users className="h-8 w-8 mb-2 text-gray-600" />
              <span className="font-medium text-gray-800">Mentor</span>
              <span className="text-xs text-gray-500 mt-1">
                Join as a teacher
              </span>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-3 px-6 pb-6 pt-2">
          <Button
            className="w-full bg-gray-700 hover:bg-gray-800"
            disabled={!selectedRole}
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
