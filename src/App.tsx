import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import TeacherDashboard from "@/pages/dashboard/teacher";
import StudentDashboard from "@/pages/dashboard/student";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import { AuthProvider } from "@/context/AuthContext";

const TopBar = () => (
  // Logo
    <h1 className="text-2xl font-bold"> MentorApp </h1>
  
);

const AppLayout = () => {
  const location = useLocation();

  // Define routes where Header and Sidebar should be hidden
  const hideLayoutPaths = ["/", "/signup"];
  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBar /> {/* Always show the TopBar with the logo */}
      {!shouldHideLayout && <Header />}
      <div className="flex flex-1">
        {!shouldHideLayout && <Sidebar />}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard/teacher/*" element={<TeacherDashboard />} />
            <Route path="/dashboard/student/*" element={<StudentDashboard />} />
          </Routes>
        </main>
      </div>
      <Footer /> {/* Always visible */}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
};

export default App;
