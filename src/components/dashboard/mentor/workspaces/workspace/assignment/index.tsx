import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DeleteConfirmationPopup from "@/components/popups/DeleteConfirmationPopup";
import API from "@/lib/axios/instance";
import { useQuery } from "@tanstack/react-query";
import { useAssignmentStore } from "@/lib/zustand/assignmentStore";
import { S3_BASE_URL } from "@/constants/urls";
import { uploadFile } from "@/utils/uploadFile";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  Link,
  MessageCircle,
  Paperclip,
  Save,
  Trash2,
  User,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Assignment } from "@/types/assignment";

interface Submission {
  id: string;
  student: {
    id: string;
    name: string;
    avatar: string;
    email: string;
  };
  submittedAt: string | null;
  status: "submitted" | "graded" | "pending";
  grade: number | null;
  feedback: string | null;
  attachments: Array<{ name: string; fileUrl: string; size: string }>;
  comments: Array<{
    id: string;
    from: "student" | "teacher";
    text: string;
    timestamp: string;
  }> | null;
}

// interface Assignment {
//   id: string;
//   title: string;
//   description: string;
//   workspace: {
//     id: string;
//     name: string;
//   };
//   course: {
//     id: string;
//     name: string;
//   };
//   teacher: {
//     id: string;
//     name: string;
//   };
//   dueDate: string;
//   totalPoints: number;
//   attachments: Array<{ name: string; fileUrl: string; size: string }>;
//   createdAt: string;
//   updatedAt: string;
//   status: "active" | "archived";
// }

export default function AssignmentDetailsPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { assignmentId } = useParams<{ assignmentId: string }>();
  const { assignment, setAssignment, assignments, setAssignments } =
    useAssignmentStore((state) => state);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(
    null
  );
  const [feedbackText, setFeedbackText] = useState("");
  const [gradePoints, setGradePoints] = useState("");
  const [deletingAssignment, setDeletingAssignment] = useState(false);
  const [isDeleteConfirmationPopupOpen, setIsDeleteConfirmationPopupOpen] =
    useState(false);
  const [attachments, setAttachments] = useState<
    { name: string; file: File; fileUrl: string }[]
  >([]);
  const [savingAssignment, setSavingAssignment] = useState(false);

  const handleFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setAttachments((prev) => [
        ...prev,
        ...filesArray.map((file) => ({
          name: file.name,
          file,
          fileUrl: "",
        })),
      ]);
    }
  };

  const fetchAssignmentDetails = async () => {
    try {
      const response = await API.get(
        `/assignment/get-assignment/${assignmentId}`
      );
      if (response.status === 200) {
        setAssignment(response.data.assignment);
        return response?.data?.assignment;
      } else {
        throw new Error("Failed to fetch assignment details");
      }
    } catch (error) {
      throw new Error(" Failed to fetch assignment details");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["assignmentDetails", assignmentId],
    queryFn: fetchAssignmentDetails,
    enabled: !!assignmentId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleDeleteAssignment = async (assignmentId: string) => {
    setDeletingAssignment(true);
    try {
      const response = await API.delete(
        `/assignment/delete-assignment/${assignmentId}`
      );
      if (response.data.success) {
        console.log("Assignment deleted successfully:", response.data);
        const updatedAssignments = assignments.filter(
          (a) => a._id !== assignmentId
        );
        setAssignments(updatedAssignments);
        navigate(`/dashboard/mentor/workspaces/${assignment?.workspace?._id}`);
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
    } finally {
      setDeletingAssignment(false);
      setIsDeleteConfirmationPopupOpen(false);
    }
  };

  // Sample assignment data
  // const assignment: Assignment = {
  //   id: "1",
  //   title: "Create a Landing Page",
  //   description:
  //     "Design and implement a responsive landing page using React and Tailwind CSS. The landing page should include a hero section, features section, testimonials, and a contact form. Make sure to implement responsive design for mobile, tablet, and desktop views. Use React hooks for any interactive elements.",
  //   workspace: {
  //     id: "1",
  //     name: "Frontend Team",
  //   },
  //   course: {
  //     id: "1",
  //     name: "Web Development",
  //   },
  //   teacher: {
  //     id: "1",
  //     name: "Professor Johnson",
  //   },
  //   dueDate: "2025-04-25T23:59:59",
  //   totalPoints: 100,
  //   attachments: [
  //     {
  //       name: "wireframe.pdf",
  //       fileUrl: "/files/wireframe.pdf",
  //       size: "1.2 MB",
  //     },
  //     {
  //       name: "design_guidelines.docx",
  //       fileUrl: "/files/design_guidelines.docx",
  //       size: "890 KB",
  //     },
  //   ],
  //   createdAt: "2025-04-10T14:30:00",
  //   updatedAt: "2025-04-12T10:15:00",
  //   status: "active",
  // };

  // Sample submissions data
  const submissions: Submission[] = [
    {
      id: "1",
      student: {
        id: "101",
        name: "Alex Johnson",
        avatar: "/avatars/alex.jpg",
        email: "alex.j@example.com",
      },
      submittedAt: "2025-04-20T15:45:00",
      status: "graded",
      grade: 92,
      feedback:
        "Excellent work on the responsive design. The components are well-structured and reusable. Consider adding more accessible features in future projects.",
      attachments: [
        {
          name: "landing_page_submission.zip",
          fileUrl: "/submissions/landing_page_submission.zip",
          size: "3.5 MB",
        },
        {
          name: "documentation.pdf",
          fileUrl: "/submissions/documentation.pdf",
          size: "1.8 MB",
        },
      ],
      comments: [
        {
          id: "c1",
          from: "student",
          text: "I had some difficulty with the responsive navigation. Please let me know if my solution is optimal.",
          timestamp: "2025-04-20T15:46:00",
        },
        {
          id: "c2",
          from: "teacher",
          text: "Your solution works well. Consider using React's useMediaQuery hook for better performance.",
          timestamp: "2025-04-21T09:30:00",
        },
      ],
    },
    {
      id: "2",
      student: {
        id: "102",
        name: "Taylor Smith",
        avatar: "/avatars/taylor.jpg",
        email: "taylor.s@example.com",
      },
      submittedAt: "2025-04-22T18:20:00",
      status: "submitted",
      grade: null,
      feedback: null,
      attachments: [
        {
          name: "project_files.zip",
          fileUrl: "/submissions/project_files.zip",
          size: "4.1 MB",
        },
      ],
      comments: [],
    },
    {
      id: "3",
      student: {
        id: "103",
        name: "Jordan Lee",
        avatar: "/avatars/jordan.jpg",
        email: "jordan.l@example.com",
      },
      submittedAt: "2025-04-19T12:10:00",
      status: "graded",
      grade: 85,
      feedback:
        "Good implementation of the features section. The contact form validation could be improved. The design matches the wireframe well.",
      attachments: [
        {
          name: "landing_page_project.zip",
          fileUrl: "/submissions/landing_page_project.zip",
          size: "3.8 MB",
        },
      ],
      comments: [
        {
          id: "c3",
          from: "teacher",
          text: "Your form validation has a bug when submitting with empty fields.",
          timestamp: "2025-04-20T11:15:00",
        },
        {
          id: "c4",
          from: "student",
          text: "Thank you for the feedback. I've fixed the validation issue.",
          timestamp: "2025-04-20T14:30:00",
        },
      ],
    },
    {
      id: "4",
      student: {
        id: "104",
        name: "Casey Morgan",
        avatar: "/avatars/casey.jpg",
        email: "casey.m@example.com",
      },
      submittedAt: null,
      status: "pending",
      grade: null,
      feedback: null,
      attachments: [],
      comments: [],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "graded":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Graded
          </Badge>
        );
      case "submitted":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200"
          >
            Submitted
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "late":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-200"
          >
            Late
          </Badge>
        );
      default:
        return null;
    }
  };

  const handleSaveAssignment = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    setSavingAssignment(true);
    try {
      e.preventDefault();
      const uploadFiles = await Promise.all(
        attachments?.map(async (attachment, index) => {
          const fileUrl = await uploadFile(
            attachment.file,
            "assignments",
            (prog) => console.log(`Uploading ${attachment.name}: ${prog}%`)
          );
          console.log(`File uploaded: ${attachment.name} to ${fileUrl}`);
          const newAttachments = [...attachments];
          newAttachments[index] = { ...attachment, fileUrl };
          setAttachments(newAttachments);
          return {
            name: attachment.name,
            fileUrl,
          };
        })
      );
      console.log("Uploaded attachments:", uploadFiles);

      const formData = new FormData(formRef.current!);

      const updatedAttachments = [
        ...(assignment?.attachments || []),
        ...uploadFiles,
      ];

      const data = {
        title: formData.get("title"),
        description: formData.get("description"),
        course: formData.get("course"),
        workspace: assignment?.workspace?._id,
        dueDate: formData.get("dueDate"),
        totalPoints: Number(formData.get("points")),
        attachments: updatedAttachments,
      };
      const response = await API.put(
        `/assignment/update-assignment/${assignmentId}`,
        data
      );
      console.log("Assignment updated successfully:", response);
      if (response.data.success === true) {
        setAssignment(response.data.assignment);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error saving assignment:", error);
    } finally {
      // setAttachments([]);
    }
  };

  const openSubmission = (submission: Submission) => {
    setActiveSubmission(submission);
    setFeedbackText(submission.feedback || "");
    setGradePoints(submission.grade !== null ? String(submission.grade) : "");
  };

  const closeSubmission = () => {
    setActiveSubmission(null);
  };

  const handleGradeSubmission = () => {
    // Logic to save grade and feedback
    alert(`Grade saved: ${gradePoints} points with feedback`);
    closeSubmission();
  };

  const handleRemoveAttachment = (attachment: {
    name: string;
    fileUrl: string;
  }) => {
    if (!assignment) return;
    setAssignment({
      ...assignment,
      attachments: assignment.attachments.filter(
        (att) => att.fileUrl !== attachment.fileUrl
      ),
    });
  };

  const downloadAttachment = async (attachmentName: string) => {
    try {
      const link = document.createElement("a");
      link.href = `${S3_BASE_URL}/assignments/${attachmentName}`;
      link.setAttribute("download", attachmentName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log("Error downloading attachment:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="p-0"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">
              Assignment Details
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-2xl">
                    {assignment?.title}
                  </CardTitle>
                  <CardDescription>
                    {assignment?.course?.name} - {assignment?.workspace?.name}
                  </CardDescription>
                </div>
                {!isEditMode ? (
                  <div className="flex gap-2 items-center">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditMode(true)}
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:text-red-500"
                      onClick={() => setIsDeleteConfirmationPopupOpen(true)}
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditMode(false)}
                    >
                      <X size={16} className="mr-2" />
                      Cancel
                    </Button>
                    <Button
                      className="bg-gray-800 hover:bg-gray-700"
                      onClick={handleSaveAssignment}
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardContent>
                {!isEditMode ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <p>{assignment?.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Details</h3>
                        <div className="bg-gray-50 p-4 rounded-md space-y-3">
                          <div className="flex items-start">
                            <Calendar
                              size={18}
                              className="mr-2 mt-1 text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Due Date
                              </p>
                              <p className="text-sm text-gray-600">
                                {assignment?.dueDate &&
                                  formatDate(assignment.dueDate)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <FileText
                              size={18}
                              className="mr-2 mt-1 text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Total Points
                              </p>
                              <p className="text-sm text-gray-600">
                                {assignment?.totalPoints} points
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <User
                              size={18}
                              className="mr-2 mt-1 text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Created By
                              </p>
                              <p className="text-sm text-gray-600">
                                {assignment?.teacher.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock
                              size={18}
                              className="mr-2 mt-1 text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Created
                              </p>
                              <p className="text-sm text-gray-600">
                                {assignment?.createdAt &&
                                  formatDate(assignment.createdAt)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start">
                            <Clock
                              size={18}
                              className="mr-2 mt-1 text-gray-500"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Last Updated
                              </p>
                              <p className="text-sm text-gray-600">
                                {assignment?.updatedAt &&
                                  formatDate(assignment.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">
                          Attachments
                        </h3>
                        {assignment?.attachments &&
                        assignment.attachments.length > 0 ? (
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="space-y-2">
                              {assignment.attachments.map(
                                (attachment, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
                                  >
                                    <div className="flex items-center">
                                      <Paperclip
                                        size={16}
                                        className="mr-2 text-gray-500"
                                      />
                                      <div>
                                        <p className="font-medium text-sm">
                                          {attachment.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {attachment.size}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      onClick={() =>
                                        downloadAttachment(attachment.fileUrl)
                                      }
                                      variant="ghost"
                                      size="sm"
                                      type="button"
                                    >
                                      <Download size={16} />
                                    </Button>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-4 rounded-md text-gray-500 text-center">
                            No attachments
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" ref={formRef}>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="title">Assignment Title</Label>
                        <Input
                          id="title"
                          name="title"
                          defaultValue={assignment?.title}
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          rows={5}
                          name="description"
                          defaultValue={assignment?.description}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dueDate">Due Date</Label>
                        <Input
                          id="dueDate"
                          name="dueDate"
                          type="datetime-local"
                          defaultValue={
                            assignment?.dueDate
                              ? new Date(assignment.dueDate)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="points">Total Points</Label>
                        <Input
                          id="points"
                          name="points"
                          type="number"
                          defaultValue={assignment?.totalPoints}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Attachments</Label>
                      <div
                        onClick={() => {
                          const fileInput = document.getElementById(
                            "fileInput"
                          ) as HTMLInputElement;
                          fileInput?.click();
                        }}
                        className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center"
                      >
                        <div className="flex flex-col items-center">
                          <Paperclip size={24} className="text-gray-500 mb-2" />
                          <p className="text-sm text-gray-600 mb-1">
                            Drag files here or click to upload
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOCX, ZIP (max 10MB)
                          </p>
                        </div>
                      </div>
                      <Input
                        type="file"
                        accept=".pdf,.docx,.zip"
                        className="hidden"
                        id="fileInput"
                        onChange={handleFilesUpload}
                        multiple
                      />

                      {/* {assignment?.attachments &&
                        assignment.attachments.length > 0 && ( */}
                          <div className="mt-4 space-y-2">
                            {assignment?.attachments?.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
                              >
                                <div className="flex items-center">
                                  <Paperclip
                                    size={16}
                                    className="mr-2 text-gray-500"
                                  />
                                  <div>
                                    <p className="font-medium text-sm">
                                      {attachment.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {attachment.size}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  onClick={() =>
                                    handleRemoveAttachment(attachment)
                                  }
                                  variant="ghost"
                                  size="sm"
                                  type="button"
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        {/* )} */}

                      <div className="mt-4 space-y-2">
                        {attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200"
                          >
                            <div className="flex items-center">
                              <Paperclip
                                size={16}
                                className="mr-2 text-gray-500"
                              />
                              <div>
                                <div className="flex items-center">
                                  <p className="font-medium text-sm">
                                    <Input
                                      className="h-6 p-1 mr-1 inline-block w-auto"
                                      value={attachment.name.substring(
                                        0,
                                        attachment.name.lastIndexOf(".") !== -1
                                          ? attachment.name.lastIndexOf(".")
                                          : attachment.name.length
                                      )}
                                      onChange={(e) => {
                                        const extension =
                                          attachment.name.includes(".")
                                            ? attachment.name.substring(
                                                attachment.name.lastIndexOf(".")
                                              )
                                            : "";
                                        const newAttachments = [...attachments];
                                        newAttachments[index].name =
                                          e.target.value + extension;
                                        setAttachments(newAttachments);
                                      }}
                                    />
                                    <span>
                                      {attachment.name.includes(".")
                                        ? attachment.name.substring(
                                            attachment.name.lastIndexOf(".")
                                          )
                                        : ""}
                                    </span>
                                  </p>
                                </div>
                                <p className="text-xs text-gray-500">
                                  {attachment.file.size
                                    ? `${(
                                        attachment.file.size /
                                        (1024 * 1024)
                                      ).toFixed(2)} MB`
                                    : "Unknown size"}
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() =>
                                setAttachments((prev) =>
                                  prev.filter((_, i) => i !== index)
                                )
                              }
                              variant="ghost"
                              size="sm"
                              type="button"
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Submissions</CardTitle>
                <CardDescription>
                  {
                    submissions.filter(
                      (s) => s.status === "submitted" || s.status === "graded"
                    ).length
                  }{" "}
                  of {submissions.length} students have submitted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={submission.student.avatar}
                                alt={submission.student.name}
                              />
                              <AvatarFallback>
                                {submission.student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {submission.student.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {submission.student.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(submission.status)}
                        </TableCell>
                        <TableCell>
                          {submission.submittedAt ? (
                            formatDate(submission.submittedAt)
                          ) : (
                            <span className="text-gray-500">Not submitted</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {submission.grade !== null ? (
                            <div className="flex items-center gap-2">
                              <span>
                                {submission.grade}/{assignment?.totalPoints}
                              </span>
                              <Progress
                                value={
                                  assignment?.totalPoints
                                    ? (submission.grade /
                                        assignment.totalPoints) *
                                      100
                                    : 0
                                }
                                className="h-2 w-16"
                              />
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {(submission.status === "submitted" ||
                              submission.status === "graded") && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openSubmission(submission)}
                              >
                                <Eye size={16} className="mr-1" /> View
                              </Button>
                            )}
                            {submission.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-gray-500"
                                disabled
                              >
                                <Clock size={16} className="mr-1" /> Waiting
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Submission Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Submission Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Submitted</span>
                        <span className="font-medium">
                          {
                            submissions.filter(
                              (s) =>
                                s.status === "submitted" ||
                                s.status === "graded"
                            ).length
                          }
                        </span>
                      </div>
                      <Progress
                        value={
                          (submissions.filter(
                            (s) =>
                              s.status === "submitted" || s.status === "graded"
                          ).length /
                            submissions.length) *
                          100
                        }
                        className="h-2"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Grading Progress
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Graded</span>
                        <span className="font-medium">
                          {
                            submissions.filter((s) => s.status === "graded")
                              .length
                          }{" "}
                          /{" "}
                          {
                            submissions.filter(
                              (s) =>
                                s.status === "submitted" ||
                                s.status === "graded"
                            ).length
                          }
                        </span>
                      </div>
                      <Progress
                        value={
                          submissions.filter(
                            (s) =>
                              s.status === "submitted" || s.status === "graded"
                          ).length > 0
                            ? (submissions.filter((s) => s.status === "graded")
                                .length /
                                submissions.filter(
                                  (s) =>
                                    s.status === "submitted" ||
                                    s.status === "graded"
                                ).length) *
                              100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Grade Distribution
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center text-sm">
                          <span>90-100</span>
                          <span className="font-medium">
                            {
                              submissions.filter(
                                (s) => s.grade !== null && s.grade >= 90
                              ).length
                            }
                          </span>
                        </div>
                        <Progress
                          value={
                            submissions.filter((s) => s.grade !== null).length >
                            0
                              ? (submissions.filter(
                                  (s) => s.grade !== null && s.grade >= 90
                                ).length /
                                  submissions.filter((s) => s.grade !== null)
                                    .length) *
                                100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-sm">
                          <span>80-89</span>
                          <span className="font-medium">
                            {
                              submissions.filter(
                                (s) =>
                                  s.grade !== null &&
                                  s.grade >= 80 &&
                                  s.grade < 90
                              ).length
                            }
                          </span>
                        </div>
                        <Progress
                          value={
                            submissions.filter((s) => s.grade !== null).length >
                            0
                              ? (submissions.filter(
                                  (s) =>
                                    s.grade !== null &&
                                    s.grade >= 80 &&
                                    s.grade < 90
                                ).length /
                                  submissions.filter((s) => s.grade !== null)
                                    .length) *
                                100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-sm">
                          <span>70-79</span>
                          <span className="font-medium">
                            {
                              submissions.filter(
                                (s) =>
                                  s.grade !== null &&
                                  s.grade >= 70 &&
                                  s.grade < 80
                              ).length
                            }
                          </span>
                        </div>
                        <Progress
                          value={
                            submissions.filter((s) => s.grade !== null).length >
                            0
                              ? (submissions.filter(
                                  (s) =>
                                    s.grade !== null &&
                                    s.grade >= 70 &&
                                    s.grade < 80
                                ).length /
                                  submissions.filter((s) => s.grade !== null)
                                    .length) *
                                100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center text-sm">
                          <span>70</span>
                          <span className="font-medium">
                            {
                              submissions.filter(
                                (s) => s.grade !== null && s.grade < 70
                              ).length
                            }
                          </span>
                        </div>
                        <Progress
                          value={
                            submissions.filter((s) => s.grade !== null).length >
                            0
                              ? (submissions.filter(
                                  (s) => s.grade !== null && s.grade < 70
                                ).length /
                                  submissions.filter((s) => s.grade !== null)
                                    .length) *
                                100
                              : 0
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-2">Average Grade</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {submissions.filter((s) => s.grade !== null).length > 0
                          ? Math.round(
                              submissions.reduce(
                                (acc, s) =>
                                  acc + (s.grade !== null ? s.grade : 0),
                                0
                              ) /
                                submissions.filter((s) => s.grade !== null)
                                  .length
                            )
                          : "-"}
                      </span>
                      <span className="text-gray-500">
                        / {assignment?.totalPoints}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gray-800 hover:bg-gray-700">
                  Download All Submissions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      {activeSubmission && (
        <Dialog
          open={!!activeSubmission}
          onOpenChange={() => closeSubmission()}
        >
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Student Submission</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-2 mt-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={activeSubmission.student.avatar}
                      alt={activeSubmission.student.name}
                    />
                    <AvatarFallback>
                      {activeSubmission.student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{activeSubmission.student.name}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">
                    {activeSubmission.submittedAt &&
                      formatDate(activeSubmission.submittedAt)}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4">
              <Tabs defaultValue="submission">
                <TabsList className="mb-4">
                  <TabsTrigger value="submission">Submission</TabsTrigger>
                  <TabsTrigger value="grading">Grading</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>

                <TabsContent value="submission" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Files</h3>
                    {activeSubmission.attachments.length > 0 ? (
                      <div className="space-y-2">
                        {activeSubmission.attachments.map(
                          (attachment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-100 p-3 rounded-md"
                            >
                              <div className="flex items-center">
                                <Paperclip
                                  size={16}
                                  className="mr-2 text-gray-500"
                                />
                                <div>
                                  <p className="font-medium text-sm">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {attachment.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye size={16} className="mr-1" /> Preview
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download size={16} className="mr-1" />{" "}
                                  Download
                                </Button>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-100 p-4 rounded-md text-gray-500 text-center">
                        No files submitted
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Preview</h3>
                    <div className="bg-gray-100 p-4 rounded-md h-64 flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <FileText size={40} className="mx-auto mb-2" />
                        <p>Select a file to preview</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="grading" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="feedback">Feedback</Label>
                      <Textarea
                        id="feedback"
                        rows={6}
                        placeholder="Provide feedback on the submission"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="grade"
                          type="number"
                          min="0"
                          max={assignment?.totalPoints}
                          placeholder="Points"
                          value={gradePoints}
                          onChange={(e) => setGradePoints(e.target.value)}
                          className="flex-1"
                        />

                        <span className="text-gray-500">
                          /{assignment?.totalPoints}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="bg-gray-100 p-3 rounded-md">
                          <h4 className="text-sm font-medium mb-2">
                            Grading Status
                          </h4>
                          <div className="flex items-center gap-2">
                            {activeSubmission.status === "graded" ? (
                              <>
                                <CheckCircle
                                  size={16}
                                  className="text-green-600"
                                />
                                <span>
                                  Graded on{" "}
                                  {activeSubmission?.submittedAt &&
                                    formatDate(activeSubmission.submittedAt)}
                                </span>
                              </>
                            ) : (
                              <>
                                <AlertCircle
                                  size={16}
                                  className="text-amber-600"
                                />
                                <span>Not graded yet</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-gray-800 hover:bg-gray-700"
                        onClick={handleGradeSubmission}
                      >
                        <Check size={16} className="mr-2" />
                        Save Grade
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="space-y-4">
                  <div className="space-y-3 max-h-80 overflow-y-auto p-1">
                    {activeSubmission?.comments &&
                    activeSubmission.comments.length > 0 ? (
                      activeSubmission.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`flex gap-3 ${
                            comment.from === "teacher" ? "justify-end" : ""
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              comment.from === "teacher"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            <p className="text-sm">{comment.text}</p>
                            <p className="text-xs mt-1 text-gray-500">
                              {formatDate(comment.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No comments yet
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Input placeholder="Add a comment..." className="flex-1" />
                    <Button>
                      <MessageCircle size={16} className="mr-1" /> Send
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeSubmission}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      {assignment?._id && (
        <DeleteConfirmationPopup
          title="Delete Assignment"
          description={`Are you sure you want to delete the assignment "${
            assignment?.title || "this assignment"
          }"?`}
          onConfirm={() => handleDeleteAssignment(assignment._id)}
          isDeleteConfirmationPopupOpen={isDeleteConfirmationPopupOpen}
          setIsDeleteConfirmationPopupOpen={setIsDeleteConfirmationPopupOpen}
          deletingAssignment={deletingAssignment}
        />
      )}
    </div>
  );
}
