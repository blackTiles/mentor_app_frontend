import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  Home,
  FileText,
  BookOpen,
  Users,
  Calendar,
  Settings,
} from "lucide-react";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navLinks = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: `/dashboard/${user.role}`,
    },
    { name: "Workspaces", icon: <FileText size={20} />, path: `/dashboard/${user.role}/workspaces` },
    { name: "Courses", icon: <BookOpen size={20} />, path: "#" },
    { name: "Students", icon: <Users size={20} />, path: "#" },
    { name: "Schedule", icon: <Calendar size={20} />, path: "#" },
    { name: "Settings", icon: <Settings size={20} />, path: "#" },
  ];
  return (
    <div className="w-64 bg-gray-800 text-white">
      {/* <div className="p-4">
          <h1 className="text-xl font-bold">Mentor Workspace</h1>
        </div> */}
      <nav className="mt-0">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-4 py-2 flex items-center text-gray-300 hover:bg-gray-700 cursor-pointer ${
              location.pathname === link.path ? "bg-gray-700" : ""
            }`}
          >
            {link.icon}
            <span className="ml-3">{link.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
