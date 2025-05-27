export interface Assignment {
  _id: string;
  title: string;
  description: string;
  workspace: {
    id: string;
    name: string;
  };
  course: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    name: string;
  };
  dueDate: string | null;
  totalPoints: number;
  attachments: Array<{ name: string; fileUrl: string; size: string }>;
  createdAt: string;
  updatedAt: string;
  status: "active" | "archived";
}
