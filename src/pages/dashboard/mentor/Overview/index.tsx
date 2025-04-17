import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Calendar, Users } from "lucide-react";
import { CardDescription } from "@/components/ui/card";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import API from "@/lib/axios/instance";
import Spinner from "@/components/loaders/spinner";
import { WorkspaceCardProps } from "@/components/dashboard/WorkspaceCard";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import { useAuth } from "@/context/AuthContext";

const mockStudents = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    subject: "Mathematics",
    progress: 75,
    lastActive: "2 hours ago",
    picture: "",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    subject: "Physics",
    progress: 60,
    lastActive: "1 day ago",
    picture: "",
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael.s@example.com",
    subject: "Chemistry",
    progress: 90,
    lastActive: "3 hours ago",
    picture: "",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Biology",
    progress: 45,
    lastActive: "Just now",
    picture: "",
  },
];

const Overview = () => {
  const { user } = useAuth();
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const { workspaces, setWorkspaces } = useWorkspaceStore((state) => state);
  const [searchQuery, setSearchQuery] = useState("");
  // const [workspaces, setWorkspaces] = useState([]);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoadingWorkspaces(true);
        const response = await API.get("/workspace/get-workspaces"); // Adjust the endpoint as needed
        if (response.status === 200) {
          setWorkspaces(response.data.workspaces);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoadingWorkspaces(false);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="pl-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome {user.name}
          </h1>
          <p className="text-gray-600">
            Manage your students and track their progress
          </p>
        </div>
        {/* <div className="mt-4 md:mt-0 flex space-x-3"> */}
          {/* <div className="relative">
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
            </div> */}
          {/* <Button
              onClick={() => setShowWorkspaceModal(true)}
              className="bg-gray-800 hover:bg-gray-700"
            >
              <Users size={16} className="mr-0" />
              Create New Workspace
            </Button> */}
        {/* </div> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">
                {mockStudents.length}
              </p>
              <Users size={32} className="text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">3</p>
              <Calendar size={32} className="text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-800">
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">5</p>
              <MessageSquare size={32} className="text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      {/* <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">
            Recent Students
          </CardTitle>
          <CardDescription>Your recently active students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.slice(0, 3).map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={student.picture} alt={student.name} />
                    <AvatarFallback className="bg-gray-300">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">
                      Active {student.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge className="mr-3 bg-gray-200 text-gray-700 hover:bg-gray-300">
                    {student.subject}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-700 border-gray-300"
                  >
                    <MessageSquare size={14} className="mr-1" /> Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* recent workspaces  */}
      <div className="mt-4 sm:mt-12">
        <div className="pb-2 pl-2">
          <h1 className="text-2xl font-bold text-gray-800">
            Recent Workspaces
          </h1>
          <p className="text-gray-600">Your recently active workspaces</p>
        </div>
        <div className="w-full h-full">
          {loadingWorkspaces ? (
            <div className="w-full mx-auto flex justify-center items-center h-32">
              <Spinner />
            </div>
          ) : workspaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workspaces.map((workspace: WorkspaceCardProps) => (
                <WorkspaceCard
                  key={workspace._id}
                  _id={workspace._id}
                  name={workspace.name}
                  description={workspace.description}
                  members={workspace.members}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm p-3">
              No workspaces found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Overview;
