import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useAuth();

  if(isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (isAuthenticated) {
    navigate("/dashboard");
  }
  
  return (
    <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {children}
    </div>
  );
};

export default AuthLayout;
