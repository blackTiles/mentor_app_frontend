import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Members {
  _id: string;
  name: string;
  email: string;
  picture?: string;
}

export interface WorkspaceCardProps {
  _id?: string;
  name: string;
  description?: string;
  members: Members[];
}

export default function WorkspaceCard({
  _id = "1",
  name = "Design Team Workspace",
  description = "Collaborative workspace for the design team to share resources and work on projects.",
  members = [
    {
      _id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      picture: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "2",
      name: "Sam Wilson",
      email: "sam@example.com",
      picture: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "3",
      name: "Taylor Kim",
      email: "taylor@example.com",
      picture: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "4",
      name: "Jordan Lee",
      email: "jordan@example.com",
      picture: "/placeholder.svg?height=40&width=40",
    },
    {
      _id: "5",
      name: "Casey Smith",
      email: "casey@example.com",
      picture: "/placeholder.svg?height=40&width=40",
    },
  ],
}: WorkspaceCardProps) {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full"
      onClick={
        () => navigate(`/dashboard/workspaces/${_id}`) // Ensure _id is defined or handle undefined case
      }
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{members.length} Members</span>
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Members</h3>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member._id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={member.picture || "/placeholder.svg"}
                    alt={member.name}
                  />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {member.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
