import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <p className="text-gray-600">
            Your recent messages with students will appear here.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default Messages;
