import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Workspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { isAuthenticated, isLoading } = useAuth();

  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div>
      <h1 className="text-2xl font-bold">Workspace : {workspaceId}</h1>
      <p className="text-gray-600">Manage your workspaces here.</p>
      {/* Add your workspace management components here */}
    </div>
  );
}
