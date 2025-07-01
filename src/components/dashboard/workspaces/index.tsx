import { useEffect, useState } from "react";
import { useWorkspaceStore } from "@/lib/zustand/workspaceStore";
import API from "@/lib/axios/instance";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import { WorkspaceProps } from "@/types/workspace";
import Spinner from "@/components/loaders/spinner";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
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
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Workspaces</h1>
            <Button
              onClick={() => setShowWorkspaceModal(true)}
              className="bg-gray-800 hover:bg-gray-700"
            >
              <Users size={16} className="mr-0" />
              Create New Workspace
            </Button>
            {showWorkspaceModal && (
              <CreateWorkspace setShowWorkspaceModal={setShowWorkspaceModal} />
            )}
          </div>
        </div>
      </header>

      {loadingWorkspaces ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      ) : !loadingWorkspaces && workspaces.length === 0 ? (
        <div className="flex items-center justify-center h-screen px-4 py-6">
          <p className="text-gray-500">No workspaces found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 py-6">
          {workspaces.map((workspace: WorkspaceProps) => (
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
