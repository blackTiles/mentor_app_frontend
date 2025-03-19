import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const messages = [
  {
    id: 1,
    sender: "Prof. Taylor Davis",
    content: "How's your progress on the latest assignment?",
    timestamp: "Today, 10:23 AM",
    unread: true,
    avatarUrl: "",
  },
  {
    id: 2,
    sender: "Student Services",
    content: "Registration for next semester courses is now open.",
    timestamp: "Yesterday, 3:45 PM",
    unread: false,
    avatarUrl: "",
  },
  {
    id: 3,
    sender: "Prof. Taylor Davis",
    content:
      "Great work on your last quiz! Let's schedule a session to discuss your approach.",
    timestamp: "Mar 15, 2025",
    unread: false,
    avatarUrl: "",
  },
];

const Messages = () => {
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.unread ? "bg-gray-100" : "bg-gray-50"
                }`}
              >
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={message.avatarUrl} alt={message.sender} />
                    <AvatarFallback className="bg-gray-300">
                      {message.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-800">
                        {message.sender}
                      </h4>
                      <span className="text-xs text-gray-600">
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                </div>
                {message.unread && (
                  <div className="flex justify-end mt-2">
                    <Badge className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                      New
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t border-gray-200 pt-4">
          <div className="flex items-center w-full">
            <Input
              placeholder="Type a message..."
              className="bg-gray-50 border-gray-300 mr-2 flex-1"
            />
            <Button className="bg-gray-800 hover:bg-gray-700">Send</Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Messages;
