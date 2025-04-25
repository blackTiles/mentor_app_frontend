import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User } from "lucide-react";

const mockStudents = [
  {
    id: 1,
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    subject: "Mathematics",
    progress: 75,
    lastActive: "2 hours ago",
    avatarUrl: "",
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    email: "alex.r@example.com",
    subject: "Physics",
    progress: 60,
    lastActive: "1 day ago",
    avatarUrl: "",
  },
  {
    id: 3,
    name: "Michael Smith",
    email: "michael.s@example.com",
    subject: "Chemistry",
    progress: 90,
    lastActive: "3 hours ago",
    avatarUrl: "",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    subject: "Biology",
    progress: 45,
    lastActive: "Just now",
    avatarUrl: "",
  },
];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            All Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={student.avatarUrl} alt={student.name} />
                      <AvatarFallback className="bg-gray-300">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-800">
                        {student.name}
                      </p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <Badge className="w-fit bg-gray-200 text-gray-700 hover:bg-gray-300">
                      {student.subject}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-600 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {student.progress}%
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 border-gray-300"
                      >
                        <User size={14} className="mr-1" /> Profile
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 border-gray-300"
                      >
                        <MessageSquare size={14} className="mr-1" /> Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No students found matching your search.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Students;
