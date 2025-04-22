import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/lib/axios/instance";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import { Assignment } from "@/types/assignment";
import CreateAssignment from "@/components/workspace/CreateAssignment";
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
  File,
  FilePen,
  FilePenLine,
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
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoadingAssignments(false);
    }
  }, [workspaceId, setAssignments, setLoadingAssignments]);

  useEffect(() => {
    fetchAssignments();
  }, [setAssignments]);

  useEffect(() => {
    if (workspace) {
      console.log("Workspace", workspace);
    }
  }, [workspaceId, workspace]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 overflow-auto no-scrollbar">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {workspace?.name || "Workspace Overview"}
              </h1>
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
              <CardHeader className="pb-2">
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
                            >
                              <Trash2 color="red" size={16} />
                              {/* Delete */}
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
    </div>
  );
}
