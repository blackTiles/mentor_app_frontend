import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Calendar } from "lucide-react";

const mentorData = {
  name: "Prof. Taylor Davis",
  subject: "Computer Science",
  rating: 4.8,
  sessions: 12,
  nextSession: "Tomorrow, 2:00 PM",
  avatarUrl: "",
  bio: "Ph.D. in Computer Science with 15 years of teaching experience. Specializes in algorithmic thinking and programming fundamentals.",
  expertise: [
    "Programming",
    "Data Structures",
    "Algorithms",
    "Software Engineering",
  ],
  availability: ["Mon: 10AM-12PM", "Wed: 2PM-4PM", "Fri: 1PM-3PM"],
};

const courseProgress = [
  {
    id: 1,
    name: "Introduction to Programming",
    progress: 85,
    total: 10,
    completed: 8,
  },
  { id: 2, name: "Data Structures", progress: 60, total: 8, completed: 5 },
  { id: 3, name: "Algorithms", progress: 30, total: 12, completed: 4 },
];

const upcomingAssignments = [
  {
    id: 1,
    title: "Programming Assignment #3",
    dueDate: "Mar 22, 2025",
    status: "pending",
  },
  {
    id: 2,
    title: "Quiz: Algorithm Complexity",
    dueDate: "Mar 25, 2025",
    status: "pending",
  },
];

const Overview = () => {
  return (
    <>
      {/* Mentor Card */}
      <Card className="bg-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-gray-800">
            Your Mentor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mentorData.avatarUrl} alt={mentorData.name} />
                <AvatarFallback className="bg-gray-300 text-lg">
                  {mentorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-lg text-gray-800">
                  {mentorData.name}
                </h3>
                <p className="text-gray-600">{mentorData.subject}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-700 mr-2">
                    Rating: {mentorData.rating}/5
                  </span>
                  <span className="text-sm text-gray-700">
                    Sessions: {mentorData.sessions}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-2" />
                Next session: {mentorData.nextSession}
              </div>
              <Button className="bg-gray-800 hover:bg-gray-700">
                <MessageSquare size={16} className="mr-2" />
                Message Mentor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {courseProgress.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-700">{course.name}</p>
                  <span className="text-sm text-gray-600">
                    {course.progress}%
                  </span>
                </div>
                <Progress value={course.progress} className="h-2 bg-gray-200" />
                <p className="text-sm text-gray-600">
                  {course.completed} of {course.total} modules completed
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-800">
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAssignments.length > 0 ? (
              <div className="space-y-3">
                {upcomingAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-800">
                          {assignment.title}
                        </p>
                        <div className="flex items-center mt-1 text-sm text-gray-600">
                          <Calendar size={14} className="mr-1" />
                          Due: {assignment.dueDate}
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {assignment.status === "pending"
                          ? "Pending"
                          : "Completed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No upcoming assignments.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Overview;
