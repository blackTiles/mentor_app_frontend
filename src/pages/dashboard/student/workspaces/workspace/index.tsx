import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "@/lib/axios/instance";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import { Assignment } from "@/types/assignment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, FileText, Users, PlusCircle, Trash2 } from "lucide-react";
import Spinner from "@/components/loaders/spinner";

interface Attachment {
  name: string;
  fileUrl: string;
}

export default function Workspace() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { workspace, setWorkspace } = useWorkspaceStore(
    (state) => state
  );
  const {
    assignments,
    setAssignments,
    loadingAssignments,
    setLoadingAssignments,
  } = useAssignmentStore((state) => state);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [fileName, setFileName] = useState("");

  // Sample data
  const courses = [
    { id: "1", name: "Web Development" },
    { id: "2", name: "Data Science" },
    { id: "3", name: "Mobile App Development" },
  ];

  const addAttachment = () => {
    if (fileName.trim()) {
      setAttachments([
        ...attachments,
        { name: fileName, fileUrl: `/files/${fileName}` },
      ]);
      setFileName("");
    }
  };

  const removeAttachment = (index: any) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      console.log(formData);
      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        course: formData.get("course"),
        workspace: workspaceId,
        dueDate: formData.get("dueDate"),
        totalPoints: Number(formData.get("points")),
        attachments: attachments.map((attachment) => attachment.fileUrl),
      };

      const response = await API.post("/assignment/create-assignment", data);
      console.log(response);
      if (response.data.success === true) {
        console.log("caled");
        // Update the assignments state with the new assignment
        const newAssignment = response.data.assignment as Assignment;
        setAssignments([...assignments, newAssignment]);
        setIsDialogOpen(false);
        setAttachments([]); // Clear attachments after submission
      }
      console.log("Assignment created successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignments = useCallback(async () => {
    try {
      setLoadingAssignments(true);
      const response = await API.get(
        `/assignment/get-assignments/${workspaceId}`
      );
      if (response.status === 200) {
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                {workspace?.name || "Workspace Overview"}
              </h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gray-800 hover:bg-gray-700">
                    <PlusCircle size={16} className="mr-2" />
                    Create Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription>
                      Fill in the details to create a new assignment for your
                      students.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Assignment title"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Detailed description of the assignment"
                          rows={3}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="course">Course</Label>
                          <Select>
                            <SelectTrigger id="course" name="course">
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {/* <div className="grid gap-2">
                          <Label htmlFor="workspace">Workspace</Label>
                          <Select>
                            <SelectTrigger id="workspace" name="workspace">
                              <SelectValue placeholder="Select workspace" />
                            </SelectTrigger>
                            <SelectContent>
                              {workspaces.map((workspace) => (
                                <SelectItem
                                  key={workspace.id}
                                  value={workspace.id}
                                >
                                  {workspace.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div> */}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            name="dueDate"
                            type="date"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="points">Total Points</Label>
                          <Input
                            id="points"
                            type="number"
                            name="points"
                            defaultValue={100}
                            min={0}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label>Attachments</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="File name"
                            value={fileName}
                            name="fileName"
                            onChange={(e) => setFileName(e.target.value)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addAttachment}
                          >
                            Add
                          </Button>
                        </div>
                        {attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-gray-100 p-2 rounded"
                              >
                                <span>{attachment.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttachment(index)}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-700"
                      >
                        Create Assignment
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Attachments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((task: Assignment) => (
                      <TableRow key={task._id}>
                        <TableCell className="font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{"Course Not Mentioned"}</TableCell>
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
                        <TableCell>{5}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <FileText size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 size={16} />
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
