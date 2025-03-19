import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock, Calendar } from "lucide-react";
import { Star } from "lucide-react";

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

const sessions = [
  {
    id: 1,
    date: "Mar 20, 2025",
    time: "2:00 PM - 3:00 PM",
    topic: "Review of Recursive Algorithms",
    status: "upcoming",
  },
  {
    id: 2,
    date: "Mar 13, 2025",
    time: "2:00 PM - 3:00 PM",
    topic: "Quiz Preparation",
    status: "completed",
  },
  {
    id: 3,
    date: "Mar 6, 2025",
    time: "2:00 PM - 3:00 PM",
    topic: "Assignment Feedback",
    status: "completed",
  },
];

const Mentor = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mentor Profile */}
        <div className="md:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-800">
                Your Mentor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-start">
                <Avatar className="h-24 w-24 md:mr-6 mb-4 md:mb-0">
                  <AvatarImage
                    src={mentorData.avatarUrl}
                    alt={mentorData.name}
                  />
                  <AvatarFallback className="bg-gray-300 text-lg">
                    {mentorData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {mentorData.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{mentorData.subject}</p>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(mentorData.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {mentorData.rating} ({mentorData.sessions} sessions)
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{mentorData.bio}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">
                      Areas of Expertise:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mentorData.expertise.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mentor Availability */}
        <div>
          <Card className="bg-white mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-800">
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mentorData.availability.map((slot, index) => (
                  <div
                    key={index}
                    className="p-2 bg-gray-50 rounded flex justify-between items-center"
                  >
                    <span className="text-gray-700">{slot}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-700 border-gray-300"
                    >
                      Book
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-800">
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full bg-gray-800 hover:bg-gray-700">
                  <MessageSquare size={16} className="mr-2" />
                  Message Mentor
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-gray-700 border-gray-300"
                >
                  <Calendar size={16} className="mr-2" />
                  Schedule Session
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sessions History */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Sessions History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div key={session.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {session.topic}
                    </h4>
                    <div className="flex flex-col md:flex-row md:items-center mt-1">
                      <div className="flex items-center text-sm text-gray-600 mr-4">
                        <Calendar size={14} className="mr-1" />
                        {session.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        {session.time}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0">
                    {session.status === "upcoming" ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Upcoming
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-gray-700 border-gray-300"
                      >
                        View Notes
                      </Button>
                    )}
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

export default Mentor;
