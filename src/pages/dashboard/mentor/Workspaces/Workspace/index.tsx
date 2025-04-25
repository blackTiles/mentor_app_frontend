import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/lib/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import { Assignment } from "@/types/assignment";
import CreateAssignment from "@/components/workspace/CreateAssignment";
import DeleteConfirmationPopup from "@/components/popups/DeleteConfirmationPopup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Clock,
  FileText,
  Users,
  PlusCircle,
  Trash2,
  FilePenLine,
  PlusIcon,
  ArrowLeft,
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
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] =
    useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState<string>("");
  const [deletingAssignment, setDeletingAssignment] = useState(false);

  const handleDeleteButtonClick = (assignmentId: string) => {
    setDeleteAssignmentId(assignmentId);
    setIsDeleteConfirmationPopupOpen(true);
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    setDeletingAssignment(true);
    try {
      const response = await API.delete(
        `/assignment/delete-assignment/${assignmentId}`
      );
      if (response.data.success) {
        console.log("Assignment deleted successfully:", response.data);
        const updatedAssignments = assignments.filter(
          (assignment: Assignment) => assignment._id !== assignmentId
        );
        setAssignments(updatedAssignments);
        setDeleteAssignmentId("");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    } finally {
      setDeletingAssignment(false);
      setIsDeleteConfirmationPopupOpen(false);
    }
  };

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

  // useEffect(() => {
  //   fetchAssignments();
  // }, [setAssignments]);

  // useEffect(() => {
  //   if (workspace) {
  //     console.log("Workspace", workspace);
  //   }
  // }, [workspaceId, workspace]);

  if(isLoading) {
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
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-auto no-scrollbar">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-6">
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
              <CreateAssignment
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                workspaceId={workspaceId}
              />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
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
            <Card>
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
            <Card>
              <CardHeader className="pb-2 flex justify-between items-center">
                <CardTitle className="text-lg font-medium">
                  Total Members
                </CardTitle>
                <PlusCircle
                  size={20}
                  className="text-gray-700 cursor-pointer hover:text-gray-500"
                />
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
            <CardHeader>
              <CardTitle>Assignment List</CardTitle>
              <CardDescription>
                Manage your assignments across all workspaces
              </CardDescription>
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
                <Table className="no-scrollbar">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Attachments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((task: Assignment) => (
                      <TableRow
                        key={task._id}
                        className="hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/dashboard/mentor/workspaces/${workspaceId}/${task._id}`
                          )
                        }
                      >
                        <TableCell title={task?.title} className="font-medium">
                          {task.title?.length > 30
                            ? task?.title?.slice(0, 30) + "..."
                            : task?.title}
                        </TableCell>
                        <TableCell title={task?.description}>
                          {task.description?.length > 30
                            ? task?.description?.slice(0, 30) + "..."
                            : task?.description}
                          ...
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{task.totalPoints}</TableCell>
                        <TableCell>{task?.attachments?.length}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="icon"
                              variant={"ghost"}
                              className="cursor-pointer"
                            >
                              <FilePenLine color="gray" size={16} />
                              {/* Edit */}
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="cursor-pointer"
                              onClick={() => handleDeleteButtonClick(task._id)}
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <Trash2 color="red" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
      <DeleteConfirmationPopup
        title="Delete Assignment"
        description={`Are you sure you want to delete the assignment "${
          assignments.find(
            (assignment) => assignment._id === deleteAssignmentId
          )?.title
        }"?`}
        onConfirm={() => handleDeleteAssignment(deleteAssignmentId)}
        isDeleteConfirmationPopupOpen={isDeleteConfirmationPopupOpen}
        setIsDeleteConfirmationPopupOpen={setIsDeleteConfirmationPopupOpen}
        deletingAssignment={deletingAssignment}
      />
    </div>
  );
}
