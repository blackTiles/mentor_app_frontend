import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/dashboard/student/Overview";
import Mentor from "@/components/dashboard/student/Mentor";
import { useLocation, useNavigate } from "react-router-dom";
import Courses from "@/components/dashboard/student/Courses";
import Messages from "@/components/dashboard/student/Messages";
import { useAuth } from "@/context/AuthContext";

const tabList = [
  { name: "Overview", path: "overview", element: <Overview /> },
  { name: "Courses", path: "courses", element: <Courses /> },
  { name: "My Mentor", path: "mentor", element: <Mentor /> },
  { name: "Messages", path: "messages", element: <Messages /> },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const tabPath = location.pathname.split("/")[3];
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoadingUser(false);
    }
  }, [user, navigate]);

  // Check if the user is authenticated and has the correct role
  useEffect(() => {
    if (!loadingUser && (!isAuthenticated || user.role !== "student")) {
      navigate("/dashboard");
    }
    if (!isLoading && !user) {
      logout();
    }
  }, [loadingUser, user, navigate]);

  if (loadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Student Dashboard
          </h1>
          <p className="text-gray-600">
            Track your progress and connect with your mentor
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-gray-200">
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab.path}
                value={tab.path}
                onClick={() => navigate(`/dashboard/student/${tab.path}`)}
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={tabPath ? tabPath : "overview"}
            className="space-y-4"
          >
            <Routes>
              <Route path="/" element={<Overview />} />
              {tabList.map((tab) => (
                <Route key={tab.path} path={tab.path} element={tab.element} />
              ))}
            </Routes>
          </TabsContent>
        </Tabs>
      </div>
      {/* routes  */}
    </div>
  );
};

export default StudentDashboard;
