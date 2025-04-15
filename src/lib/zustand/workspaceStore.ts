import { create } from "zustand";
import { WorkspaceCardProps } from "@/components/dashboard/WorkspaceCard";

export const useWorkspaceStore = create<{
  workspaces: WorkspaceCardProps[];
  loadingWorkspaces: boolean;
  setWorkspaces: (workspaces: WorkspaceCardProps[]) => void;
  setLoadingWorkspaces: (loading: boolean) => void;
}>((set) => ({
  workspaces: [],
  loadingWorkspaces: true,
  setWorkspaces: (workspaces) => set({ workspaces }),
  setLoadingWorkspaces: (loading) => set({ loadingWorkspaces: loading }),
}));
