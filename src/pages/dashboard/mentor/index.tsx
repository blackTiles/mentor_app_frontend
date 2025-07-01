import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Messages from "@/components/dashboard/Messages";
import Students from "@/components/dashboard/Students";
import Schedule from "@/components/dashboard/Schedule";
import { useAuth } from "@/context/AuthContext";
import Overview from "@/components/dashboard/overview";
import Workspaces from "@/components/dashboard/workspaces";
import Workspace from "@/components/dashboard/workspaces/workspace";
import AssignmentDetailsPage from "@/components/dashboard/workspaces/workspace/assignment";

const tabList = [
  { name: "Overview", path: "overview", element: <Overview /> },
  { name: "Workspaces", path: "workspaces", element: <Workspaces /> },
  {
    name: "Workspace",
    path: "workspaces/:workspaceId",
    element: <Workspace />,
  },
  {
    name: "Assignment",
    path: "workspaces/:workspaceId/:assignmentId",
    element: <AssignmentDetailsPage />,
  },
  { name: "Courses", path: "courses", element: <div>Courses</div> },
  { name: "Students", path: "students", element: <Students /> },
  { name: "Messages", path: "messages", element: <Messages /> },
  { name: "Schedule", path: "schedule", element: <Schedule /> },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoadingUser(false);
    }
  }, [user, navigate]);

  // Check if the user is authenticated and has the correct role
  useEffect(() => {
    if (!loadingUser && (!isAuthenticated || user.role !== "mentor")) {
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
    <div className="h-screen bg-gray-100 overflow-y-scroll pb-20">
      {/* Main Content */}
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          {tabList.map((tab) => (
            <Route key={tab.path} path={tab.path} element={tab.element} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default TeacherDashboard;
