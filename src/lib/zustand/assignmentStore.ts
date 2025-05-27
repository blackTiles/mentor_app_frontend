import { create } from "zustand";
import { Assignment } from "@/types/assignment";

interface AssignmentStore {
  assignment: Assignment | null;
  setAssignment: (assignment: Assignment | null) => void;
  assignments: Assignment[];
  loadingAssignments: boolean;
  setAssignments: (assignments: Assignment[]) => void;
  setLoadingAssignments: (loading: boolean) => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignment: null,
  setAssignment: (assignment) => set({ assignment }),
  assignments: [],
  loadingAssignments: false,
  setAssignments: (assignments) => set({ assignments }),
  setLoadingAssignments: (loading) => set({ loadingAssignments: loading }),
}));
