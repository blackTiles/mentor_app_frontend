import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/lib/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import { Assignment } from "@/types/assignment";
import CreateAssignment from "@/components/workspace/CreateAssignment";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Clock,
  FileText,
  Users,
  PlusCircle,
  ArrowLeft,
  Edit,
} from "lucide-react";
import Spinner from "@/components/loaders/spinner";

export default function Workspace() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { workspaces, workspace, setWorkspace } = useWorkspaceStore(
    (state) => state
  );
  const {
    assignments,
    setAssignments,
    loadingAssignments,
    setLoadingAssignments,
  } = useAssignmentStore((state) => state);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const fetchAssignments = useCallback(async () => {
    try {
      setLoadingAssignments(true);
      const response = await API.get(
        `/assignment/get-assignments/${workspaceId}`
      );
      if (response.status === 200) {
        console.log(response.data?.workspace);
        setWorkspace(response.data?.workspace);
        setAssignments(response.data?.workspace?.assignments);
      }
      setLoadingAssignments(false);
      return response.data?.workspace?.assignments;
    } catch (error) {
      setLoadingAssignments(false);
      throw new Error("Error fetching assignments: " + error);
    }
  }, [workspaceId, setAssignments, setLoadingAssignments]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignments", workspaceId],
    queryFn: fetchAssignments,
    enabled: !!workspaceId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error fetching assignments.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <div className="w-full no-scrollbar">
        <header className="bg-white shadow">
          <div className="w-full mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft size={20} />
                </Button>
                <h1 className="text-2xl font-bold text-gray-800">
                  {workspace?.name || "Workspace Overview"}
                </h1>
              </div>
              <Button
                onClick={() => setShowWorkspaceModal(true)}
                variant="outline"
                className="cursor-pointer"
              >
                <Edit size={16} className="mr-2" />
                Edit Workspace
              </Button>
              {showWorkspaceModal && (
                <CreateWorkspace
                  workspace={workspace || undefined}
                  setShowWorkspaceModal={setShowWorkspaceModal}
                />
              )}
            </div>
          </div>
        </header>

        <main className="w-full py-6 px-6">
          <div className="w-full flex flex-wrap items-center justify-center gap-6 mb-6">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Total Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <FileText className="h-10 w-10 text-gray-500" />
                  <span className="text-3xl font-bold ml-4">
                    {assignments.length}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Due This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-10 w-10 text-gray-500" />
                  <span className="text-3xl font-bold ml-4">2</span>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader className="pb-2 flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Users className="h-10 w-10 text-gray-500" />
                  <span className="text-3xl font-bold ml-4">
                    {workspace?.members?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex justify-between items-center gap-2">
              <div className="flex flex-col gap-1">
                <CardTitle>Assignment List</CardTitle>
                <CardDescription>
                  Manage your assignments across all workspaces
                </CardDescription>
              </div>
              <CreateAssignment
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                workspaceId={workspaceId}
              />
            </CardHeader>
            <CardContent>
              {loadingAssignments ? (
                <div className="flex items-center justify-center h-32">
                  <Spinner />
                </div>
              ) : !loadingAssignments && assignments.length === 0 ? (
                <div className="flex items-center justify-center h-32 flex-col gap-4">
                  <p className="text-gray-500">No assignments found.</p>
                  <Button
                    className="bg-gray-800 hover:bg-gray-700"
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Create Assignment
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {assignments.map((task: Assignment) => (
                    <div
                      key={task._id}
                      className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer hover:bg-gray-100 transition"
                      onClick={() =>
                        navigate(
                          `/dashboard/mentor/workspaces/${workspaceId}/${task._id}`
                        )
                      }
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="font-semibold text-lg"
                            title={task?.title}
                          >
                            {task.title}
                          </span>
                        </div>
                        <div
                          className="text-gray-500 text-sm mt-1"
                          title={task?.description}
                        >
                          {task?.description}
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600">
                          <span>
                            <strong>Due:</strong>{" "}
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString(
                                  "en-US",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )
                              : "No due date"}
                          </span>
                          <span>
                            <strong>Points:</strong> {task.totalPoints}
                          </span>
                          <span>
                            <strong>Attachments:</strong>{" "}
                            {task?.attachments?.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
