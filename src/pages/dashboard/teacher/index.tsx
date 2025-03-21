import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import Overview from "@/components/dashboard/teacher/Overview";
import Messages from "@/components/dashboard/teacher/Messages";
import Students from "@/components/dashboard/teacher/Students";
import Schedule from "@/components/dashboard/teacher/Schedule";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";

const tabList = [
  { name: "Overview", path: "overview", element: <Overview /> },
  { name: "Students", path: "students", element: <Students /> },
  { name: "Messages", path: "messages", element: <Messages /> },
  { name: "Schedule", path: "schedule", element: <Schedule /> },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabPath = location.pathname.split("/")[3];
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your students and track their progress
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search students..."
                className="pl-10 bg-white border-gray-300 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-gray-800 hover:bg-gray-700">
              <Users size={16} className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          // value={selectedTab}
          // onValueChange={setSelectedTab}
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsList className="bg-gray-200">
            {tabList.map((tab) => (
              <TabsTrigger
                key={tab.path}
                value={tab.path}
                onClick={() => navigate(`/dashboard/teacher/${tab.path}`)}
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
    </div>
  );
};

export default TeacherDashboard;
