import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import API from "@/lib/axios/instance";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { WorkspaceCardProps } from "@/components/dashboard/WorkspaceCard";
import Spinner from "@/components/loaders/spinner";
import CreateWorkspace from "@/components/dashboard/teacher/CreateWorkspace";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const Workspaces = () => {
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const { workspaces, setWorkspaces, loadingWorkspaces, setLoadingWorkspaces } =
    useWorkspaceStore();

  const fetchWorkspaces = async () => {
    try {
      const response = await API.get("/workspace/get-workspaces"); // Adjust the endpoint as needed
      if (response.status === 200) {
        setWorkspaces(response.data.workspaces);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoadingWorkspaces(false);
    }
  };

  useEffect(() => {
    if (loadingWorkspaces) {
      fetchWorkspaces();
    }
  }, [workspaces]);
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <Button
          onClick={() => setShowWorkspaceModal(true)}
          className="bg-gray-800 hover:bg-gray-700"
        >
          <Users size={16} className="mr-0" />
          Create New Workspace
        </Button>
      </div>
      {loadingWorkspaces ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : !loadingWorkspaces && workspaces.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500">No workspaces found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workspaces.map((workspace: WorkspaceCardProps) => (
            <WorkspaceCard key={workspace._id} {...workspace} />
          ))}
        </div>
      )}
      {showWorkspaceModal && (
        <CreateWorkspace setShowWorkspaceModal={setShowWorkspaceModal} />
      )}
    </div>
  );
};

export default Workspaces;
