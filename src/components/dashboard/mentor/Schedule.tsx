import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Schedule = () => {
  return (
    <>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-800">
            Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Your upcoming mentoring sessions will appear here.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default Schedule;
