import { create } from "zustand";
import { WorkspaceProps } from "@/types/workspace";

export const useWorkspaceStore = create<{
  workspaces: WorkspaceProps[];
  workspace: WorkspaceProps | null;
  setWorkspace: (workspace: WorkspaceProps) => void;
  loadingWorkspaces: boolean;
  setWorkspaces: (workspaces: WorkspaceProps[]) => void;
  setLoadingWorkspaces: (loading: boolean) => void;
}>((set) => ({
  workspaces: [],
  loadingWorkspaces: true,
  setWorkspaces: (workspaces) => set({ workspaces }),
  workspace: null,
  setWorkspace: (workspace) => set({ workspace }),
  setLoadingWorkspaces: (loading) => set({ loadingWorkspaces: loading }),
}));
