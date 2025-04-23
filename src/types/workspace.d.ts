export interface WorkspaceProps {
  _id?: string;
  name: string;
  description?: string;
  members: Members[];
  owner?: {
    _id: string;
    name: string;
    email: string;
    picture?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
