import React from "react";
import { useState } from "react";
import { uploadFile } from "@/utils/uploadFile";
import API from "@/lib/axios/instance";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import Spinner from "../loaders/spinner";
import { Assignment } from "@/types/assignment";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { PlusCircle, File, Trash2 } from "lucide-react";

type FileUploadStatusType = "Queue" | "Uploading" | "Uploaded" | "Failed";

interface UploadingStatus {
  name: string;
  status: FileUploadStatusType;
  progress?: number; // Add progress property
}

const CreateAssignment = ({
  isDialogOpen,
  setIsDialogOpen,
  workspaceId,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  workspaceId: string | undefined;
}) => {
  const { assignments, setAssignments } = useAssignmentStore((state) => state);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<
    { name: string; fileUrl: string }[]
  >([]);
  const [uploadStatuses, setUploadStatuses] = useState<UploadingStatus[]>([]);
  const [uploading, setUploading] = useState(false);

  const updateUploadStatus = (index: number, status: FileUploadStatusType) => {
    setUploadStatuses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], status };
      return updated;
    });
  };

  const updateProgress = (index: number, progress: number) => {
    setUploadStatuses((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], progress };
      return updated;
    });
  };

  const courses = [
    { id: "1", name: "Course 1" },
    { id: "2", name: "Course 2" },
    { id: "3", name: "Course 3" },
  ];

  const addAttachment = () => {
    if (fileUpload) {
      const newAttachment = { name: fileName, fileUrl: "" };
      setAttachments([...attachments, newAttachment]);
      setFiles([...files, fileUpload]);
      setFileName("");
      setFileUpload(null);
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      // upload files to S3 bucket one by one
      const uploadedFiles = await Promise.all(
        files.map(async (file, index) => {
          const name = attachments[index].name;
          setUploadStatuses((prev) => [
            ...prev,
            { name, status: "Uploading", progress: 0 },
          ]);

          const fileUrl = await uploadFile(file, "assignments", (prog) =>
            updateProgress(index, prog as number)
          );

          setAttachments((prev) => {
            const updated = [...prev];
            updated[index].fileUrl = fileUrl;
            return updated;
          });

          updateUploadStatus(index, "Uploaded");
          return fileUrl;
        })
      );
      console.log("Uploaded files:", uploadedFiles);

      const formData = new FormData(e.target as HTMLFormElement);

      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        course: formData.get("course"),
        workspace: workspaceId,
        dueDate: formData.get("dueDate"),
        totalPoints: Number(formData.get("points")),
        attachments,
      };

      console.log("Form data:", data);

      const response = await API.post("/assignment/create-assignment", data);
      console.log(response);
      if (response.data.success === true) {
        console.log("caled");
        // Update the assignments state with the new assignment
        const newAssignment = response.data.assignment as Assignment;
        setAssignments([...assignments, newAssignment]);
        setIsDialogOpen(false);
      }
      console.log("Assignment created successfully:", response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      // Reset the upload status after submission
      setUploadStatuses([]);
      setFiles([]); // Clear files after submission
      setAttachments([]); // Clear attachments after submission
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 hover:bg-gray-700">
          <PlusCircle size={16} className="mr-2" />
          Create Assignment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new assignment for your students.
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
                <Input id="dueDate" name="dueDate" type="date" required />
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
                  className="flex-1"
                  onChange={(e) => setFileName(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const fileInput = document.getElementById(
                      "fileUpload"
                    ) as HTMLInputElement;
                    fileInput.click();
                  }}
                >
                  <File size={16} className="" />
                  Upload File
                </Button>
                <Input
                  type="file"
                  id="fileUpload"
                  name="fileUpload"
                  className="hidden"
                  onChange={(e) => {
                    // if (e.target.files && e.target.files.length > 0) {
                    //   setFiles([...files, e.target.files[0]]);
                    // }
                    setFileUpload(e.target.files?.[0] || null);
                    setFileName(e.target.files?.[0]?.name || "");
                  }}
                />
                <Button type="button" variant="outline" onClick={addAttachment}>
                  Add
                </Button>
              </div>
              {attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {attachments.map((attachment, index) => {
                    const status = uploadStatuses[index]?.status;
                    const progress = uploadStatuses[index]?.progress || 0;
                    return (
                      <div
                        key={index}
                        className="relative bg-gray-100 rounded p-2 flex justify-between items-center"
                      >
                        {/* Background bar */}
                        <div
                          className={`absolute top-0 left-0 h-full ${
                            status === "Uploaded"
                              ? "bg-green-300"
                              : status === "Uploading"
                              ? "bg-yellow-300"
                              : "bg-gray-300"
                          } rounded transition-all`}
                          style={{
                            width: `${
                              status === "Uploaded" ? 100 : progress || 0
                            }%`,
                            zIndex: 0,
                          }}
                        ></div>
                        {/* Content */}
                        <div className="flex items-center justify-between w-full z-10">
                          <span className="text-sm text-gray-800 font-medium">
                            {attachment.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              {status === "Uploading"
                                ? `${progress?.toFixed(0)}%`
                                : status || "Queue"}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAttachment(index)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
              disabled={uploading}
              type="submit"
              className="bg-gray-800 hover:bg-gray-700"
            >
              {uploading ? <Spinner size="h-5 w-5" /> : "Create Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAssignment;
