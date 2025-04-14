import { useEffect, useState } from "react";
import API from "@/lib/axios/instance";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface Student {
  id: number;
  _id: string;
  name: string;
  email: string;
  picture: string;
}

// Mock data for students that can be added to the workspace
// const studentsList: Student[] = [
//   { id: 1, name: "Olivia Martin", email: "m@example.com", picture: "" },
//   {
//     id: 2,
//     name: "Isabella Nguyen",
//     email: "isabella.nguyen@email.com",
//     picture: "",
//   },
//   { id: 3, name: "Emma Wilson", email: "emma@example.com", picture: "" },
//   { id: 4, name: "Jackson Lee", email: "lee@example.com", picture: "" },
//   { id: 5, name: "William Kim", email: "will@email.com", picture: "" },
//   { id: 6, name: "Emma Wilson", email: "emma@example.com", picture: "" },
//   { id: 7, name: "Jackson Lee", email: "lee@example.com", picture: "" },
//   { id: 8, name: "William Kim", email: "will@email.com", picture: "" },
// ];

const CreateWorkspace = ({
  setShowWorkspaceModal,
}: {
  setShowWorkspaceModal: (show: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDescription, setWorkspaceDescription] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle student selection
  const toggleStudent = (student: Student) => {
    if (selectedStudents.some((s) => s._id === student._id)) {
      setSelectedStudents(selectedStudents.filter((s) => s._id !== student._id));
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  // Check if a student is selected
  const isSelected = (studentId: string) => {
    return selectedStudents.some((s) => s._id === studentId);
  };

  // Handle modal close
  const handleClose = () => {
    setShowWorkspaceModal(false);
    setWorkspaceName("");
    setWorkspaceDescription("");
    setSelectedStudents([]);
    setSearchQuery("");
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Workspace created:", {
      name: workspaceName,
      description: workspaceDescription,
      students: selectedStudents,
    });
    // In a real implementation, this would create the workspace and close the modal
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const getStudents = async () => {
      const response = await API.get("/user/get-students");
      if (response.status === 200) {
        return response.data.students;
      }
    };
    getStudents()
      .then((students) => {
        if (students) {
          setStudents(students);
        }
      })
      .catch((error) => console.error("Error fetching students:", error));
  }
  , []);

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold md:font-bold text-gray-800">
              New workspace
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Create a workspace for your students to collaborate on projects.
          </p>
        </div>

        {/* Workspace Details */}
        <div className="px-4 sm:px-6 border-gray-200">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="workspace-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Workspace Name
              </label>
              <Input
                id="workspace-name"
                placeholder="Enter workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full max-w-md"
              />
            </div>
            <div>
              <label
                htmlFor="workspace-description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <Textarea
                id="workspace-description"
                placeholder="Describe the purpose of this workspace"
                value={workspaceDescription}
                onChange={(e) => setWorkspaceDescription(e.target.value)}
                className="w-full resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Student Selection */}
        <div className="p-4 sm:px-6 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add students to this workspace
          </label>
          <div className="relative">
            <Input
              placeholder="Search user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mb-3"
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {filteredStudents.map((student) => (
              <div
                key={student._id}
                className={`flex items-center p-3 hover:bg-gray-100 cursor-pointer rounded-md transition ${
                  isSelected(student._id) ? "bg-gray-100" : ""
                }`}
                onClick={() => toggleStudent(student)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={student.picture} alt={student.name} />
                  <AvatarFallback className="bg-gray-300">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-800">
                    {student.name}
                  </div>
                  <div className="text-sm text-gray-600">{student.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Students Summary */}
        {selectedStudents.length > 0 && (
          <div className="p-4 border-b border-gray-200">
            <div className="text-sm text-gray-700 mb-2">
              Selected students: {selectedStudents.length}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {student.name}
                  <button
                    onClick={() => toggleStudent(student)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer/Actions */}
        <div className="p-4 flex justify-end">
          <Button
            variant="outline"
            onClick={handleClose}
            className="mr-2 text-gray-700 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gray-800 hover:bg-gray-700 text-white"
            disabled={!workspaceName.trim()}
          >
            Create Workspace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
