import React from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // });
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
