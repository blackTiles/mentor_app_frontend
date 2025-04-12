import { create } from "zustand";

interface AuthState {
    isLoggedIn: boolean;
    user: any | null;
    login: (user: any) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: null,
    login: (user: any) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: null }),
}));



