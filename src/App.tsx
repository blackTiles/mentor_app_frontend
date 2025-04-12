// import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
// import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import TeacherDashboard from "@/pages/dashboard/mentor";
import StudentDashboard from "@/pages/dashboard/student";
import LoginPage from "@/pages/auth/login";
import SignupPage from "@/pages/auth/signup";
import EmailVerificationPage from "./pages/dashboard";
import AuthLayout from "@/pages/auth/layout";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header />
        <div className="flex flex-1">
          {/* <Sidebar /> */}
          <main className="flex-1">
            <Routes>
              <Route
                path="/"
                element={<AuthLayout children={<LoginPage />} />}
              />
              <Route
                path="/login"
                element={<AuthLayout children={<LoginPage />} />}
              />
              <Route
                path="/signup"
                element={<AuthLayout children={<SignupPage />} />}
              />
              <Route path="/dashboard" element={<EmailVerificationPage />} />
              <Route
                path="/dashboard/mentor/*"
                element={<TeacherDashboard />}
              />
              <Route
                path="/dashboard/student/*"
                element={<StudentDashboard />}
              />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
