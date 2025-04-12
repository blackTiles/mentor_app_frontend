import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios/instance";
import { SignOut } from "@/lib/firebase/emailAndPasswordAuth";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: any;
  setUser: (user: any) => void;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await API.post("/user/verify-token");
      if (response.status === 200) {
        return response.data.user;
      }
    },
    enabled: !!localStorage.getItem("token"),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const login = (data: any) => {
    localStorage.setItem("token", data?.token);
    setUser(data?.user);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    await SignOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  useEffect(() => {
    if (data) {
      console.log(data)
      setUser(data);
      setIsAuthenticated(true);
    }
  }, [data]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     setUser(null);
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
