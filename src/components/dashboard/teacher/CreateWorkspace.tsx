import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

const mockStudents = [
  { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com" },
  { id: 2, name: "Alex Rodriguez", email: "alex.r@example.com" },
  { id: 3, name: "Michael Smith", email: "michael.s@example.com" },
  { id: 4, name: "Sarah Johnson", email: "sarah.j@example.com" },
];

export function CreateWorkspace() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const handleCreateWorkspace = () => {
    // TODO: Implement workspace creation logic
    console.log("Creating workspace:", { workspaceName, selectedStudents });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-700 hover:bg-gray-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create Workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input
              id="workspace-name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
              className="bg-gray-50"
            />
          </div>
          <div className="grid gap-2">
            <Label>Select Students</Label>
            <Select
              onValueChange={(value) => {
                if (!selectedStudents.includes(value)) {
                  setSelectedStudents([...selectedStudents, value]);
                }
              }}
            >
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Select students to add" />
              </SelectTrigger>
              <SelectContent>
                {mockStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id.toString()}>
                    {student.name} ({student.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedStudents.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Students</Label>
              <div className="flex flex-wrap gap-2">
                {selectedStudents.map((studentId) => {
                  const student = mockStudents.find(
                    (s) => s.id.toString() === studentId
                  );
                  return (
                    <div
                      key={studentId}
                      className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      <span className="text-sm">
                        {student?.name}
                      </span>
                      <button
                        onClick={() =>
                          setSelectedStudents(
                            selectedStudents.filter((id) => id !== studentId)
                          )
                        }
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleCreateWorkspace}
            className="bg-gray-700 hover:bg-gray-800 text-white"
            disabled={!workspaceName || selectedStudents.length === 0}
          >
            Create Workspace
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 