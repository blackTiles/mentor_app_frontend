import { create } from "zustand";
import { Assignment } from "@/types/assignment";

// interface Assignment {
//   _id: string;
//   title: string;
//   description: string;
//   workspace: string;
//   teacher: string;
//   dueDate: string;
// }

interface AssignmentStore {
  assignments: Assignment[];
  loadingAssignments: boolean;
  setAssignments: (assignments: Assignment[]) => void;
  setLoadingAssignments: (loading: boolean) => void;
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  assignments: [],
  loadingAssignments: false,
  setAssignments: (assignments) => set({ assignments }),
  setLoadingAssignments: (loading) => set({ loadingAssignments: loading }),
}));
