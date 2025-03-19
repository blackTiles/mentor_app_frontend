import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search } from "lucide-react";
import { BookOpen, CheckCircle, Video } from "lucide-react";

const courseList = [
  {
    id: 1,
    name: "Introduction to Programming",
    instructor: "Prof. Taylor Davis",
    enrolled: true,
    progress: 85,
    totalLessons: 10,
    completedLessons: 8,
  },
  {
    id: 2,
    name: "Data Structures",
    instructor: "Prof. Taylor Davis",
    enrolled: true,
    progress: 60,
    totalLessons: 8,
    completedLessons: 5,
  },
  {
    id: 3,
    name: "Algorithms",
    instructor: "Prof. Taylor Davis",
    enrolled: true,
    progress: 30,
    totalLessons: 12,
    completedLessons: 4,
  },
  {
    id: 4,
    name: "Advanced Programming",
    instructor: "Dr. Sarah Johnson",
    enrolled: false,
    totalLessons: 15,
  },
  {
    id: 5,
    name: "Software Engineering",
    instructor: "Dr. Michael Wong",
    enrolled: false,
    totalLessons: 20,
  },
];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courseList.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search courses..."
            className="pl-10 bg-white border-gray-300 w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Enrolled Courses */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Enrolled Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCourses
              .filter((course) => course.enrolled)
              .map((course) => (
                <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Instructor: {course.instructor}
                      </p>
                      <div className="flex items-center mt-2">
                        <Progress
                          value={course.progress}
                          className="w-32 h-2 bg-gray-200 mr-2"
                        />
                        <span className="text-sm text-gray-600">
                          {course.progress}% Complete
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 md:mt-0">
                      <Button
                        variant="outline"
                        className="mr-2 text-gray-700 border-gray-300"
                      >
                        <BookOpen size={16} className="mr-2" />
                        Continue
                      </Button>
                      <Button className="bg-gray-800 hover:bg-gray-700">
                        <Video size={16} className="mr-2" />
                        Join Session
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Courses */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Available Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCourses
              .filter((course) => !course.enrolled)
              .map((course) => (
                <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Instructor: {course.instructor}
                      </p>
                      <p className="text-sm text-gray-600">
                        {course.totalLessons} lessons
                      </p>
                    </div>
                    <div className="flex items-center mt-3 md:mt-0">
                      <Button
                        variant="outline"
                        className="mr-2 text-gray-700 border-gray-300"
                      >
                        <BookOpen size={16} className="mr-2" />
                        Preview
                      </Button>
                      <Button className="bg-gray-800 hover:bg-gray-700">
                        <CheckCircle size={16} className="mr-2" />
                        Enroll
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Courses;
